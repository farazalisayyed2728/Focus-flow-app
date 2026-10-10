import pytest
from django.urls import reverse
from django.contrib.auth.models import User
from apps.routines.models import Routine, RoutineBlock
from datetime import time

@pytest.mark.django_db
def test_block_creation_and_authorization(client):
    user1 = User.objects.create_user(username='user1', password='Password123!')
    user2 = User.objects.create_user(username='user2', password='Password123!')
    
    client.force_login(user1)
    url = reverse('routine-block-create')
    data = {
        'title': 'Deep Python Work',
        'category': 'Work',
        'start_time': '09:00',
        'end_time': '11:00',
        'notes': 'Algorithms and testing',
        'is_active': True,
    }
    response = client.post(url, data)
    assert response.status_code == 200
    assert RoutineBlock.objects.filter(routine__user=user1, title='Deep Python Work').exists()

    # User 2 cannot edit or delete User 1's block
    block = RoutineBlock.objects.get(title='Deep Python Work')
    client.force_login(user2)
    delete_url = reverse('routine-block-delete', kwargs={'block_id': block.id})
    res_delete = client.post(delete_url)
    assert res_delete.status_code == 404

@pytest.mark.django_db
def test_block_duplicate_and_overlap(client):
    user = User.objects.create_user(username='alex', password='Password123!')
    client.force_login(user)
    
    routine = Routine.objects.create(user=user, name='Main Flow')
    block = RoutineBlock.objects.create(
        routine=routine,
        title='Morning Workout',
        category='Fitness',
        start_time=time(7, 0),
        end_time=time(8, 0)
    )

    dup_url = reverse('routine-block-duplicate', kwargs={'block_id': block.id})
    res_dup = client.post(dup_url)
    assert res_dup.status_code == 200
    assert RoutineBlock.objects.filter(routine=routine).count() == 2