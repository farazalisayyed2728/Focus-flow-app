from apps.routines.models import Routine, RoutineBlock
from apps.habits.models import Habit, HabitOccurrence
from apps.tracking.models import ScheduleOccurrence
from apps.notifications.models import Notification

def compile_user_data_export(user):
    """
    Assembles all user data into an exportable dictionary structure.
    """
    profile = getattr(user, 'profile', None)

    routines_data = []
    for r in Routine.objects.filter(user=user).prefetch_related('blocks'):
        blocks_data = [
            {
                'id': b.id,
                'title': b.title,
                'category': b.category,
                'start_time': b.start_time.strftime('%H:%M'),
                'end_time': b.end_time.strftime('%H:%M'),
                'duration_minutes': b.duration_minutes,
                'notes': b.notes,
                'is_active': b.is_active,
            }
            for b in r.blocks.all()
        ]
        routines_data.append({
            'name': r.name,
            'description': r.description,
            'is_active': r.is_active,
            'blocks': blocks_data,
        })

    habits_data = [
        {
            'id': h.id,
            'name': h.name,
            'category': h.category,
            'frequency_type': h.frequency_type,
            'target_value': h.target_value,
            'unit': h.unit,
            'is_paused': h.is_paused,
            'is_archived': h.is_archived,
        }
        for h in Habit.objects.filter(user=user)
    ]

    schedule_tracking_data = [
        {
            'block_title': occ.routine_block.title,
            'occurrence_date': occ.occurrence_date.strftime('%Y-%m-%d'),
            'status': occ.status,
            'actual_minutes': occ.actual_minutes,
            'completed_at': occ.completed_at.isoformat() if occ.completed_at else None,
        }
        for occ in ScheduleOccurrence.objects.filter(user=user).select_related('routine_block')
    ]

    habit_occurrences_data = [
        {
            'habit_name': occ.habit.name,
            'occurrence_date': occ.occurrence_date.strftime('%Y-%m-%d'),
            'status': occ.status,
            'completed_at': occ.completed_at.isoformat() if occ.completed_at else None,
        }
        for occ in HabitOccurrence.objects.filter(user=user).select_related('habit')
    ]

    return {
        'account': {
            'username': user.username,
            'email': user.email,
            'date_joined': user.date_joined.isoformat(),
        },
        'profile': {
            'display_name': profile.display_name if profile else '',
            'timezone': profile.timezone if profile else 'UTC',
            'theme': profile.theme if profile else 'system',
            'clock_format': profile.clock_format if profile else '12h',
            'week_start': profile.week_start if profile else 0,
            'main_goal': profile.main_goal if profile else '',
        },
        'routines': routines_data,
        'habits': habits_data,
        'schedule_occurrences': schedule_tracking_data,
        'habit_occurrences': habit_occurrences_data,
    }