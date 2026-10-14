import pytest
from datetime import time, date, timedelta
from django.urls import reverse
from django.contrib.auth.models import User
from django.core.cache import cache
from apps.routines.models import Routine, RoutineBlock
from apps.tracking.models import ScheduleOccurrence
from apps.analytics.services import get_cached_weekly_metrics, calculate_weekly_metrics

@pytest.mark.django_db
def test_dashboard_query_count_bounded(client, django_assert_num_queries):
    """
    Ensure the daily dashboard execution does not introduce N+1 database queries
    as the number of routine blocks increases.
    """
    user = User.objects.create_user(username='perf_user', password='Password123!')
    user.profile.onboarding_completed = True
    user.profile.save()
    client.force_login(user)

    routine = Routine.objects.create(user=user, name='Daily Flow', is_active=True)
    
    # Create 10 distinct routine blocks
    for i in range(10):
        start_h = 7 + i
        RoutineBlock.objects.create(
            routine=routine,
            title=f"Block {i}",
            category="Study",
            start_time=time(start_h, 0),
            end_time=time(start_h, 45),
            is_active=True
        )

    # Initial view load (pre-populates occurrences)
    client.get(reverse('dashboard'))

    # Subsequent dashboard request must run within a strict query budget (exactly 6 queries)
    # Regardless of whether there are 5 or 20 blocks, query count remains constant
    with django_assert_num_queries(6):
        response = client.get(reverse('dashboard'))
        assert response.status_code == 200

@pytest.mark.django_db
def test_cache_weekly_metrics_and_invalidation(client):
    cache.clear()
    user = User.objects.create_user(username='cache_tester', password='Password123!')
    client.force_login(user)

    today = date.today()
    start_of_week = today - timedelta(days=today.weekday())

    routine = Routine.objects.create(user=user, name='Routine', is_active=True)
    block = RoutineBlock.objects.create(
        routine=routine,
        title='Coding',
        start_time=time(9, 0),
        end_time=time(10, 0),
        duration_minutes=60
    )

    occ = ScheduleOccurrence.objects.create(
        user=user,
        routine_block=block,
        occurrence_date=start_of_week,
        status='planned'
    )

    # 1. Fetch metrics via cache helper: initial calculation
    metrics = get_cached_weekly_metrics(user, today)
    assert metrics['total_completed_hours'] == 0.0

    # 2. Toggle completion using the endpoint (which invalidates the cache)
    toggle_url = reverse('toggle-occurrence', kwargs={'occurrence_id': occ.id})
    res = client.post(toggle_url)
    assert res.status_code == 200

    # 3. New metrics fetch calculates fresh completed hours
    fresh_metrics = get_cached_weekly_metrics(user, today)
    assert fresh_metrics['total_completed_hours'] == 1.0

@pytest.mark.django_db
def test_readiness_probe_status(client):
    url = reverse('readiness-check')
    response = client.get(url)
    assert response.status_code == 200
    data = response.json()
    assert data['status'] == 'ready'
    assert 'database' in data['checks']
    assert 'cache' in data['checks']
    assert data['checks']['database']['status'] == 'healthy'
    assert data['checks']['cache']['status'] == 'healthy'