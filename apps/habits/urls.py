from django.urls import path

from .views import habit_archive, habit_create, habit_list, habit_pause, habit_toggle

urlpatterns = [
    path('', habit_list, name='habit-list'),
    path('create/', habit_create, name='habit-create'),
    path('<int:habit_id>/toggle/', habit_toggle, name='habit-toggle'),
    path('<int:habit_id>/pause/', habit_pause, name='habit-pause'),
    path('<int:habit_id>/archive/', habit_archive, name='habit-archive'),
]