/**
 * endpoints.js — Endpoint expand/collapse logic and tag group toggling
 */
(function () {
  'use strict';

  /**
   * Initialize all endpoint and tag group toggle behavior
   */
  function init() {
    // Tag group collapse/expand
    document.querySelectorAll('.sw-tag-header').forEach(header => {
      header.addEventListener('click', function () {
        const group = this.closest('.sw-tag-group');
        if (group) {
          group.classList.toggle('is-collapsed');
        }
      });
    });

    // Endpoint expand/collapse
    document.querySelectorAll('.sw-endpoint__header').forEach(header => {
      header.addEventListener('click', function () {
        const endpoint = this.closest('.sw-endpoint');
        if (endpoint) {
          endpoint.classList.toggle('is-open');
        }
      });
    });
  }

  // Expose init function globally
  window.Endpoints = { init };
})();