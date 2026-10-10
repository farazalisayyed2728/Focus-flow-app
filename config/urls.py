from django.contrib import admin
from django.urls import path , include
from apps.core.views import HealthCheckView, shell_preview

urlpatterns = [
    path('admin/', admin.site.urls),
    path('health/', HealthCheckView.as_view(), name='health-check'),
    path('design-system/', shell_preview, name='design-system-preview'),
    path('', include('apps.accounts.urls')),
]
