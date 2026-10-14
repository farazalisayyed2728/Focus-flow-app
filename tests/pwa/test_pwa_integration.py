import pytest
from django.urls import reverse

@pytest.mark.django_db
def test_manifest_endpoint(client):
    url = reverse('pwa-manifest')
    response = client.get(url)
    assert response.status_code == 200
    assert response['Content-Type'] == 'application/manifest+json'
    content = response.content.decode('utf-8')
    assert "FocusFlow" in content
    assert "standalone" in content

@pytest.mark.django_db
def test_service_worker_endpoint(client):
    url = reverse('service-worker')
    response = client.get(url)
    assert response.status_code == 200
    assert response['Content-Type'] == 'application/javascript'
    assert response.headers.get('Service-Worker-Allowed') == '/'
    content = response.content.decode('utf-8')
    assert "focusflow-v1" in content

@pytest.mark.django_db
def test_offline_page_rendering(client):
    url = reverse('offline')
    response = client.get(url)
    assert response.status_code == 200
    assert "Currently Offline" in response.content.decode('utf-8')