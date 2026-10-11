from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from apps.tracking.services import get_today_timeline_data, toggle_occurrence_status
from apps.tracking.models import ScheduleOccurrence

@login_required
def dashboard_view(request):
    data = get_today_timeline_data(request.user)
    return render(request, 'dashboard/index.html', {
        'timeline_data': data,
        'user': request.user,
    })

@login_required
def toggle_block_completion(request, occurrence_id):
    if request.method == 'POST':
        occ = toggle_occurrence_status(request.user, occurrence_id)
        # Fetch updated aggregates for HTMX swaps
        data = get_today_timeline_data(request.user, occ.occurrence_date)
        return render(request, 'dashboard/partials/occurrence_row.html', {
            'item': {
                'block': occ.routine_block,
                'occurrence': occ,
                'is_current': False,
            },
            'completion_pct': data['completion_pct'],
            'planned_minutes': data['planned_minutes'],
            'completed_minutes': data['completed_minutes'],
            'swap_summary': True,
        })