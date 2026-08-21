/* Correção pontual de UX do menu mobile.
   Não altera layout, cores, tipografia ou estilos existentes. */
(function () {
  'use strict';

  function setupMobileMenuFix() {
    var menuButton = document.querySelector(
      'button[aria-label*="menu" i], .menu-toggle, .hamburger, .mobile-menu-toggle, #menu-toggle, #hamburger, [data-menu-toggle]'
    );

    if (!menuButton) return;

    var lastWidth = window.innerWidth;

    function menuLooksOpen() {
      var expanded = menuButton.getAttribute('aria-expanded');
      if (expanded === 'true') return true;

      var nav = document.querySelector('.mobile-nav, .mobile-menu, .nav-links, [data-mobile-menu]');
      if (!nav) return false;

      var style = window.getComputedStyle(nav);
      var rect = nav.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
    }

    function closeByButton() {
      if (!menuLooksOpen()) return;
      menuButton.click();
    }

    document.addEventListener('pointerdown', function (event) {
      if (!menuLooksOpen()) return;
      if (event.target.closest('button[aria-label*="menu" i], .menu-toggle, .hamburger, .mobile-menu-toggle, #menu-toggle, #hamburger, [data-menu-toggle]')) return;

      var nav = document.querySelector('.mobile-nav, .mobile-menu, .nav-links, [data-mobile-menu]');
      if (nav && nav.contains(event.target)) return;

      closeByButton();
    }, true);

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeByButton();
    });

    document.addEventListener('click', function (event) {
      var link = event.target.closest('a');
      if (!link || !menuLooksOpen()) return;
      var nav = document.querySelector('.mobile-nav, .mobile-menu, .nav-links, [data-mobile-menu]');
      if (nav && nav.contains(link)) setTimeout(closeByButton, 0);
    }, true);

    window.addEventListener('resize', function () {
      if (lastWidth <= 900 && window.innerWidth > 900) closeByButton();
      lastWidth = window.innerWidth;
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupMobileMenuFix, { once: true });
  } else {
    setupMobileMenuFix();
  }
})();
