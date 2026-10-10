from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

class Routine(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='routines')
    name = models.CharField(max_length=120, default='Daily Routine')
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_active', '-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.name}"

class RoutineBlock(models.Model):
    CATEGORY_CHOICES = [
        ('Study', 'Study'),
        ('Work', 'Work'),
        ('Fitness', 'Fitness'),
        ('Health', 'Health'),
        ('Personal', 'Personal'),
        ('Family', 'Family'),
        ('Social', 'Social'),
        ('Rest', 'Rest'),
        ('Creative', 'Creative'),
        ('Other', 'Other'),
    ]

    routine = models.ForeignKey(Routine, on_delete=models.CASCADE, related_name='blocks')
    title = models.CharField(max_length=150)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='Study')
    start_time = models.TimeField()
    end_time = models.TimeField()
    duration_minutes = models.PositiveIntegerField(default=0)
    notes = models.TextField(blank=True)
    color_token = models.CharField(max_length=30, default='accent')
    is_active = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['sort_order', 'start_time']

    def clean(self):
        if self.start_time and self.end_time:
            if self.start_time >= self.end_time:
                raise ValidationError("End time must be after start time.")

    def save(self, *args, **kwargs):
        self.clean()
        if self.start_time and self.end_time:
            start_min = self.start_time.hour * 60 + self.start_time.minute
            end_min = self.end_time.hour * 60 + self.end_time.minute
            self.duration_minutes = end_min - start_min
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} ({self.start_time.strftime('%H:%M')} - {self.end_time.strftime('%H:%M')})"