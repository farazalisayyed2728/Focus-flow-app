from django.contrib import admin
from django.urls import include, path

from apps.core.views import HealthCheckView, assetlinks_json, offline_view, pwa_manifest, shell_preview,service_worker
from apps.dashboard.views import dashboard_view
from apps.core.views import HealthCheckView, ReadinessCheckView, shell_preview


from rest_framework.routers import DefaultRouter
from apps.tracking.api_views import TaskViewSet, FocusSessionViewSet, HabitViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='api-tasks')
router.register(r'focus-sessions', FocusSessionViewSet, basename='api-focus-sessions')
router.register(r'habits', HabitViewSet, basename='api-habits')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('health/', HealthCheckView.as_view(), name='health-check'),
    path('ready/', ReadinessCheckView.as_view(), name='readiness-check'),
    path('sw.js', service_worker, name='service-worker'),
    path('manifest.json', pwa_manifest, name='pwa-manifest'),
    path('offline/', offline_view, name='offline'),
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
    path('api/', include(router.urls)),
]
