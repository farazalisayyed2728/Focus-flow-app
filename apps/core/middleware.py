class SecurityHeadersMiddleware:
    """
    Appends strict security headers to all HTTP responses.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        # Content Security Policy (CSP) compatible with CDNs used for HTMX / Alpine.js
        csp_directives = [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://unpkg.com",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data:",
            "connect-src 'self'",
            "font-src 'self'",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "frame-ancestors 'none'",
        ]
        response.headers.setdefault("Content-Security-Policy", "; ".join(csp_directives))

        # Permissions and Referrer policies
        response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
        response.headers.setdefault("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("X-Frame-Options", "DENY")

        return response 