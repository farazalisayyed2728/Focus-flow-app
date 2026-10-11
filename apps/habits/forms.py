from django import forms
from .models import Habit

class HabitForm(forms.ModelForm):
    class Meta:
        model = Habit
        fields = ['name', 'category', 'frequency_type', 'target_value', 'unit', 'preferred_time', 'description']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'input', 'placeholder': 'e.g., Read 20 pages'}),
            'category': forms.Select(attrs={'class': 'input'}),
            'frequency_type': forms.Select(attrs={'class': 'input'}),
            'target_value': forms.NumberInput(attrs={'class': 'input', 'min': 1}),
            'unit': forms.TextInput(attrs={'class': 'input', 'placeholder': 'e.g., pages, mins, times'}),
            'preferred_time': forms.TimeInput(attrs={'class': 'input', 'type': 'time'}),
            'description': forms.Textarea(attrs={'class': 'input', 'rows': 2, 'placeholder': 'Why this habit matters'}),
        }