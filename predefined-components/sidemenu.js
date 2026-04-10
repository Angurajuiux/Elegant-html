/* ============================================================
   SIDEMENU — Predefined JavaScript
   Reads data-active-item from <aside class="sidemenu"> and
   auto-activates the matching item + expands its parent section.
   Handles: desktop collapse/expand, mobile/tablet overlay drawer,
   section toggle, click highlight, and search filtering.

   Include via: <script src="../predefined-components/sidemenu.js"></script>
   ============================================================ */

(function () {
  'use strict';

  var CHEVRON_DOWN  = '../assets/icons/icon-sm-chevron-down.svg';
  var CHEVRON_RIGHT = '../assets/icons/icon-sm-chevron-right.svg';
  var TABLET_BREAKPOINT = 1024;

  function isOverlayMode() {
    return window.innerWidth <= TABLET_BREAKPOINT;
  }

  /* ── Read data-active-item and set the active menu item ── */
  function initActiveFromData() {
    var sidebar = document.querySelector('.sidemenu');
    if (!sidebar) return;

    var activeItemName = sidebar.getAttribute('data-active-item');
    if (!activeItemName) return;

    var items = sidebar.querySelectorAll('.sidemenu__item');
    items.forEach(function (item) {
      if (item.textContent.trim() === activeItemName) {
        item.classList.add('sidemenu__item--active');
      } else {
        item.classList.remove('sidemenu__item--active');
      }
    });
  }

  /* ── Auto-expand the section that contains the active item ── */
  function initAutoExpand() {
    var active = document.querySelector('.sidemenu__item--active');
    if (!active) return;

    var section = active.closest('.sidemenu__section');
    if (!section) return;

    var chevron  = section.querySelector('.sidemenu__chevron');
    var children = section.querySelectorAll(
      '.sidemenu__l2-subheader, .sidemenu__item'
    );

    children.forEach(function (el) { el.style.display = ''; });
    if (chevron) chevron.src = CHEVRON_DOWN;
  }

  /* ── Collapse / Expand sidebar (desktop + overlay close) ── */
  function initSidebarToggle() {
    var sidebar    = document.querySelector('.sidemenu');
    var collapseBtn = document.querySelector('.sidemenu__bottom-btn');
    var expandBtn  = document.getElementById('sidebarExpand');
    var backdrop   = document.querySelector('.sidemenu-backdrop');

    if (!sidebar || !collapseBtn || !expandBtn) return;

    function closeOverlay() {
      sidebar.classList.remove('sidemenu--overlay-open');
      if (backdrop) backdrop.classList.remove('sidemenu-backdrop--visible');
      document.body.style.overflow = '';
    }

    function toggle() {
      if (isOverlayMode()) {
        closeOverlay();
        return;
      }
      var collapsed = sidebar.classList.toggle('sidemenu--collapsed');
      expandBtn.classList.toggle('sidemenu-expand--visible', collapsed);
      collapseBtn.title = collapsed ? 'Expand sidebar' : 'Collapse sidebar';
    }

    collapseBtn.addEventListener('click', toggle);
    expandBtn.addEventListener('click', toggle);
  }

  /* ── Mobile/Tablet: overlay drawer toggle ── */
  function initOverlayDrawer() {
    var sidebar  = document.querySelector('.sidemenu');
    var backdrop = document.querySelector('.sidemenu-backdrop');
    var hamburger = document.querySelector('.topnavbar__hamburger');

    if (!sidebar || !backdrop || !hamburger) return;

    function openDrawer() {
      sidebar.classList.add('sidemenu--overlay-open');
      backdrop.classList.add('sidemenu-backdrop--visible');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      sidebar.classList.remove('sidemenu--overlay-open');
      backdrop.classList.remove('sidemenu-backdrop--visible');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
      if (sidebar.classList.contains('sidemenu--overlay-open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    backdrop.addEventListener('click', closeDrawer);

    window.addEventListener('resize', function () {
      if (!isOverlayMode() && sidebar.classList.contains('sidemenu--overlay-open')) {
        closeDrawer();
      }
    });
  }

  /* ── L1 Section Expand / Collapse ── */
  function initSectionToggle() {
    document.querySelectorAll('.sidemenu__l1').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var section  = btn.closest('.sidemenu__section');
        var chevron  = btn.querySelector('.sidemenu__chevron');
        var children = section.querySelectorAll(
          '.sidemenu__l2-subheader, .sidemenu__item'
        );

        var isOpen = children.length > 0 && children[0].style.display !== 'none';

        children.forEach(function (el) {
          el.style.display = isOpen ? 'none' : '';
        });

        if (chevron) {
          chevron.src = isOpen ? CHEVRON_RIGHT : CHEVRON_DOWN;
        }
      });
    });
  }

  /* ── Active Item Highlight on click ── */
  function initActiveItem() {
    var sidebar = document.querySelector('.sidemenu');

    document.querySelectorAll('.sidemenu__item').forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('.sidemenu__item--active').forEach(function (el) {
          el.classList.remove('sidemenu__item--active');
        });
        item.classList.add('sidemenu__item--active');

        if (sidebar) {
          sidebar.setAttribute('data-active-item', item.textContent.trim());
        }
      });
    });
  }

  /* ── Search Filter ── */
  function initSearchFilter() {
    var input = document.querySelector('.sidemenu__search input');
    if (!input) return;

    input.addEventListener('input', function () {
      var query = input.value.toLowerCase().trim();

      document.querySelectorAll('.sidemenu__item').forEach(function (item) {
        var text = item.textContent.toLowerCase();
        item.style.display = (!query || text.includes(query)) ? '' : 'none';
      });
    });
  }

  /* ── Bootstrap ── */
  function init() {
    initActiveFromData();
    initAutoExpand();
    initSidebarToggle();
    initOverlayDrawer();
    initSectionToggle();
    initActiveItem();
    initSearchFilter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
