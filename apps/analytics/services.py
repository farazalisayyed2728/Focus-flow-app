from datetime import date, timedelta
from apps.habits.models import Habit, HabitOccurrence
from apps.tracking.models import ScheduleOccurrence
import calendar

from django.db.models import Count, Sum, Avg, Q
from apps.tracking.models import ScheduleOccurrence, Task, FocusSession




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



def calculate_monthly_metrics(user, year=None, month=None):
    """
    Computes bounded monthly analytics and a calendar heatmap grid for the requested month.
    """
    today = date.today()
    if year is None:
        year = today.year
    if month is None:
        month = today.month

    # Total days and first weekday in the month
    num_days = calendar.monthrange(year, month)[1]
    start_date = date(year, month, 1)
    end_date = date(year, month, num_days)

    # 1. Fetch Schedule Occurrences bounded strictly to this month
    occurrences = list(ScheduleOccurrence.objects.filter(
        user=user,
        occurrence_date__range=(start_date, end_date)
    ).select_related('routine_block'))

    total_planned_minutes = sum(o.routine_block.duration_minutes for o in occurrences)
    total_completed_minutes = sum(o.actual_minutes for o in occurrences if o.status == 'completed')
    completion_rate = int((total_completed_minutes / total_planned_minutes) * 100) if total_planned_minutes > 0 else 0

    # Group occurrences by date
    occ_by_date = {}
    for o in occurrences:
        occ_by_date.setdefault(o.occurrence_date, []).append(o)

    active_days_count = sum(
        1 for d, occ_list in occ_by_date.items()
        if any(o.status == 'completed' for o in occ_list)
    )

    avg_daily_minutes = int(total_completed_minutes / active_days_count) if active_days_count > 0 else 0

    # 2. Category Distribution
    categories = {}
    for o in occurrences:
        cat = o.routine_block.category
        categories.setdefault(cat, {'planned': 0, 'completed': 0})
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

    # 3. Calendar Heatmap Matrix
    cal = calendar.Calendar(firstweekday=0) # Monday first
    month_days = cal.monthdatescalendar(year, month)

    heatmap_weeks = []
    for week in month_days:
        week_data = []
        for d in week:
            is_current_month = (d.month == month)
            day_occs = occ_by_date.get(d, [])
            day_planned = sum(o.routine_block.duration_minutes for o in day_occs)
            day_completed = sum(o.actual_minutes for o in day_occs if o.status == 'completed')
            rate = int((day_completed / day_planned) * 100) if day_planned > 0 else 0

            # Heatmap intensity bucket: 0 (none), 1 (low), 2 (medium), 3 (high)
            if not is_current_month or day_completed == 0:
                intensity = 0
            elif rate < 40:
                intensity = 1
            elif rate < 80:
                intensity = 2
            else:
                intensity = 3

            week_data.append({
                'date': d,
                'day_num': d.day,
                'is_current_month': is_current_month,
                'is_today': d == today,
                'intensity': intensity,
                'completed_hours': round(day_completed / 60, 1),
                'planned_hours': round(day_planned / 60, 1),
                'rate': rate,
            })
        heatmap_weeks.append(week_data)

    # 4. Navigation dates
    prev_month_date = (start_date - timedelta(days=1)).replace(day=1)
    next_month_date = (end_date + timedelta(days=1))

    return {
        'year': year,
        'month': month,
        'month_name': start_date.strftime('%B'),
        'total_planned_hours': round(total_planned_minutes / 60, 1),
        'total_completed_hours': round(total_completed_minutes / 60, 1),
        'completion_rate': completion_rate,
        'active_days': active_days_count,
        'avg_daily_hours': round(avg_daily_minutes / 60, 1),
        'category_summary': category_summary,
        'heatmap_weeks': heatmap_weeks,
        'prev_year': prev_month_date.year,
        'prev_month': prev_month_date.month,
        'next_year': next_month_date.year,
        'next_month': next_month_date.month,
    }

