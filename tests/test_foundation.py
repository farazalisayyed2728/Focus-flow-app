import pytest
from django.contrib.auth.models import User
from django.urls import reverse


@pytest.mark.django_db
def test_health_check_endpoint(client):
    url = reverse('health-check')
    response = client.get(url)
    assert response.status_code == 200
    assert response.json() == {
        'status': 'healthy',
        'database': 'ok',
        'cache': 'ok',
    }


@pytest.mark.django_db
def test_home_today_and_analytics_navigation(client):
    user = User.objects.create_user(username='navigation_user', password='Password123!')
    client.force_login(user)

    home_response = client.get(reverse('core:home'))
    assert home_response.status_code == 302
    assert home_response.url == reverse('dashboard')

    today_response = client.get(reverse('today-dashboard'))
    assert today_response.status_code == 200
    assert 'Today' in today_response.content.decode('utf-8')

    analytics_response = client.get(reverse('analytics'))
    assert analytics_response.status_code == 200
    assert 'Weekly Review' in analytics_response.content.decode('utf-8')