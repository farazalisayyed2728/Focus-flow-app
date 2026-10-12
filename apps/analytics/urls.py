from django.urls import path
from .views import weekly_report_view

urlpatterns = [
    path('weekly/', weekly_report_view, name='weekly-analytics'),
]