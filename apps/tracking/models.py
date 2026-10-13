from django.contrib.auth.models import User
from django.db import models

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
            models.Index(fields=['user', 'occurrence_date']),
        ]

    def __str__(self):
        return f"{self.user.username} - {self.routine_block.title} on {self.occurrence_date} ({self.status})"