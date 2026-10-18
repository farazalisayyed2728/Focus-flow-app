from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import Profile

class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'User Profile'
    fk_name = 'user'

class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline,)
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'get_timezone')
    list_filter = ('is_staff', 'is_superuser', 'is_active')

    def get_timezone(self, instance):
        return getattr(instance.profile, 'timezone', 'UTC')
    get_timezone.short_description = 'Timezone'

admin.site.unregister(User)
admin.site.register(User, UserAdmin)

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'display_name', 'timezone', 'theme', 'clock_format', 'onboarding_completed')
    list_filter = ('theme', 'clock_format', 'onboarding_completed', 'timezone')
    search_fields = ('user__username', 'display_name', 'main_goal')