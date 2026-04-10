/* ============================================================
   CLASSIC TAB — Predefined JavaScript
   Handles tab switching for the classic-tab component.
   Include via: <script src="../predefined-components/classic-tab.js"></script>
   ============================================================ */

(function () {
  'use strict';

  function initClassicTabs() {
    document.querySelectorAll('.classic-tab').forEach(function (tabGroup) {
      var headers = tabGroup.querySelectorAll('.classic-tab__header');

      headers.forEach(function (header, index) {
        header.addEventListener('click', function () {
          headers.forEach(function (h) {
            h.classList.remove('classic-tab__header--selected');
            h.classList.add('classic-tab__header--unselected');
          });

          header.classList.remove('classic-tab__header--unselected');
          header.classList.add('classic-tab__header--selected');

          var panels = tabGroup.querySelectorAll('.classic-tab__content');
          panels.forEach(function (panel, i) {
            panel.style.display = (i === index) ? '' : 'none';
          });
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initClassicTabs);
  } else {
    initClassicTabs();
  }
})();
