import pytest
from django.urls import reverse
from django.contrib.auth.models import User

@pytest.mark.django_db
def test_signup_creates_profile_and_redirects(client):
    url = reverse('signup')
    data = {
        'username': 'focus_alex',
        'email': 'alex@example.com',
        'password': 'SecurePassword123!',
        'password_confirm': 'SecurePassword123!',
    }
    response = client.post(url, data)
    assert response.status_code == 302
    assert response.url == reverse('onboarding')

    user = User.objects.get(username='focus_alex')
    assert user.profile is not None
    assert user.profile.onboarding_completed is False

@pytest.mark.django_db
def test_onboarding_completion(client):
    user = User.objects.create_user(username='test_user', password='Password123!')
    client.force_login(user)

    url = reverse('onboarding')
    data = {
        'display_name': 'Alex Dev',
        'timezone': 'UTC',
        'typical_wake_time': '07:00:00',
        'typical_sleep_time': '23:00:00',
        'main_goal': 'Consistent Deep Work',
        'template_choice': 'developer',
    }
    response = client.post(url, data)
    assert response.status_code == 302
    assert response.url == reverse('dashboard')

    user.refresh_from_db()
    assert user.profile.onboarding_completed is True
    assert user.profile.display_name == 'Alex Dev'