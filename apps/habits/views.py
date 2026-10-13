from datetime import date

from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render

from .forms import HabitForm
from .models import Habit, HabitOccurrence
from .services import (
    calculate_habit_streak,
    get_habit_week_history,
    toggle_habit_status,
)


def _habit_card_context(habit, today):
    today_occ = HabitOccurrence.objects.filter(habit=habit, occurrence_date=today).first()
    return {
        'habit': habit,
        'today_completed': today_occ.status == 'completed' if today_occ else False,
        'streak': calculate_habit_streak(habit, today),
        'history': get_habit_week_history(habit, today),
    }

@login_required
def habit_list(request):
    today = date.today()
    habits = Habit.objects.filter(user=request.user, is_archived=False)
    cards_data = [_habit_card_context(h, today) for h in habits]
    return render(request, 'habits/index.html', {
        'habits_data': cards_data,
        'form': HabitForm(),
    })

@login_required
def habit_create(request):
    if request.method == 'POST':
        form = HabitForm(request.POST)
        if form.is_valid():
            habit = form.save(commit=False)
            habit.user = request.user
            habit.save()
            context = _habit_card_context(habit, date.today())
            return render(request, 'habits/partials/habit_card.html', context)
        return render(request, 'habits/partials/habit_form.html', {'form': form}, status=422)
    return render(request, 'habits/partials/habit_form.html', {'form': HabitForm()})

@login_required
def habit_toggle(request, habit_id):
    if request.method == 'POST':
        habit = get_object_or_404(Habit, id=habit_id, user=request.user)
        toggle_habit_status(habit, date.today())
        context = _habit_card_context(habit, date.today())
        return render(request, 'habits/partials/habit_card.html', context)
    return HttpResponse(status=405)

@login_required
def habit_pause(request, habit_id):
    if request.method == 'POST':
        habit = get_object_or_404(Habit, id=habit_id, user=request.user)
        habit.is_paused = not habit.is_paused
        habit.save()
        context = _habit_card_context(habit, date.today())
        return render(request, 'habits/partials/habit_card.html', context)
    return HttpResponse(status=405)

@login_required
def habit_archive(request, habit_id):
    if request.method == 'POST':
        habit = get_object_or_404(Habit, id=habit_id, user=request.user)
        habit.is_archived = True
        habit.save()
        return HttpResponse("")
    return HttpResponse(status=405)