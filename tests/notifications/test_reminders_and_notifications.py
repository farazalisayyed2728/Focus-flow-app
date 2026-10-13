from datetime import timedelta

import pytest
from django.contrib.auth.models import User
from django.utils import timezone

from apps.notifications.models import Notification, NotificationPreference
from apps.notifications.services import (
    create_in_app_notification,
    mark_notification_read,
)
from apps.reminders.models import Reminder
from apps.reminders.tasks import check_and_dispatch_reminders
from apps.routines.models import Routine, RoutineBlock


@pytest.mark.django_db
def test_create_and_read_notification():
    user = User.objects.create_user(username='notify_user', password='Password123!')
    notif = create_in_app_notification(
        user=user,
        title="Upcoming Block",
        body="Starting soon"
    )
    assert notif is not None
    assert notif.is_read is False

    # Mark as read
    read_notif = mark_notification_read(user, notif.id)
    assert read_notif.is_read is True
    assert read_notif.read_at is not None

@pytest.mark.django_db
def test_notification_preference_suppression():
    user = User.objects.create_user(username='pref_user', password='Password123!')
    NotificationPreference.objects.create(user=user, routine_reminders_enabled=False)

    notif = create_in_app_notification(
        user=user,
        title="Block Reminder",
        body="Should not be created",
        notification_type=Notification.TYPE_ROUTINE
    )
    assert notif is None
    assert Notification.objects.filter(user=user).count() == 0

@pytest.mark.django_db
def test_reminder_dispatch_task():
    user = User.objects.create_user(username='rem_user', password='Password123!')
    user.profile.timezone = 'UTC'
    user.profile.save()

    now_utc = timezone.now()
    target_start = (now_utc + timedelta(minutes=10)).time()

    routine = Routine.objects.create(user=user, name='Routine', is_active=True)
    block = RoutineBlock.objects.create(
        routine=routine,
        title='Deep Work',
        start_time=target_start,
        end_time=(now_utc + timedelta(minutes=70)).time(),
        is_active=True
    )

    Reminder.objects.create(
        user=user,
        target_type=Reminder.TARGET_ROUTINE,
        routine_block=block,
        offset_minutes=10,
        is_enabled=True
    )

    result = check_and_dispatch_reminders()
    assert "Dispatched 1 reminders" in result
    assert Notification.objects.filter(user=user, title__icontains="Deep Work").exists()