from datetime import datetime, date
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .services import calculate_weekly_metrics

@login_required
def weekly_report_view(request):
    ref_date_param = request.GET.get('date')
    if ref_date_param:
        try:
            ref_date = datetime.strptime(ref_date_param, '%Y-%m-%d').date()
        except ValueError:
            ref_date = date.today()
    else:
        ref_date = date.today()

    metrics = calculate_weekly_metrics(request.user, ref_date)

    if request.headers.get('HX-Request'):
        return render(request, 'analytics/partials/weekly_stats.html', {'metrics': metrics})

    return render(request, 'analytics/weekly.html', {'metrics': metrics})
