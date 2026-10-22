from datetime import time

import pytest
from django.contrib.auth.models import User
from django.test import RequestFactory
from django.urls import reverse
from django.utils import timezone

from apps.core.views import global_search_view
from apps.habits.models import Habit
from apps.routines.models import Routine, RoutineBlock
from apps.tracking.models import Task


@pytest.mark.django_db
def test_global_search_returns_user_scoped_results(client):
    user = User.objects.create_user(username="searcher", password="Password123!")
    other_user = User.objects.create_user(username="other", password="Password123!")
    routine = Routine.objects.create(user=user, name="Daily")
    other_routine = Routine.objects.create(user=other_user, name="Daily")
    task = Task.objects.create(
        user=user,
        title="Python Backend Work",
        description="Build the search endpoint",
        due_date=timezone.localdate(),
    )
    Task.objects.create(
        user=other_user,
        title="Python private task",
        due_date=timezone.localdate(),
    )
    block = RoutineBlock.objects.create(
        routine=routine,
        title="Deep Work",
        category="Work",
        start_time=time(9),
        end_time=time(10),
    )
    RoutineBlock.objects.create(
        routine=other_routine,
        title="Deep Work private",
        category="Work",
        start_time=time(9),
        end_time=time(10),
    )
    Habit.objects.create(user=user, name="Read 20 pages", category="Study")
    Habit.objects.create(user=other_user, name="Read private habit", category="Study")
    Habit.objects.create(user=user, name="Archived reading", is_archived=True)

    search_url = reverse("global-search")
    request_factory = RequestFactory()
    request = request_factory.get(search_url, {"q": "read"})
    request.user = user
    response = global_search_view(request)
    assert response.status_code == 200
    assert "Read 20 pages" in response.content.decode()
    assert "Read private habit" not in response.content.decode()
    assert "Archived reading" not in response.content.decode()

    request = request_factory.get(search_url, {"q": "deep"})
    request.user = user
    response = global_search_view(request)
    content = response.content.decode()
    assert f"#block-row-{block.id}" in content
    assert "Deep Work private" not in content

    request = request_factory.get(search_url, {"q": "python"})
    request.user = user
    response = global_search_view(request)
    content = response.content.decode()
    assert f"?task={task.id}#task-{task.id}" in content
    assert "Python private task" not in content


@pytest.mark.django_db
def test_global_search_requires_login_and_skips_short_queries(client):
    response = client.get(reverse("global-search"), {"q": "x"})
    assert response.status_code == 302

    user = User.objects.create_user(username="searcher", password="Password123!")
    request = RequestFactory().get(reverse("global-search"), {"q": "x"})
    request.user = user
    response = global_search_view(request)
    assert response.status_code == 200
    assert "Type at least 2 characters" in response.content.decode()