from django.core.cache import cache

def get_weekly_cache_key(user_id, start_date):
    return f"analytics:weekly:{user_id}:{start_date.isoformat()}"

def get_monthly_cache_key(user_id, year, month):
    return f"analytics:monthly:{user_id}:{year}:{month}"

def invalidate_user_analytics_cache(user_id):
    """
    Called when routine blocks or occurrences change state to clear cached aggregates.
    """
    pattern = f"analytics:*:{user_id}:*"
    # Clear general caches
    cache.delete_many([
        f"analytics:dash:{user_id}",
    ])

def get_cached_weekly_metrics(user, ref_date=None):
    from .services import calculate_weekly_metrics
    if ref_date is None:
        ref_date = date.today()
    start_of_week = ref_date - timedelta(days=ref_date.weekday())
    key = get_weekly_cache_key(user.id, start_of_week)

    cached_data = cache.get(key)
    if cached_data is not None:
        return cached_data

    fresh_metrics = calculate_weekly_metrics(user, ref_date)
    # Cache for 10 minutes (600 seconds)
    cache.set(key, fresh_metrics, timeout=600)
    return fresh_metrics


def calculate_productivity_score(user, target_date=None):
    """
    Computes a deterministic Daily Productivity Score (0 to 100) based on:
    - Task Completion Rate (40% weight)
    - Routine Execution (30% weight)
    - Habit Consistency (30% weight)
    """
    if target_date is None:
        target_date = date.today()

    # 1. Tasks
    task_stats = Task.objects.filter(user=user, due_date=target_date).aggregate(
        total=Count('id'),
        completed=Count('id', filter=Q(status='completed'))
    )
    task_rate = (task_stats['completed'] / task_stats['total']) if task_stats['total'] > 0 else 1.0

    # 2. Routine Schedule
    occ_stats = ScheduleOccurrence.objects.filter(user=user, occurrence_date=target_date).aggregate(
        total=Count('id'),
        completed=Count('id', filter=Q(status='completed'))
    )
    routine_rate = (occ_stats['completed'] / occ_stats['total']) if occ_stats['total'] > 0 else 1.0

    # 3. Habits
    active_habits_count = Habit.objects.filter(user=user, is_paused=False, is_archived=False).count()
    habit_completed_count = HabitOccurrence.objects.filter(
        user=user, occurrence_date=target_date, status='completed'
    ).count()
    habit_rate = (habit_completed_count / active_habits_count) if active_habits_count > 0 else 1.0

    score = int((task_rate * 40) + (routine_rate * 30) + (habit_rate * 30))
    return min(max(score, 0), 100)

def calculate_week_over_week_comparison(user, ref_date=None):
    """
    Measures productivity delta comparing the current week to the previous week.
    """
    if ref_date is None:
        ref_date = date.today()

    curr_start = ref_date - timedelta(days=ref_date.weekday())
    curr_end = curr_start + timedelta(days=6)

    prev_start = curr_start - timedelta(days=7)
    prev_end = curr_start - timedelta(days=1)

    curr_minutes = ScheduleOccurrence.objects.filter(
        user=user, occurrence_date__range=(curr_start, curr_end), status='completed'
    ).aggregate(total=Sum('actual_minutes'))['total'] or 0

    prev_minutes = ScheduleOccurrence.objects.filter(
        user=user, occurrence_date__range=(prev_start, prev_end), status='completed'
    ).aggregate(total=Sum('actual_minutes'))['total'] or 0

    if prev_minutes > 0:
        improvement_pct = round(((curr_minutes - prev_minutes) / prev_minutes) * 100, 1)
    else:
        improvement_pct = 100.0 if curr_minutes > 0 else 0.0

    return {
        'current_week_hours': round(curr_minutes / 60, 1),
        'previous_week_hours': round(prev_minutes / 60, 1),
        'improvement_pct': improvement_pct,
    }