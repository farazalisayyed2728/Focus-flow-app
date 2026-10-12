from django.urls import path
from .views import notification_tray, notification_mark_read, notification_unread_count

urlpatterns = [
    path('tray/', notification_tray, name='notification-tray'),
    path('<int:notif_id>/read/', notification_mark_read, name='notification-mark-read'),
    path('unread-count/', notification_unread_count, name='notification-unread-count'),
]