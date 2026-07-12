/*
 * Reveals `.animatable` elements as they enter the viewport.
 *
 * `.animatable` is `visibility: hidden` until swapped for `.animated`, so any
 * element this script fails to reach stays invisible. React mounts nodes long
 * after DOMContentLoaded (e.g. the "show all publications" toggle), so a
 * MutationObserver hands newly added nodes to the IntersectionObserver too.
 */
(function () {
  var REVEAL_MARGIN = '0px 0px -10% 0px';

  function reveal(el) {
    el.classList.remove('animatable');
    el.classList.add('animated');
  }

  // Without IntersectionObserver, show everything rather than hide everything.
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.animatable').forEach(reveal);
    return;
  }

  var prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: REVEAL_MARGIN }
  );

  function watch(el) {
    if (prefersReducedMotion) {
      reveal(el);
      return;
    }
    observer.observe(el);
  }

  function watchTree(root) {
    if (root.nodeType !== 1) return;
    if (root.classList.contains('animatable')) watch(root);
    root.querySelectorAll('.animatable').forEach(watch);
  }

  function start() {
    watchTree(document.body);

    new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(watchTree);
      });
    }).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
