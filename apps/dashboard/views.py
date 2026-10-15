from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from apps.tracking.services import get_today_timeline_data, toggle_occurrence_status


@login_required
def dashboard_view(request):
    category = request.GET.get('category', 'all')
    status = request.GET.get('status', 'all')
    data = get_today_timeline_data(request.user, category_filter=category, status_filter=status)

    if request.headers.get('HX-Request') and request.GET.get('filter_update'):
        return render(request, 'dashboard/partials/timeline_list.html', {'timeline_data': data})

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