import json
from django.http import JsonResponse
import time
import logging
from django.db import connection
from django.core.cache import cache
from django.http import JsonResponse
from django.views import View
from django.db import DatabaseError, connection
from django.shortcuts import redirect, render
from redis.exceptions import RedisError
from django.http import HttpResponse, FileResponse
from django.conf import settings
import os


logger = logging.getLogger(__name__)


def shell_preview(request):
    return render(request, "shell_preview.html", {"show_shell_nav": True})


def home(request):
    return redirect("dashboard")



class HealthCheckView(View):
    def get(self, request, *args, **kwargs):
        status_data = {'status': 'healthy', 'database': 'ok', 'cache': 'ok'}
        http_status = 200

        try:
            connection.ensure_connection()
        except DatabaseError as exc:
            logger.error("Health check DB failure: %s", exc)
            status_data['database'] = 'unavailable'
            status_data['status'] = 'unhealthy'
            http_status = 503

        try:
            cache.set('_health_check', 'ok', timeout=5)
            if cache.get('_health_check') != 'ok':
                raise ValueError("Cache read failed")
        except (RedisError, ValueError) as exc:
            logger.error("Health check Cache failure: %s", exc)
            status_data['cache'] = 'unavailable'
            status_data['status'] = 'unhealthy'
            http_status = 503

        return JsonResponse(status_data, status=http_status)


class ReadinessCheckView(View):
    """
    Production liveness/readiness probe.
    Measures round-trip latency to PostgreSQL and Redis.
    """
    def get(self, request, *args, **kwargs):
        diagnostics = {}
        is_healthy = True

        # Database latency check
        db_start = time.perf_counter()
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1;")
                cursor.fetchone()
            db_latency_ms = round((time.perf_counter() - db_start) * 1000, 2)
            diagnostics['database'] = {'status': 'healthy', 'latency_ms': db_latency_ms}
        except Exception as exc:
            logger.error("Readiness check DB error: %s", exc)
            diagnostics['database'] = {'status': 'failing', 'error': str(exc)}
            is_healthy = False

        # Cache latency check
        cache_start = time.perf_counter()
        try:
            test_key = '_probe_test'
            cache.set(test_key, 1, timeout=5)
            if cache.get(test_key) != 1:
                raise ValueError("Cache read value mismatch")
            cache_latency_ms = round((time.perf_counter() - cache_start) * 1000, 2)
            diagnostics['cache'] = {'status': 'healthy', 'latency_ms': cache_latency_ms}
        except Exception as exc:
            logger.error("Readiness check Cache error: %s", exc)
            diagnostics['cache'] = {'status': 'failing', 'error': str(exc)}
            is_healthy = False

        status_code = 200 if is_healthy else 503
        return JsonResponse({
            'status': 'ready' if is_healthy else 'degraded',
            'checks': diagnostics
        }, status=status_code)



def service_worker(request):
    sw_path = os.path.join(settings.BASE_DIR, 'static', 'sw.js')
    with open(sw_path, 'r', encoding='utf-8') as f:
        content = f.read()
    response = HttpResponse(content, content_type='application/javascript')
    response['Service-Worker-Allowed'] = '/'
    return response

def pwa_manifest(request):
    manifest_path = os.path.join(settings.BASE_DIR, 'static', 'manifest.json')
    with open(manifest_path, 'r', encoding='utf-8') as f:
        content = f.read()
    return HttpResponse(content, content_type='application/manifest+json')

def offline_view(request):
    return render(request, 'offline.html')

    return JsonResponse(statement, safe=False)