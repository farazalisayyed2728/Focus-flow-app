from django.urls import path

from .views import dashboard_view, toggle_block_completion

urlpatterns = [
    path('', dashboard_view, name='dashboard'),
    path('occurrence/<int:occurrence_id>/toggle/', toggle_block_completion, name='toggle-occurrence'),
]