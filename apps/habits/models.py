from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.db import models


class Habit(models.Model):
    FREQUENCY_DAILY = 'daily'
    FREQUENCY_WEEKLY = 'weekly'
    FREQUENCY_WEEKDAYS = 'weekdays'

    FREQUENCY_CHOICES = [
        (FREQUENCY_DAILY, 'Daily'),
        (FREQUENCY_WEEKDAYS, 'Weekdays Only (Mon-Fri)'),
        (FREQUENCY_WEEKLY, 'Weekly Target'),
    ]

    CATEGORY_CHOICES = [
        ('Health', 'Health'),
        ('Study', 'Study'),
        ('Work', 'Work'),
        ('Fitness', 'Fitness'),
        ('Personal', 'Personal'),
        ('Creative', 'Creative'),
        ('Other', 'Other'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='habits')
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='Health')
    frequency_type = models.CharField(max_length=20, choices=FREQUENCY_CHOICES, default=FREQUENCY_DAILY)
    target_value = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1)])
    unit = models.CharField(max_length=50, default='times')
    preferred_time = models.TimeField(null=True, blank=True)
    
    is_paused = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['is_archived', 'is_paused', 'created_at']

    def __str__(self):
        return f"{self.user.username} - {self.name}"

class HabitOccurrence(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('skipped', 'Skipped'),
    ]

    habit = models.ForeignKey(Habit, on_delete=models.CASCADE, related_name='occurrences')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='habit_occurrences')
    occurrence_date = models.DateField(db_index=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    completed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('habit', 'occurrence_date')
        indexes = [
            models.Index(fields=['user', 'occurrence_date']),
        ]

    def __str__(self):
        return f"{self.habit.name} on {self.occurrence_date} ({self.status})"