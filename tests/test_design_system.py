import pytest
from django.urls import reverse
from django.contrib.auth.models import User

@pytest.mark.django_db
def test_design_system_preview_view(client):
    user = User.objects.create_user(username='preview_user', password='Password123!')
    client.force_login(user)

    url = reverse('design-system-preview')
    response = client.get(url)
    assert response.status_code == 200
    content = response.content.decode('utf-8')
    assert "FocusFlow" in content
    assert "data-theme" in content
    assert "desktop-sidebar" in content