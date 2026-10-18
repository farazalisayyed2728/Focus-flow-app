# apps/notifications/admin.py
from django.contrib import admin
from .models import Notification, NotificationPreference

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'notification_type', 'is_read', 'scheduled_for', 'delivered_at')
    list_filter = ('notification_type', 'is_read', 'scheduled_for')
    search_fields = ('title', 'body', 'user__username')

@admin.register(NotificationPreference)
class NotificationPreferenceAdmin(admin.ModelAdmin):
    list_display = ('user', 'routine_reminders_enabled', 'habit_reminders_enabled', 'daily_start_reminder_enabled', 'in_app_enabled')