from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from .models import RoutineBlock
from .forms import RoutineBlockForm
from .services import get_or_create_default_routine, find_overlapping_blocks, duplicate_routine_block

@login_required
def routine_builder(request):
    routine = get_or_create_default_routine(request.user)
    blocks = routine.blocks.all()
    overlapping_ids = find_overlapping_blocks(routine)
    return render(request, 'routines/builder.html', {
        'routine': routine,
        'blocks': blocks,
        'overlapping_ids': overlapping_ids,
        'form': RoutineBlockForm(),
    })

@login_required
def block_create(request):
    routine = get_or_create_default_routine(request.user)
    if request.method == 'POST':
        form = RoutineBlockForm(request.POST)
        if form.is_valid():
            block = form.save(commit=False)
            block.routine = routine
            block.save()
            overlapping_ids = find_overlapping_blocks(routine)
            return render(request, 'routines/partials/block_row.html', {
                'block': block,
                'is_overlap': block.id in overlapping_ids,
            })
        return render(request, 'routines/partials/block_form.html', {'form': form}, status=422)
    return render(request, 'routines/partials/block_form.html', {'form': RoutineBlockForm()})

@login_required
def block_update(request, block_id):
    block = get_object_or_404(RoutineBlock, id=block_id, routine__user=request.user)
    routine = block.routine
    if request.method == 'POST':
        form = RoutineBlockForm(request.POST, instance=block)
        if form.is_valid():
            block = form.save()
            overlapping_ids = find_overlapping_blocks(routine)
            return render(request, 'routines/partials/block_row.html', {
                'block': block,
                'is_overlap': block.id in overlapping_ids,
            })
        return render(request, 'routines/partials/block_form.html', {'form': form, 'block': block}, status=422)
    return render(request, 'routines/partials/block_form.html', {'form': RoutineBlockForm(instance=block), 'block': block})

@login_required
def block_delete(request, block_id):
    block = get_object_or_404(RoutineBlock, id=block_id, routine__user=request.user)
    if request.method == 'POST':
        block.delete()
        return HttpResponse("")
    return HttpResponse(status=405)

@login_required
def block_duplicate(request, block_id):
    if request.method == 'POST':
        new_block = duplicate_routine_block(request.user, block_id)
        overlapping_ids = find_overlapping_blocks(new_block.routine)
        return render(request, 'routines/partials/block_row.html', {
            'block': new_block,
            'is_overlap': new_block.id in overlapping_ids,
        })
    return HttpResponse(status=405)