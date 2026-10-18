from django.contrib import admin
from .models import ScheduleOccurrence, Task, FocusSession

@admin.register(ScheduleOccurrence)
class ScheduleOccurrenceAdmin(admin.ModelAdmin):
    list_display = ('routine_block', 'user', 'occurrence_date', 'status', 'actual_minutes', 'completed_at')
    list_filter = ('status', 'occurrence_date')
    search_fields = ('routine_block__title', 'user__username')

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'priority', 'status', 'due_date', 'estimated_minutes', 'actual_minutes', 'completed_at')
    list_filter = ('priority', 'status', 'due_date')
    search_fields = ('title', 'user__username', 'description')

@admin.register(FocusSession)
class FocusSessionAdmin(admin.ModelAdmin):
    list_display = ('user', 'mode', 'duration_minutes', 'started_at', 'ended_at', 'completed_normally')
    list_filter = ('mode', 'completed_normally', 'started_at')
    search_fields = ('user__username', 'notes')