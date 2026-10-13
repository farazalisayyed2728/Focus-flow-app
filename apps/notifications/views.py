from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render

from .models import Notification
from .services import mark_notification_read


def _htmx_unauthenticated_response():
    return HttpResponse(status=204)


def notification_tray(request):
    if not request.user.is_authenticated:
        return _htmx_unauthenticated_response()

    notifications = Notification.objects.filter(user=request.user)[:10]
    unread_count = Notification.objects.filter(user=request.user, is_read=False).count()
    return render(request, 'notifications/partials/tray_content.html', {
        'notifications': notifications,
        'unread_count': unread_count,
    })


def notification_mark_read(request, notif_id):
    if not request.user.is_authenticated:
        return _htmx_unauthenticated_response()

    if request.method == 'POST':
        notif = get_object_or_404(Notification, id=notif_id, user=request.user)
        mark_notification_read(request.user, notif.id)
        unread_count = Notification.objects.filter(user=request.user, is_read=False).count()
        return render(request, 'notifications/partials/notif_item.html', {
            'notif': notif,
            'unread_count': unread_count,
            'swap_badge': True,
        })
    return HttpResponse(status=405)


def notification_unread_count(request):
    if not request.user.is_authenticated:
        return _htmx_unauthenticated_response()

    unread_count = Notification.objects.filter(user=request.user, is_read=False).count()
    return render(request, 'notifications/partials/badge.html', {'unread_count': unread_count})