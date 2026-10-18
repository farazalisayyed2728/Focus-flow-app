# apps/reminders/admin.py
from django.contrib import admin
from .models import Reminder

@admin.register(Reminder)
class ReminderAdmin(admin.ModelAdmin):
    list_display = ('user', 'target_type', 'offset_minutes', 'is_enabled', 'created_at')
    list_filter = ('target_type', 'is_enabled')
    search_fields = ('user__username',)