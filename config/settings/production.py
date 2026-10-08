import os

from .base import *  # noqa: F403

SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]
DEBUG = False
ALLOWED_HOSTS = [
    host.strip()
    for host in os.environ["DJANGO_ALLOWED_HOSTS"].split(",")
    if host.strip()
]

SECURE_CONTENT_TYPE_NOSNIFF = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = os.environ.get("DJANGO_SECURE_SSL_REDIRECT", "true").lower() == "true"
