from datetime import date, datetime

from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from .services import calculate_monthly_metrics, calculate_weekly_metrics


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

@login_required
def monthly_report_view(request):
    year_param = request.GET.get('year')
    month_param = request.GET.get('month')
    today = date.today()

    try:
        year = int(year_param) if year_param else today.year
        month = int(month_param) if month_param else today.month
        if not (1 <= month <= 12):
            raise ValueError
    except (ValueError, TypeError):
        year, month = today.year, today.month

    metrics = calculate_monthly_metrics(request.user, year, month)

    if request.headers.get('HX-Request'):
        return render(request, 'analytics/partials/monthly_stats.html', {'metrics': metrics})

    return render(request, 'analytics/monthly.html', {'metrics': metrics})
