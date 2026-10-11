import pytest
from datetime import date, timedelta
from django.urls import reverse
from django.contrib.auth.models import User
from apps.habits.models import Habit, HabitOccurrence
from apps.habits.services import calculate_habit_streak, toggle_habit_status

@pytest.mark.django_db
def test_habit_creation_and_authorization(client):
    user1 = User.objects.create_user(username='u1', password='Password123!')
    user2 = User.objects.create_user(username='u2', password='Password123!')
    client.force_login(user1)

    url = reverse('habit-create')
    res = client.post(url, {
        'name': 'Drink 2L Water',
        'category': 'Health',
        'frequency_type': 'daily',
        'target_value': 2,
        'unit': 'liters',
    })
    assert res.status_code == 200
    assert Habit.objects.filter(user=user1, name='Drink 2L Water').exists()

    # User 2 cannot toggle User 1's habit
    habit = Habit.objects.get(name='Drink 2L Water')
    client.force_login(user2)
    toggle_url = reverse('habit-toggle', kwargs={'habit_id': habit.id})
    assert client.post(toggle_url).status_code == 404

@pytest.mark.django_db
def test_streak_calculation_logic():
    user = User.objects.create_user(username='streak_user', password='Password123!')
    habit = Habit.objects.create(user=user, name='Read', frequency_type='daily')

    today = date.today()
    # Mark completed for today, yesterday, and day before yesterday
    HabitOccurrence.objects.create(habit=habit, user=user, occurrence_date=today, status='completed')
    HabitOccurrence.objects.create(habit=habit, user=user, occurrence_date=today - timedelta(days=1), status='completed')
    HabitOccurrence.objects.create(habit=habit, user=user, occurrence_date=today - timedelta(days=2), status='completed')

    assert calculate_habit_streak(habit, today) == 3

    # Toggle today off -> streak drops to 2 (continuous through yesterday)
    toggle_habit_status(habit, today)
    assert calculate_habit_streak(habit, today) == 2