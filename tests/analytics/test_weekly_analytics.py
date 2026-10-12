import pytest
from datetime import date, time, timedelta
from django.urls import reverse
from django.contrib.auth.models import User
from apps.routines.models import Routine, RoutineBlock
from apps.tracking.models import ScheduleOccurrence
from apps.analytics.services import calculate_weekly_metrics

@pytest.mark.django_db
def test_weekly_metrics_calculation(client):
    user = User.objects.create_user(username='analytics_user', password='Password123!')
    client.force_login(user)

    today = date.today()
    start_of_week = today - timedelta(days=today.weekday())

    routine = Routine.objects.create(user=user, name='Weekly Routine', is_active=True)
    block1 = RoutineBlock.objects.create(
        routine=routine,
        title='Morning Focus',
        category='Study',
        start_time=time(8, 0),
        end_time=time(10, 0)  # 120 mins
    )

    # Monday occurrence: completed
    ScheduleOccurrence.objects.create(
        user=user,
        routine_block=block1,
        occurrence_date=start_of_week,
        status='completed',
        actual_minutes=120
    )

    # Tuesday occurrence: planned but not completed
    ScheduleOccurrence.objects.create(
        user=user,
        routine_block=block1,
        occurrence_date=start_of_week + timedelta(days=1),
        status='planned',
        actual_minutes=0
    )

    metrics = calculate_weekly_metrics(user, today)
    assert metrics['total_planned_hours'] == 4.0   # 240 mins = 4 hours
    assert metrics['total_completed_hours'] == 2.0 # 120 mins = 2 hours
    assert metrics['completion_rate'] == 50

    url = reverse('weekly-analytics')
    response = client.get(url)
    assert response.status_code == 200
    assert 'Weekly Review' in response.content.decode('utf-8')