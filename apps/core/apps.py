from django.apps import AppConfig
from django.contrib import admin


class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.core'

    def ready(self):
        admin.site.site_header = "FocusFlow Administration"
        admin.site.site_title = "FocusFlow Portal"
        admin.site.index_title = "System & User Management"