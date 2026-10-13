from django.urls import path

from .views import (
    dashboard_placeholder,
    login_view,
    logout_view,
    onboarding_view,
    signup_view,
)

urlpatterns = [
    path('signup/', signup_view, name='signup'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('onboarding/', onboarding_view, name='onboarding'),
    path('dashboard/', dashboard_placeholder, name='dashboard'),
]