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


@pytest.mark.django_db
def test_anonymous_htmx_requests_do_not_redirect_or_render_sidebar(client):
    login_response = client.get(reverse('login'))
    assert login_response.status_code == 200
    assert 'desktop-sidebar' not in login_response.content.decode('utf-8')

    unread_response = client.get(reverse('notification-unread-count'), HTTP_HX_REQUEST='true')
    assert unread_response.status_code == 204