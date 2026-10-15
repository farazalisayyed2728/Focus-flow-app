import pytest
from django.urls import reverse
from django.contrib.auth.models import User
from django.core.cache import cache
from apps.routines.models import Routine, RoutineBlock
from apps.habits.models import Habit
from apps.tracking.models import ScheduleOccurrence
from datetime import time, date

@pytest.fixture(autouse=True)
def clear_rate_limit_cache():
    cache.clear()
    yield
    cache.clear()

@pytest.mark.django_db
def test_security_headers_present(client):
    response = client.get(reverse('login'))
    assert response.status_code == 200
    assert 'Content-Security-Policy' in response.headers
    csp = response.headers['Content-Security-Policy']
    assert "default-src 'self'" in csp
    assert "script-src 'self'" in csp
    assert "script-src-attr 'none'" in csp
    assert "'unsafe-eval'" not in csp
    assert "'unsafe-inline'" not in csp.split("script-src ", 1)[1].split(";", 1)[0]
    assert "https://unpkg.com" not in csp
    assert "https://cdn.tailwindcss.com" not in csp
    assert response.headers.get('X-Content-Type-Options') == 'nosniff'
    assert response.headers.get('X-Frame-Options') == 'DENY'
    assert response.headers.get('Referrer-Policy') == 'strict-origin-when-cross-origin'

@pytest.mark.django_db
def test_login_rate_limiting(client):
    url = reverse('login')
    # Threshold is 10 requests within 60s
    for _ in range(10):
        res = client.get(url)
        assert res.status_code == 200

    # 11th request must be blocked
    res_blocked = client.get(url)
    assert res_blocked.status_code == 429
    assert b"Too many requests" in res_blocked.content

@pytest.mark.django_db
def test_idor_routine_block_tampering(client):
    user_a = User.objects.create_user(username='victim', password='Password123!')
    user_b = User.objects.create_user(username='attacker', password='Password123!')

    routine_a = Routine.objects.create(user=user_a, name="Victim Flow")
    block_a = RoutineBlock.objects.create(
        routine=routine_a,
        title="Secret Task",
        start_time=time(9, 0),
        end_time=time(10, 0)
    )

    client.force_login(user_b)

    # Attacker attempts to delete victim's block
    delete_url = reverse('routine-block-delete', kwargs={'block_id': block_a.id})
    res = client.post(delete_url)
    assert res.status_code == 404
    assert RoutineBlock.objects.filter(id=block_a.id).exists()

    # Attacker attempts to update victim's block
    update_url = reverse('routine-block-update', kwargs={'block_id': block_a.id})
    res_update = client.post(update_url, {
        'title': 'Hacked Task',
        'category': 'Work',
        'start_time': '09:00',
        'end_time': '10:00',
    })
    assert res_update.status_code == 404
    block_a.refresh_from_db()
    assert block_a.title == "Secret Task"

@pytest.mark.django_db
def test_idor_occurrence_toggle(client):
    user_a = User.objects.create_user(username='user_a', password='Password123!')
    user_b = User.objects.create_user(username='user_b', password='Password123!')

    routine_a = Routine.objects.create(user=user_a, name="Routine A")
    block_a = RoutineBlock.objects.create(
        routine=routine_a,
        title="A's Block",
        start_time=time(11, 0),
        end_time=time(12, 0)
    )
    occ_a = ScheduleOccurrence.objects.create(
        user=user_a,
        routine_block=block_a,
        occurrence_date=date.today(),
        status='planned'
    )

    client.force_login(user_b)
    toggle_url = reverse('toggle-occurrence', kwargs={'occurrence_id': occ_a.id})
    # Must fail or raise 404/DoesNotMatch ownership
    with pytest.raises(ScheduleOccurrence.DoesNotExist):
        client.post(toggle_url)

    occ_a.refresh_from_db()
    assert occ_a.status == 'planned'