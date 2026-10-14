from django import forms
from django.contrib.auth.models import User

from .models import Profile
from apps.notifications.models import NotificationPreference


class SignUpForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'input', 'placeholder': '••••••••'}))
    password_confirm = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'input', 'placeholder': '••••••••'}))

    class Meta:
        model = User
        fields = ['username', 'email']
        widgets = {
            'username': forms.TextInput(attrs={'class': 'input', 'placeholder': 'alex'}),
            'email': forms.EmailInput(attrs={'class': 'input', 'placeholder': 'alex@example.com'}),
        }

    def clean(self):
        cleaned_data = super().clean()
        pw = cleaned_data.get("password")
        pw_confirm = cleaned_data.get("password_confirm")
        if pw and pw_confirm and pw != pw_confirm:
            raise forms.ValidationError("Passwords do not match.")
        return cleaned_data

class OnboardingForm(forms.ModelForm):
    template_choice = forms.ChoiceField(
        choices=[
            ('skip', 'Start with a clean slate (blank)'),
            ('student', 'Student Focus'),
            ('developer', 'Developer Flow'),
            ('balanced', 'Balanced Day'),
        ],
        required=False,
        widget=forms.RadioSelect
    )

    class Meta:
        model = Profile
        fields = ['display_name', 'timezone', 'typical_wake_time', 'typical_sleep_time', 'main_goal']
        widgets = {
            'display_name': forms.TextInput(attrs={'class': 'input', 'placeholder': 'Your preferred name'}),
            'timezone': forms.Select(attrs={'class': 'input'}),
            'typical_wake_time': forms.TimeInput(attrs={'class': 'input', 'type': 'time'}),
            'typical_sleep_time': forms.TimeInput(attrs={'class': 'input', 'type': 'time'}),
            'main_goal': forms.TextInput(attrs={'class': 'input', 'placeholder': 'e.g. Master backend engineering'}),
        }


class ProfileSettingsForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['display_name', 'timezone', 'theme', 'clock_format', 'week_start', 'typical_wake_time', 'typical_sleep_time', 'main_goal']
        widgets = {
            'display_name': forms.TextInput(attrs={'class': 'input'}),
            'timezone': forms.Select(attrs={'class': 'input'}),
            'theme': forms.Select(attrs={'class': 'input'}),
            'clock_format': forms.Select(attrs={'class': 'input'}),
            'week_start': forms.Select(attrs={'class': 'input'}),
            'typical_wake_time': forms.TimeInput(attrs={'class': 'input', 'type': 'time'}),
            'typical_sleep_time': forms.TimeInput(attrs={'class': 'input', 'type': 'time'}),
            'main_goal': forms.TextInput(attrs={'class': 'input'}),
        }

class NotificationPreferenceForm(forms.ModelForm):
    class Meta:
        model = NotificationPreference
        fields = ['routine_reminders_enabled', 'habit_reminders_enabled', 'daily_start_reminder_enabled', 'in_app_enabled']
        widgets = {
            'routine_reminders_enabled': forms.CheckboxInput(),
            'habit_reminders_enabled': forms.CheckboxInput(),
            'daily_start_reminder_enabled': forms.CheckboxInput(),
            'in_app_enabled': forms.CheckboxInput(),
        }

class AccountDeleteConfirmationForm(forms.Form):
    confirmation = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'input', 'placeholder': 'Type DELETE to confirm'}),
        help_text="Type DELETE in capital letters to confirm permanent account deletion."
    )

    def clean_confirmation(self):
        val = self.cleaned_data.get('confirmation')
        if val != 'DELETE':
            raise forms.ValidationError("You must type 'DELETE' to confirm.")
        return val