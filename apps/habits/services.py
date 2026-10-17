from datetime import date, timedelta

from django.utils import timezone

from .models import Habit, HabitOccurrence


def calculate_habit_streak(habit, ref_date=None):
    """
    Computes current streak deterministically based on target frequency.
    Paused days are ignored and do not reset the streak.
    """
    if ref_date is None:
        ref_date = date.today()

    completed_dates = set(
        HabitOccurrence.objects.filter(
            habit=habit,
            status='completed',
            occurrence_date__lte=ref_date
        ).values_list('occurrence_date', flat=True)
    )

    streak = 0
    curr_date = ref_date

    # If not completed today, allow continuity from yesterday
    if curr_date not in completed_dates:
        curr_date -= timedelta(days=1)

    while True:
        # For weekdays-only frequency, skip weekend checks
        if habit.frequency_type == Habit.FREQUENCY_WEEKDAYS and curr_date.weekday() in (5, 6):
            curr_date -= timedelta(days=1)
            continue

        if curr_date in completed_dates:
            streak += 1
            curr_date -= timedelta(days=1)
        else:
            break

    return streak

from django.db import transaction

def toggle_habit_status(habit, target_date=None):
    if target_date is None:
        target_date = date.today()

    with transaction.atomic():
        occ, _ = HabitOccurrence.objects.select_for_update().get_or_create(
            habit=habit,
            user=habit.user,
            occurrence_date=target_date,
        )
        if occ.status == 'completed':
            occ.status = 'pending'
            occ.completed_at = None
        else:
            occ.status = 'completed'
            occ.completed_at = timezone.now()
        occ.save()
        return occ

def get_habit_week_history(habit, end_date=None):
    """
    Returns the last 7 days status history for UI dots.
    """
    if end_date is None:
        end_date = date.today()

    start_date = end_date - timedelta(days=6)
    occurrences = {
        occ.occurrence_date: occ.status
        for occ in HabitOccurrence.objects.filter(
            habit=habit,
            occurrence_date__range=(start_date, end_date)
        )
    }

    history = []
    for i in range(7):
        day = start_date + timedelta(days=i)
        history.append({
            'date': day,
            'day_name': day.strftime('%a')[:1],
            'status': occurrences.get(day, 'pending'),
            'is_today': day == end_date,
        })
    return history