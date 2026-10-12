from django.db import models
from django.contrib.auth.models import User
from apps.routines.models import RoutineBlock
from apps.habits.models import Habit

class Reminder(models.Model):
    TARGET_ROUTINE = 'routine'
    TARGET_HABIT = 'habit'

    TARGET_CHOICES = [
        (TARGET_ROUTINE, 'Routine Block'),
        (TARGET_HABIT, 'Habit'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reminders')
    target_type = models.CharField(max_length=20, choices=TARGET_CHOICES)
    routine_block = models.ForeignKey(RoutineBlock, on_delete=models.CASCADE, null=True, blank=True, related_name='reminders')
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE, null=True, blank=True, related_name='reminders')
    
    # Minutes before event to trigger notification (e.g. 0, 5, 10, 15)
    offset_minutes = models.PositiveIntegerField(default=10)
    is_enabled = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        target = self.routine_block.title if self.routine_block else (self.habit.name if self.habit else 'Target')
        return f"{self.user.username} reminder for {target} (-{self.offset_minutes}m)"