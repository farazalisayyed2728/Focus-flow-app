from .base import *

DEBUG = True
ALLOWED_HOSTS = ['*']

MAILERS = {
    'default': {
        'BACKEND': 'django.core.mail.backends.console.EmailBackend',
    },
}