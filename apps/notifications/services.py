from django.utils import timezone

from .models import Notification, NotificationPreference


def get_or_create_preferences(user):
    prefs, _ = NotificationPreference.objects.get_or_create(user=user)
    return prefs

def create_in_app_notification(user, title, body, notification_type=Notification.TYPE_ROUTINE, scheduled_for=None):
    prefs = get_or_create_preferences(user)
    if not prefs.in_app_enabled:
        return None

    if notification_type == Notification.TYPE_ROUTINE and not prefs.routine_reminders_enabled:
        return None

    if notification_type == Notification.TYPE_HABIT and not prefs.habit_reminders_enabled:
        return None

    if scheduled_for is None:
        scheduled_for = timezone.now()

    # Deduplication check: prevent identical notification within 1 hour
    recent = Notification.objects.filter(
        user=user,
        title=title,
        scheduled_for__gte=scheduled_for - timezone.timedelta(minutes=30)
    ).exists()

    if recent:
        return None

    return Notification.objects.create(
        user=user,
        notification_type=notification_type,
        title=title,
        body=body,
        scheduled_for=scheduled_for,
    )

def mark_notification_read(user, notification_id):
    notif = Notification.objects.get(id=notification_id, user=user)
    if not notif.is_read:
        notif.is_read = True
        notif.read_at = timezone.now()
        notif.save()
    return notif