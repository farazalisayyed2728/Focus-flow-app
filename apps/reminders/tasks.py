import logging
import zoneinfo
from datetime import datetime, timedelta

from celery import shared_task
from django.utils import timezone

from apps.notifications.models import Notification
from apps.notifications.services import create_in_app_notification
from apps.reminders.models import Reminder


from datetime import date, timedelta
from celery import shared_task
from django.contrib.auth.models import User
from apps.tracking.models import Task
from apps.notifications.services import create_in_app_notification
from apps.notifications.models import Notification
from apps.analytics.services import calculate_weekly_metrics

logger = logging.getLogger(__name__)

@shared_task
def check_and_dispatch_reminders():
    """
    Periodic task running every 5 minutes.
    Converts reminder times to user's localized timezone and delivers due notifications.
    """
    now_utc = timezone.now()
    active_reminders = Reminder.objects.filter(is_enabled=True).select_related('user__profile', 'routine_block', 'habit')

    dispatched = 0
    for rem in active_reminders:
        user_tz_name = getattr(rem.user.profile, 'timezone', 'UTC')
        try:
            tz = zoneinfo.ZoneInfo(user_tz_name)
        except (zoneinfo.ZoneInfoNotFoundError, ValueError):
            logger.warning(
                "Invalid timezone %r for user %s; using UTC",
                user_tz_name,
                rem.user_id,
            )
            tz = zoneinfo.ZoneInfo('UTC')

        user_now = now_utc.astimezone(tz)
        today = user_now.date()

        if rem.target_type == Reminder.TARGET_ROUTINE and rem.routine_block and rem.routine_block.is_active:
            block_start = rem.routine_block.start_time
            block_datetime = datetime.combine(today, block_start, tzinfo=tz)
            trigger_time = block_datetime - timedelta(minutes=rem.offset_minutes)

            # Trigger window: due within the last 5 minutes
            if trigger_time <= user_now < (trigger_time + timedelta(minutes=5)):
                title = f"Upcoming: {rem.routine_block.title}"
                body = f"Starts in {rem.offset_minutes} minutes at {block_start.strftime('%H:%M')}."
                notif = create_in_app_notification(
                    user=rem.user,
                    title=title,
                    body=body,
                    notification_type=Notification.TYPE_ROUTINE,
                    scheduled_for=user_now
                )
                if notif:
                    dispatched += 1

        elif rem.target_type == Reminder.TARGET_HABIT and rem.habit and not rem.habit.is_paused and not rem.habit.is_archived:
            if rem.habit.preferred_time:
                habit_datetime = datetime.combine(today, rem.habit.preferred_time, tzinfo=tz)
                trigger_time = habit_datetime - timedelta(minutes=rem.offset_minutes)
                if trigger_time <= user_now < (trigger_time + timedelta(minutes=5)):
                    title = f"Habit Reminder: {rem.habit.name}"
                    body = f"Time for your scheduled habit: {rem.habit.name}."
                    notif = create_in_app_notification(
                        user=rem.user,
                        title=title,
                        body=body,
                        notification_type=Notification.TYPE_HABIT,
                        scheduled_for=user_now
                    )
                    if notif:
                        dispatched += 1

    return f"Dispatched {dispatched} reminders."




@shared_task
def check_task_deadlines():
    """
    Checks for overdue tasks and triggers an in-app alert.
    """
    today = date.today()
    overdue_tasks = Task.objects.filter(
        status='pending',
        due_date__lt=today
    ).select_related('user')

    alerts_sent = 0
    for task in overdue_tasks:
        notif = create_in_app_notification(
            user=task.user,
            title=f"Overdue Task: {task.title}",
            body=f"This task was due on {task.due_date}. Tap to reschedule or mark complete.",
            notification_type=Notification.TYPE_SYSTEM
        )
        if notif:
            alerts_sent += 1
    return f"Sent {alerts_sent} deadline alerts."

@shared_task
def generate_weekly_productivity_summaries():
    """
    Runs every Sunday evening to calculate weekly reports for active users.
    """
    users = User.objects.filter(is_active=True)
    count = 0
    for user in users:
        metrics = calculate_weekly_metrics(user)
        create_in_app_notification(
            user=user,
            title="Your Weekly Productivity Summary is Ready",
            body=f"You completed {metrics['total_completed_hours']}h of focused work this week. Completion rate: {metrics['completion_rate']}%.",
            notification_type=Notification.TYPE_SYSTEM
        )
        count += 1
    return f"Generated {count} weekly summaries."