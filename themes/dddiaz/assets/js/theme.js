// Dark/light theme toggle
(function () {
  const STORAGE_KEY = 'theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  function getPreferred() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Update theme-color meta tags
    const lightMeta = document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: light)"]');
    const darkMeta = document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]');
    if (theme === DARK) {
      if (lightMeta) lightMeta.setAttribute('content', '#282a36');
      if (darkMeta) darkMeta.setAttribute('content', '#282a36');
    } else {
      if (lightMeta) lightMeta.setAttribute('content', '#ffffff');
      if (darkMeta) darkMeta.setAttribute('content', '#ffffff');
    }
  }

  // Apply immediately to prevent flash
  apply(getPreferred());

  document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-theme');
        apply(current === DARK ? LIGHT : DARK);
      });
    }
  });

  // Listen for OS theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      apply(e.matches ? DARK : LIGHT);
    }
  });
})();
