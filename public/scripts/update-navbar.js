/*
 * Highlights the nav item matching the section currently in view.
 *
 * The sections and the nav are both rendered by React, so everything is looked
 * up lazily on the first scroll rather than at parse time. Work is throttled
 * onto an animation frame: the previous version ran a full layout read on every
 * scroll event.
 */
(function () {
  var NAV_OFFSET = 80;
  var ticking = false;

  function update() {
    ticking = false;

    var sections = document.querySelectorAll('.header[id]');
    var navItems = document.querySelectorAll('#navbar-main .navbar-nav li');
    if (!sections.length || !navItems.length) return;

    var current = '';
    for (var i = 0; i < sections.length; i++) {
      if (window.scrollY >= sections[i].offsetTop - NAV_OFFSET) {
        current = sections[i].getAttribute('id');
      }
    }

    // Near the bottom nothing else can scroll into view, so pin the last section.
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      current = sections[sections.length - 1].getAttribute('id');
    }

    navItems.forEach(function (li) {
      li.classList.toggle('active', li.classList.contains(current));
    });
  }

  window.addEventListener(
    'scroll',
    function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    },
    { passive: true }
  );

  window.addEventListener('load', update);
})();

/* Collapse the mobile menu when tapping a link or anywhere outside it. */
$(document).ready(function () {
  $(document).click(function (event) {
    var target = $(event.target);
    var opened = $('.navbar-collapse').hasClass('show');
    if (opened && !target.hasClass('navbar-toggler')) {
      $('.navbar-toggler').click();
    }
  });
});
