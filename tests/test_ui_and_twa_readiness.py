import pytest
from django.urls import reverse

def test_assetlinks_endpoint(client):
    url = reverse('assetlinks-json')
    response = client.get(url)
    assert response.status_code == 200
    assert response['Content-Type'] == 'application/json'
    data = response.json()
    assert isinstance(data, list)
    assert data[0]['target']['package_name'] == 'app.focusflow.twa'

def test_neumorphic_tokens_presence(client):
    url = reverse('design-system-preview')
    response = client.get(url)
    assert response.status_code == 200
    content = response.content.decode('utf-8')
    assert 'FocusFlow' in content