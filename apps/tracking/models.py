from django.contrib.auth.models import User
from django.db import models

from django.core.validators import MinValueValidator
from apps.routines.models import RoutineBlock

from apps.routines.models import RoutineBlock


class ScheduleOccurrence(models.Model):
    STATUS_CHOICES = [
        ('planned', 'Planned'),
        ('completed', 'Completed'),
        ('skipped', 'Skipped'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='occurrences')
    routine_block = models.ForeignKey(RoutineBlock, on_delete=models.CASCADE, related_name='occurrences')
    occurrence_date = models.DateField(db_index=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='planned')
    actual_minutes = models.PositiveIntegerField(default=0)
    completed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # Ensures one unique record per user, block, and date
        unique_together = ('user', 'routine_block', 'occurrence_date')
        indexes = [
            models.Index(fields=['user', 'occurrence_date'], name='track_user_date_idx'),
            models.Index(fields=['user', 'status', 'occurrence_date'], name='track_user_stat_date_idx'),
        ]

    def __str__(self):
        return f"{self.user.username} - {self.routine_block.title} on {self.occurrence_date} ({self.status})"



class Task(models.Model):
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    ]
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    routine_block = models.ForeignKey(RoutineBlock, on_delete=models.SET_NULL, null=True, blank=True, related_name='tasks')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='pending')
    due_date = models.DateField(db_index=True)
    estimated_minutes = models.PositiveIntegerField(default=30)
    actual_minutes = models.PositiveIntegerField(default=0)
    completed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['due_date', '-priority']
        indexes = [
            models.Index(fields=['user', 'status', 'due_date'], name='task_user_stat_due_idx'),
        ]

    def __str__(self):
        return f"{self.title} ({self.status}) - {self.user.username}"

class FocusSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='focus_sessions')
    task = models.ForeignKey(Task, on_delete=models.SET_NULL, null=True, blank=True, related_name='focus_sessions')
    mode = models.CharField(max_length=20, default='focus')  # focus, short, long
    duration_minutes = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    started_at = models.DateTimeField()
    ended_at = models.DateTimeField()
    completed_normally = models.BooleanField(default=True)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ['-ended_at']
        indexes = [
            models.Index(fields=['user', 'started_at'], name='focus_user_start_idx'),
        ]

    def __str__(self):
        return f"{self.user.username} Focus: {self.duration_minutes}m on {self.started_at.date()}"