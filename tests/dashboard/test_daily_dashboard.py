from datetime import date, time

import pytest
from django.contrib.auth.models import User
from django.urls import reverse

from apps.routines.models import Routine, RoutineBlock
from apps.tracking.models import ScheduleOccurrence


@pytest.mark.django_db
def test_dashboard_renders_schedule_and_toggles(client):
    user = User.objects.create_user(username='tester', password='Password123!')
    user.profile.onboarding_completed = True
    user.profile.save()
    client.force_login(user)

    routine = Routine.objects.create(user=user, name='Daily', is_active=True)
    block = RoutineBlock.objects.create(
        routine=routine,
        title='Morning Workout',
        start_time=time(6, 30),
        end_time=time(7, 30),
        is_active=True
    )

    # 1. View dashboard
    url = reverse('dashboard')
    res = client.get(url, follow=True)
    assert res.status_code == 200
    assert 'Morning Workout' in res.content.decode('utf-8')

    # 2. Verify occurrence was initialized
    occ = ScheduleOccurrence.objects.get(user=user, routine_block=block, occurrence_date=date.today())
    assert occ.status == 'planned'

    # 3. Toggle to completed
    toggle_url = reverse('toggle-occurrence', kwargs={'occurrence_id': occ.id})
    res_toggle = client.post(toggle_url)
    assert res_toggle.status_code == 200

    occ.refresh_from_db()
    assert occ.status == 'completed'
    assert occ.actual_minutes == 60
    assert occ.completed_at is not None

    # 4. Toggle back to planned (idempotency check)
    res_toggle_back = client.post(toggle_url)
    assert res_toggle_back.status_code == 200
    occ.refresh_from_db()
    assert occ.status == 'planned'
    assert occ.actual_minutes == 0