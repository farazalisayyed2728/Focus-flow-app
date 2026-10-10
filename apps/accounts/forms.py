from django import forms
from django.contrib.auth.models import User
from .models import Profile

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