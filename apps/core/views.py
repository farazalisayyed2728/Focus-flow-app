import logging
from django.db import connection
from django.core.cache import cache
from django.http import JsonResponse
from django.views import View
from django.shortcuts import render

logger = logging.getLogger(__name__)


def shell_preview(request):
    return render(request, "shell_preview.html")



class HealthCheckView(View):
    def get(self, request, *args, **kwargs):
        status_data = {'status': 'healthy', 'database': 'ok', 'cache': 'ok'}
        http_status = 200

        try:
            connection.ensure_connection()
        except Exception as exc:
            logger.error("Health check DB failure: %s", exc)
            status_data['database'] = 'unavailable'
            status_data['status'] = 'unhealthy'
            http_status = 503

        try:
            cache.set('_health_check', 'ok', timeout=5)
            if cache.get('_health_check') != 'ok':
                raise ValueError("Cache read failed")
        except Exception as exc:
            logger.error("Health check Cache failure: %s", exc)
            status_data['cache'] = 'unavailable'
            status_data['status'] = 'unhealthy'
            http_status = 503

        return JsonResponse(status_data, status=http_status)