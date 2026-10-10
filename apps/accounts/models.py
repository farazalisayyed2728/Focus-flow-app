from django.db import models
from django.contrib.auth.models import User
import zoneinfo

# Common timezones fallback
TIMEZONE_CHOICES = [(tz, tz) for tz in sorted(zoneinfo.available_timezones())]

class Profile(models.Model):
    THEME_CHOICES = [
        ('system', 'System'),
        ('light', 'Light'),
        ('dark', 'Dark'),
    ]
    CLOCK_CHOICES = [
        ('12h', '12-Hour (AM/PM)'),
        ('24h', '24-Hour'),
    ]
    WEEK_START_CHOICES = [
        (0, 'Monday'),
        (6, 'Sunday'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    display_name = models.CharField(max_length=100, blank=True)
    timezone = models.CharField(max_length=64, default='UTC', choices=TIMEZONE_CHOICES)
    theme = models.CharField(max_length=10, choices=THEME_CHOICES, default='system')
    clock_format = models.CharField(max_length=5, choices=CLOCK_CHOICES, default='12h')
    week_start = models.IntegerField(choices=WEEK_START_CHOICES, default=0)
    
    # Onboarding tracking
    typical_wake_time = models.TimeField(null=True, blank=True)
    typical_sleep_time = models.TimeField(null=True, blank=True)
    main_goal = models.CharField(max_length=255, blank=True)
    onboarding_completed = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} Profile"