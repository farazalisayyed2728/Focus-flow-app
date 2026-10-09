import pytest
from django.urls import reverse

@pytest.mark.django_db
def test_design_system_preview_view(client):
    url = reverse('design-system-preview')
    response = client.get(url)
    assert response.status_code == 200
    content = response.content.decode('utf-8')
    assert "FocusFlow" in content
    assert "data-theme" in content
    assert "desktop-sidebar" in content