import functools
from django.core.cache import cache
from django.http import HttpResponse

def rate_limit(key_prefix='rl', limit=5, period=60):
    """
    Cache-based IP rate limiter decorator.
    limit: maximum requests allowed per period (in seconds).
    """
    def decorator(view_func):
        @functools.wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            # Resolve client IP
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                ip = x_forwarded_for.split(',')[0].strip()
            else:
                ip = request.META.get('REMOTE_ADDR', '127.0.0.1')

            cache_key = f"{key_prefix}:{ip}"
            current_requests = cache.get(cache_key, 0)

            if current_requests >= limit:
                return HttpResponse(
                    "Too many requests. Please slow down and try again later.",
                    status=429
                )

            # Increment count
            if current_requests == 0:
                cache.set(cache_key, 1, timeout=period)
            else:
                cache.incr(cache_key)

            return view_func(request, *args, **kwargs)
        return _wrapped_view
    return decorator