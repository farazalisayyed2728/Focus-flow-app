import Alpine from '@alpinejs/csp';
import htmx from 'htmx.org';

window.Alpine = Alpine;
window.htmx = htmx;
htmx.config.allowEval = false;
htmx.config.allowScriptTags = false;

Alpine.data('theme', () => ({
  theme: localStorage.getItem('focusflow_theme') || 'light',
  init() {
    this.applyTheme();
  },
  applyTheme() {
    const active = this.theme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : this.theme;
    document.documentElement.setAttribute('data-theme', active);
    document.documentElement.classList.toggle('dark', active === 'dark');
  },
  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('focusflow_theme', this.theme);
    this.applyTheme();
  },
}));

Alpine.data('routineModal', () => ({
  isOpen: false,
  openModal() {
    this.isOpen = true;
  },
  closeModal() {
    this.isOpen = false;
  },
}));

Alpine.data('habitModal', () => ({
  isOpen: false,
  openModal() {
    this.isOpen = true;
  },
  closeModal() {
    this.isOpen = false;
  },
}));

Alpine.data('notificationTray', () => ({
  openTray: false,
  toggleTray() {
    this.openTray = !this.openTray;
  },
  closeTray() {
    this.openTray = false;
  },
}));

Alpine.data('settingsTabs', () => ({
  tab: 'profile',
  setTab(tab) {
    this.tab = tab;
  },
}));

Alpine.data('pomodoro', () => ({
  modes: { focus: 25 * 60, short: 5 * 60, long: 15 * 60 },
  currentMode: 'focus',
  timeLeft: 25 * 60,
  isRunning: false,
  timer: null,
  setMode(mode) {
    this.pause();
    this.currentMode = mode;
    this.timeLeft = this.modes[mode];
  },
  toggle() {
    if (this.isRunning) this.pause();
    else this.start();
  },
  start() {
    this.isRunning = true;
    this.timer = window.setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.pause();
        this.$dispatch('show-toast', {
          message: 'Focus block finished! Take a break.',
          type: 'info',
        });
      }
    }, 1000);
  },
  pause() {
    this.isRunning = false;
    window.clearInterval(this.timer);
  },
  reset() {
    this.pause();
    this.timeLeft = this.modes[this.currentMode];
  },
  formatTime() {
    const minutes = Math.floor(this.timeLeft / 60).toString().padStart(2, '0');
    const seconds = (this.timeLeft % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  },
}));

Alpine.data('toastNotifications', () => ({
  toasts: [],
  addToast(message, type = 'info') {
    const id = Date.now();
    this.toasts.push({ id, message, type });
    window.setTimeout(() => {
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
    }, 4000);
  },
}));

document.addEventListener('htmx:beforeSwap', (event) => {
  if (event.detail.xhr.status === 422) event.detail.shouldSwap = true;
});

document.addEventListener('htmx:afterRequest', (event) => {
  if (!event.detail.successful || !(event.target instanceof HTMLFormElement)) return;
  const modal = event.target.closest('[x-data="habitModal"], [x-data="routineModal"]');
  if (modal) Alpine.$data(modal).closeModal();

  if (modal?.matches('[x-data="routineModal"]')) {
    document.querySelector('#empty-blocks')?.remove();
  }
});

Alpine.start();
