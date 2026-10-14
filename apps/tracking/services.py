from datetime import date, datetime, timedelta

from django.utils import timezone

from django.core.cache import cache
from apps.routines.models import Routine
from apps.tracking.models import ScheduleOccurrence


def get_today_timeline_data(user, target_date=None):
    """
    Builds the daily timeline, resolving existing occurrences
    or initializing planned ones idempotently.
    """
    if target_date is None:
        target_date = date.today()

    routine = Routine.objects.filter(user=user, is_active=True).first()
    if not routine:
        return {
            'blocks': [],
            'active_block': None,
            'next_block': None,
            'completion_pct': 0,
            'planned_minutes': 0,
            'completed_minutes': 0,
        }

    blocks = routine.blocks.filter(is_active=True).order_by('start_time')

    # Prefetch or create occurrences for today
    occurrences = {
        occ.routine_block_id: occ
        for occ in ScheduleOccurrence.objects.filter(user=user, occurrence_date=target_date)
    }

    now_time = datetime.now().time()
    timeline = []
    total_planned = 0
    total_completed = 0
    active_block = None
    next_block = None

    for block in blocks:
        occ = occurrences.get(block.id)
        if not occ:
            occ = ScheduleOccurrence.objects.create(
                user=user,
                routine_block=block,
                occurrence_date=target_date,
                status='planned'
            )

        duration = block.duration_minutes
        total_planned += duration
        if occ.status == 'completed':
            total_completed += duration

        # Detect active & next blocks
        is_current = block.start_time <= now_time < block.end_time
        if is_current:
            active_block = block
        elif block.start_time > now_time and next_block is None:
            next_block = block

        timeline.append({
            'block': block,
            'occurrence': occ,
            'is_current': is_current,
        })

    completion_pct = int(total_completed / total_planned * 100) if total_planned > 0 else 0

    return {
        'timeline': timeline,
        'active_block': active_block,
        'next_block': next_block,
        'completion_pct': completion_pct,
        'planned_minutes': total_planned,
        'completed_minutes': total_completed,
        'target_date': target_date,
    }


def toggle_occurrence_status(user, occurrence_id):
    occ = ScheduleOccurrence.objects.select_related('routine_block').get(id=occurrence_id, user=user)
    if occ.status == 'completed':
        occ.status = 'planned'
        occ.completed_at = None
        occ.actual_minutes = 0
    else:
        occ.status = 'completed'
        occ.completed_at = timezone.now()
        occ.actual_minutes = occ.routine_block.duration_minutes
    occ.save()

    # Invalidate cached analytics for this user
    cache.delete(f"analytics:weekly:{user.id}:{occ.occurrence_date - timedelta(days=occ.occurrence_date.weekday())}")
    cache.delete(f"analytics:monthly:{user.id}:{occ.occurrence_date.year}:{occ.occurrence_date.month}")
    return occ