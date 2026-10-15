import pytest
from datetime import time, date
from django.urls import reverse
from django.contrib.auth.models import User
from apps.routines.models import Routine, RoutineBlock
from apps.tracking.models import ScheduleOccurrence

@pytest.mark.django_db
def test_dashboard_category_filtering(client):
    user = User.objects.create_user(username='phase13_user', password='Password123!')
    user.profile.onboarding_completed = True
    user.profile.save()
    client.force_login(user)

    routine = Routine.objects.create(user=user, name='Main Flow', is_active=True)
    RoutineBlock.objects.create(
        routine=routine,
        title='Python Backend Work',
        category='Work',
        start_time=time(9, 0),
        end_time=time(10, 0),
        is_active=True
    )
    RoutineBlock.objects.create(
        routine=routine,
        title='Evening Run',
        category='Fitness',
        start_time=time(18, 0),
        end_time=time(19, 0),
        is_active=True
    )

    # Filter by Work
    url_work = f"{reverse('dashboard')}?category=Work&filter_update=1"
    res_work = client.get(url_work, HTTP_HX_REQUEST='true')
    assert res_work.status_code == 200
    content = res_work.content.decode('utf-8')
    assert 'Python Backend Work' in content
    assert 'Evening Run' not in content

    # Filter by Fitness
    url_fitness = f"{reverse('dashboard')}?category=Fitness&filter_update=1"
    res_fitness = client.get(url_fitness, HTTP_HX_REQUEST='true')
    assert res_fitness.status_code == 200
    content_fit = res_fitness.content.decode('utf-8')
    assert 'Evening Run' in content_fit
    assert 'Python Backend Work' not in content_fit

@pytest.mark.django_db
def test_pomodoro_markup_presence(client):
    user = User.objects.create_user(username='pomo_user', password='Password123!')
    user.profile.onboarding_completed = True
    user.profile.save()
    client.force_login(user)

    res = client.get(reverse('dashboard'))
    assert res.status_code == 200
    content = res.content.decode('utf-8')
    assert 'Focus Timer' in content
    assert 'Short Break' in content