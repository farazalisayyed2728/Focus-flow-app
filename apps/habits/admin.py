from django.contrib import admin
from .models import Habit, HabitOccurrence

@admin.register(Habit)
class HabitAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'category', 'frequency_type', 'target_value', 'unit', 'is_paused', 'is_archived')
    list_filter = ('category', 'frequency_type', 'is_paused', 'is_archived')
    search_fields = ('name', 'user__username')

@admin.register(HabitOccurrence)
class HabitOccurrenceAdmin(admin.ModelAdmin):
    list_display = ('habit', 'user', 'occurrence_date', 'status', 'completed_at')
    list_filter = ('status', 'occurrence_date')
    search_fields = ('habit__name', 'user__username')