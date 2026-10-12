from django.db import models
from django.contrib.auth.models import User

class NotificationPreference(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='notification_preferences')
    routine_reminders_enabled = models.BooleanField(default=True)
    habit_reminders_enabled = models.BooleanField(default=True)
    daily_start_reminder_enabled = models.BooleanField(default=True)
    in_app_enabled = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} Notification Preferences"

class Notification(models.Model):
    TYPE_ROUTINE = 'routine'
    TYPE_HABIT = 'habit'
    TYPE_SYSTEM = 'system'

    TYPE_CHOICES = [
        (TYPE_ROUTINE, 'Routine Block'),
        (TYPE_HABIT, 'Habit Reminder'),
        (TYPE_SYSTEM, 'System Message'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default=TYPE_ROUTINE)
    title = models.CharField(max_length=150)
    body = models.TextField()
    is_read = models.BooleanField(default=False)
    read_at = models.DateTimeField(null=True, blank=True)
    scheduled_for = models.DateTimeField(db_index=True)
    delivered_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-delivered_at']
        indexes = [
            models.Index(fields=['user', 'is_read']),
        ]

    def __str__(self):
        return f"{self.title} for {self.user.username} ({'Read' if self.is_read else 'Unread'})"