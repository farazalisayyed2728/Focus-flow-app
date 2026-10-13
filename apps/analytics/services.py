from datetime import date, timedelta

from apps.habits.models import Habit, HabitOccurrence
from apps.tracking.models import ScheduleOccurrence


def calculate_weekly_metrics(user, ref_date=None):
    """
    Computes bounded 7-day analytics for the week containing ref_date (Monday to Sunday).
    """
    if ref_date is None:
        ref_date = date.today()

    # Determine start (Monday) and end (Sunday) of the selected week
    start_of_week = ref_date - timedelta(days=ref_date.weekday())
    end_of_week = start_of_week + timedelta(days=6)

    # 1. Routine Schedule Occurrences for the 7 days
    occurrences = ScheduleOccurrence.objects.filter(
        user=user,
        occurrence_date__range=(start_of_week, end_of_week)
    ).select_related('routine_block')

    # Planned and completed minutes
    total_planned_minutes = sum(o.routine_block.duration_minutes for o in occurrences)
    total_completed_minutes = sum(o.actual_minutes for o in occurrences if o.status == 'completed')

    completion_rate = int((total_completed_minutes / total_planned_minutes) * 100) if total_planned_minutes > 0 else 0

    # 2. Daily breakdown & best/weakest day identification
    days_data = []
    best_day = None
    weakest_day = None
    max_completed = -1
    min_completed = float('inf')

    for i in range(7):
        curr_day = start_of_week + timedelta(days=i)
        day_occs = [o for o in occurrences if o.occurrence_date == curr_day]

        day_planned = sum(o.routine_block.duration_minutes for o in day_occs)
        day_completed = sum(o.actual_minutes for o in day_occs if o.status == 'completed')
        day_rate = int((day_completed / day_planned) * 100) if day_planned > 0 else 0

        day_dict = {
            'date': curr_day,
            'day_name': curr_day.strftime('%a'),
            'planned_minutes': day_planned,
            'completed_minutes': day_completed,
            'completion_rate': day_rate,
            'planned_hours': round(day_planned / 60, 1),
            'completed_hours': round(day_completed / 60, 1),
        }
        days_data.append(day_dict)

        if day_planned > 0:
            if day_completed > max_completed:
                max_completed = day_completed
                best_day = curr_day.strftime('%A')
            if day_completed < min_completed:
                min_completed = day_completed
                weakest_day = curr_day.strftime('%A')

    # 3. Category Breakdown
    categories = {}
    for o in occurrences:
        cat = o.routine_block.category
        if cat not in categories:
            categories[cat] = {'planned': 0, 'completed': 0}
        categories[cat]['planned'] += o.routine_block.duration_minutes
        if o.status == 'completed':
            categories[cat]['completed'] += o.actual_minutes

    category_summary = [
        {
            'name': cat,
            'planned_hours': round(vals['planned'] / 60, 1),
            'completed_hours': round(vals['completed'] / 60, 1),
            'rate': int((vals['completed'] / vals['planned']) * 100) if vals['planned'] > 0 else 0,
        }
        for cat, vals in categories.items()
    ]

    # 4. Habit Consistency for the week
    habits = list(
        Habit.objects.filter(user=user, is_archived=False, is_paused=False)
        .values('id', 'frequency_type', 'target_value')
    )
    habits_by_id = {habit['id']: habit for habit in habits}
    habit_ids = list(habits_by_id)
    habit_occurrences = HabitOccurrence.objects.filter(
        user=user,
        habit_id__in=habit_ids,
        occurrence_date__range=(start_of_week, end_of_week),
        status='completed',
    ).values_list('habit_id', 'occurrence_date')

    completed_by_habit = {habit_id: 0 for habit_id in habit_ids}
    for habit_id, occurrence_date in habit_occurrences:
        habit = habits_by_id[habit_id]
        if (
            habit['frequency_type'] != Habit.FREQUENCY_WEEKDAYS
            or occurrence_date.weekday() < 5
        ):
            completed_by_habit[habit_id] += 1

    expected_habit_checks = 0
    total_habit_checks = 0
    for habit in habits:
        if habit['frequency_type'] == Habit.FREQUENCY_WEEKDAYS:
            expected_checks = 5
        elif habit['frequency_type'] == Habit.FREQUENCY_WEEKLY:
            expected_checks = habit['target_value']
        else:
            expected_checks = 7

        expected_habit_checks += expected_checks
        total_habit_checks += min(completed_by_habit[habit['id']], expected_checks)

    habit_rate = int((total_habit_checks / expected_habit_checks) * 100) if expected_habit_checks > 0 else 0

    return {
        'start_of_week': start_of_week,
        'end_of_week': end_of_week,
        'prev_week': start_of_week - timedelta(days=7),
        'next_week': start_of_week + timedelta(days=7),
        'total_planned_hours': round(total_planned_minutes / 60, 1),
        'total_completed_hours': round(total_completed_minutes / 60, 1),
        'completion_rate': completion_rate,
        'best_day': best_day or 'N/A',
        'weakest_day': weakest_day or 'N/A',
        'days_data': days_data,
        'category_summary': category_summary,
        'habit_rate': habit_rate,
        'habits_count': len(habits),
    }
