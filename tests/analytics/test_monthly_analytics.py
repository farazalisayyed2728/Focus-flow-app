import pytest
from datetime import date, time
from django.urls import reverse
from django.contrib.auth.models import User
from apps.routines.models import Routine, RoutineBlock
from apps.tracking.models import ScheduleOccurrence
from apps.analytics.services import calculate_monthly_metrics

@pytest.mark.django_db
def test_monthly_metrics_calculation(client):
    user = User.objects.create_user(username='monthly_user', password='Password123!')
    client.force_login(user)

    target_date = date(2026, 10, 5)
    routine = Routine.objects.create(user=user, name='Monthly Flow', is_active=True)
    block = RoutineBlock.objects.create(
        routine=routine,
        title='Deep Work',
        category='Work',
        start_time=time(10, 0),
        end_time=time(12, 0) # 120 mins
    )

    # Completed occurrence in Oct 2026
    ScheduleOccurrence.objects.create(
        user=user,
        routine_block=block,
        occurrence_date=target_date,
        status='completed',
        actual_minutes=120
    )

    metrics = calculate_monthly_metrics(user, year=2026, month=10)
    assert metrics['total_planned_hours'] == 2.0
    assert metrics['total_completed_hours'] == 2.0
    assert metrics['active_days'] == 1
    assert metrics['completion_rate'] == 100
    assert len(metrics['heatmap_weeks']) >= 4

    # View test
    url = reverse('monthly-analytics')
    response = client.get(f"{url}?year=2026&month=10")
    assert response.status_code == 200
    assert 'Monthly Review' in response.content.decode('utf-8')
    assert 'Activity Heatmap' in response.content.decode('utf-8')