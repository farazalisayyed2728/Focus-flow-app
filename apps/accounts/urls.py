from django.urls import path

from .views import (
    dashboard_placeholder,
    login_view,
    logout_view,
    onboarding_view,
    signup_view,
    settings_view,
    export_user_data,

)

urlpatterns = [
    path('signup/', signup_view, name='signup'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('onboarding/', onboarding_view, name='onboarding'),
    path('dashboard/', dashboard_placeholder, name='dashboard'),
    path('settings/', settings_view, name='settings'),
    path('settings/export/', export_user_data, name='settings-export'),
]
