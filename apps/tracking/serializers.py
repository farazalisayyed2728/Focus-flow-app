from rest_framework import serializers
from .models import Task, FocusSession
from apps.habits.models import Habit

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'priority', 'status', 'due_date', 'estimated_minutes', 'actual_minutes', 'completed_at']
        read_only_fields = ['id', 'completed_at']

class FocusSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FocusSession
        fields = ['id', 'task', 'mode', 'duration_minutes', 'started_at', 'ended_at', 'completed_normally', 'notes']
        read_only_fields = ['id']

class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = ['id', 'name', 'category', 'frequency_type', 'target_value', 'unit', 'preferred_time', 'is_paused', 'is_archived']
        read_only_fields = ['id']