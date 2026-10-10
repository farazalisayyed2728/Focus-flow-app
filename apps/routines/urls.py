from django.urls import path
from .views import (
    routine_builder,
    block_create,
    block_update,
    block_delete,
    block_duplicate
)

urlpatterns = [
    path('', routine_builder, name='routine-builder'),
    path('block/create/', block_create, name='routine-block-create'),
    path('block/<int:block_id>/update/', block_update, name='routine-block-update'),
    path('block/<int:block_id>/delete/', block_delete, name='routine-block-delete'),
    path('block/<int:block_id>/duplicate/', block_duplicate, name='routine-block-duplicate'),
]