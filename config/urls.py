from django.contrib import admin
from django.urls import include, path

from apps.core.views import HealthCheckView, shell_preview
from apps.dashboard.views import dashboard_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('health/', HealthCheckView.as_view(), name='health-check'),
    path('design-system/', shell_preview, name='design-system-preview'),
    path('routines/', include('apps.routines.urls')),
    path('dashboard/', include('apps.dashboard.urls')),
    path('today/', dashboard_view, name='today-dashboard'),
    path('', include('apps.accounts.urls')),
    path('habits/', include('apps.habits.urls')),
    path('notifications/', include('apps.notifications.urls')),
    path('reminders/', include('apps.reminders.urls')),
    path('analytics/', include('apps.analytics.urls')),
    path('', include('apps.core.urls')),
]
