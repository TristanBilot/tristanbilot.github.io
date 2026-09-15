/*
 * Theme switching.
 *
 * The initial theme is applied by an inline script in index.html so the page
 * never paints in the wrong one. This file only handles the toggle. The choice
 * is deliberately not persisted: every page load starts in light mode.
 *
 * Clicks are delegated off the document because the toggle button lives inside
 * the React tree, which has not mounted when this script runs.
 */
(function () {
  function current() {
    return document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light';
  }

  function apply(theme) {
    var root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add('theme-' + theme);
    root.style.colorScheme = theme;
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest && event.target.closest('[data-theme-toggle]');
    if (!button) return;

    apply(current() === 'dark' ? 'light' : 'dark');
  });
})();
