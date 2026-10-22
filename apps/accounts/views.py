from django.contrib.auth import login, logout,authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import redirect, render
from apps.tracking.models import Task

from .forms import OnboardingForm, SignUpForm

import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from apps.notifications.models import NotificationPreference
from .forms import ProfileSettingsForm, NotificationPreferenceForm, AccountDeleteConfirmationForm
from .services import compile_user_data_export
from apps.core.ratelimit import rate_limit


def signup_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard')

    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.save()
            login(request, user)
            return redirect('onboarding')
    else:
        form = SignUpForm()
    return render(request, 'accounts/signup.html', {'form': form})

def login_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard')

    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            if not user.profile.onboarding_completed:
                return redirect('onboarding')
            return redirect('dashboard')
    else:
        form = AuthenticationForm()
    return render(request, 'accounts/login.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('login')

@login_required
def onboarding_view(request):
    profile = request.user.profile
    if profile.onboarding_completed:
        return redirect('dashboard')

    if request.method == 'POST':
        form = OnboardingForm(request.POST, instance=profile)
        if form.is_valid():
            saved_profile = form.save(commit=False)
            saved_profile.onboarding_completed = True
            saved_profile.save()
            return redirect('dashboard')
    else:
        form = OnboardingForm(instance=profile)

    return render(request, 'accounts/onboarding.html', {'form': form})

@login_required
def dashboard_placeholder(request):
    return render(request, 'dashboard/index.html', {'user': request.user})



@login_required
def settings_view(request):
    profile = request.user.profile
    notif_prefs, _ = NotificationPreference.objects.get_or_create(user=request.user)

    if request.method == 'POST':
        action = request.POST.get('action')

        if action == 'update_profile':
            form = ProfileSettingsForm(request.POST, instance=profile)
            if form.is_valid():
                form.save()
                return redirect('settings')
        elif action == 'update_notifications':
            n_form = NotificationPreferenceForm(request.POST, instance=notif_prefs)
            if n_form.is_valid():
                n_form.save()
                return redirect('settings')
        elif action == 'delete_account':
            del_form = AccountDeleteConfirmationForm(request.POST)
            if del_form.is_valid():
                user = request.user
                logout(request)
                user.delete()
                return redirect('login')

    return render(request, 'accounts/settings.html', {
        'profile_form': ProfileSettingsForm(instance=profile),
        'notif_form': NotificationPreferenceForm(instance=notif_prefs),
        'delete_form': AccountDeleteConfirmationForm(),
    })

@login_required
def export_user_data(request):
    data = compile_user_data_export(request.user)
    payload = json.dumps(data, indent=2)
    response = HttpResponse(payload, content_type='application/json')
    response['Content-Disposition'] = f'attachment; filename="focusflow_data_{request.user.username}.json"'
    return response


@rate_limit(key_prefix='signup', limit=10, period=60)
def signup_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard')

    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.save()
            login(request, user)
            return redirect('onboarding')
    else:
        form = SignUpForm()

    return render(request, 'accounts/signup.html', {'form': form})

@rate_limit(key_prefix='login', limit=10, period=60)
def login_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard')

    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            if hasattr(user, 'profile') and not user.profile.onboarding_completed:
                return redirect('onboarding')
            return redirect('dashboard')
    else:
        form = AuthenticationForm()

    return render(request, 'accounts/login.html', {'form': form})


import csv
from django.http import HttpResponse

@login_required
def export_tasks_csv(request):
    """
    Exports all tasks belonging to the authenticated user in CSV format.
    """
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = f'attachment; filename="tasks_{request.user.username}.csv"'

    writer = csv.writer(response)
    writer.writerow(['Title', 'Priority', 'Status', 'Due Date', 'Estimated Mins', 'Actual Mins', 'Completed At'])

    tasks = Task.objects.filter(user=request.user).values_list(
        'title', 'priority', 'status', 'due_date', 'estimated_minutes', 'actual_minutes', 'completed_at'
    )
    for t in tasks:
        writer.writerow(t)

    return response