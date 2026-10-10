from django import forms
from .models import RoutineBlock

class RoutineBlockForm(forms.ModelForm):
    class Meta:
        model = RoutineBlock
        fields = ['title', 'category', 'start_time', 'end_time', 'notes', 'is_active']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'input', 'placeholder': 'e.g., Deep Work (Python)'}),
            'category': forms.Select(attrs={'class': 'input'}),
            'start_time': forms.TimeInput(attrs={'class': 'input', 'type': 'time'}),
            'end_time': forms.TimeInput(attrs={'class': 'input', 'type': 'time'}),
            'notes': forms.Textarea(attrs={'class': 'input', 'rows': 2, 'placeholder': 'Optional details or tasks'}),
            'is_active': forms.CheckboxInput(),
        }

    def clean(self):
        cleaned_data = super().clean()
        start = cleaned_data.get('start_time')
        end = cleaned_data.get('end_time')
        if start and end and start >= end:
            self.add_error('end_time', 'End time must be later than start time.')
        return cleaned_data