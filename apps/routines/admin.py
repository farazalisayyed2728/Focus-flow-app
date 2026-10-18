from django.contrib import admin
from .models import Routine, RoutineBlock

class RoutineBlockInline(admin.TabularInline):
    model = RoutineBlock
    extra = 1
    fields = ('title', 'category', 'start_time', 'end_time', 'duration_minutes', 'is_active')
    readonly_fields = ('duration_minutes',)

@admin.register(Routine)
class RoutineAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'is_active', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('name', 'user__username')
    inlines = [RoutineBlockInline]

@admin.register(RoutineBlock)
class RoutineBlockAdmin(admin.ModelAdmin):
    list_display = ('title', 'routine', 'category', 'start_time', 'end_time', 'duration_minutes', 'is_active')
    list_filter = ('category', 'is_active')
    search_fields = ('title', 'routine__name', 'routine__user__username')