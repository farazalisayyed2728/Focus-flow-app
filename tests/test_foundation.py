import pytest
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