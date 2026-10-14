import json
import pytest
from django.urls import reverse
from django.contrib.auth.models import User
from apps.routines.models import Routine, RoutineBlock
from apps.habits.models import Habit
from apps.notifications.models import NotificationPreference
from datetime import time

@pytest.mark.django_db
def test_update_profile_settings(client):
    user = User.objects.create_user(username='pref_tester', password='Password123!')
    client.force_login(user)

    url = reverse('settings')
    post_data = {
        'action': 'update_profile',
        'display_name': 'Tester Flow',
        'timezone': 'Asia/Kolkata',
        'theme': 'dark',
        'clock_format': '24h',
        'week_start': 0,
        'main_goal': 'Consistent backend dev',
    }
    response = client.post(url, post_data)
    assert response.status_code == 302

    user.profile.refresh_from_db()
    assert user.profile.display_name == 'Tester Flow'
    assert user.profile.timezone == 'Asia/Kolkata'
    assert user.profile.clock_format == '24h'

@pytest.mark.django_db
def test_export_data_payload_structure(client):
    user = User.objects.create_user(username='exporter', password='Password123!')
    client.force_login(user)

    # Add a routine and habit for export
    routine = Routine.objects.create(user=user, name='My Routine', is_active=True)
    RoutineBlock.objects.create(
        routine=routine,
        title='Writing Code',
        category='Work',
        start_time=time(9, 0),
        end_time=time(10, 0)
    )
    Habit.objects.create(user=user, name='Meditation', category='Health')

    url = reverse('settings-export')
    response = client.get(url)
    assert response.status_code == 200
    assert response['Content-Type'] == 'application/json'

    data = json.loads(response.content.decode('utf-8'))
    assert data['account']['username'] == 'exporter'
    assert len(data['routines']) == 1
    assert data['routines'][0]['blocks'][0]['title'] == 'Writing Code'
    assert len(data['habits']) == 1
    assert data['habits'][0]['name'] == 'Meditation'

@pytest.mark.django_db
def test_account_deletion_cascade(client):
    user = User.objects.create_user(username='delete_me', password='Password123!')
    client.force_login(user)

    Routine.objects.create(user=user, name='Doomed Routine')
    Habit.objects.create(user=user, name='Doomed Habit')

    url = reverse('settings')
    res = client.post(url, {
        'action': 'delete_account',
        'confirmation': 'DELETE',
    })
    assert res.status_code == 302
    assert not User.objects.filter(username='delete_me').exists()
    assert not Routine.objects.filter(name='Doomed Routine').exists()
    assert not Habit.objects.filter(name='Doomed Habit').exists()