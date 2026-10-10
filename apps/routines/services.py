from .models import Routine, RoutineBlock

def get_or_create_default_routine(user):
    routine, _ = Routine.objects.get_or_create(
        user=user,
        is_active=True,
        defaults={'name': 'My Everyday Flow'}
    )
    return routine

def find_overlapping_blocks(routine, exclude_block_id=None):
    """
    Identifies blocks within the routine that overlap in time.
    """
    blocks = list(routine.blocks.filter(is_active=True).order_by('start_time'))
    if exclude_block_id:
        blocks = [b for b in blocks if b.id != exclude_block_id]

    overlapping_ids = set()
    for i in range(len(blocks)):
        for j in range(i + 1, len(blocks)):
            b1 = blocks[i]
            b2 = blocks[j]
            if max(b1.start_time, b2.start_time) < min(b1.end_time, b2.end_time):
                overlapping_ids.add(b1.id)
                overlapping_ids.add(b2.id)
    return overlapping_ids

def duplicate_routine_block(user, block_id):
    """
    Duplicates an existing block scoped safely by the owner.
    """
    original = RoutineBlock.objects.get(id=block_id, routine__user=user)
    new_block = RoutineBlock.objects.create(
        routine=original.routine,
        title=f"{original.title} (Copy)",
        category=original.category,
        start_time=original.start_time,
        end_time=original.end_time,
        notes=original.notes,
        color_token=original.color_token,
        sort_order=original.sort_order + 1,
        is_active=original.is_active
    )
    return new_block