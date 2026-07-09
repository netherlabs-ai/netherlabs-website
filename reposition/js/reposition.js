/* Nether Labs — Website Repositioning v1 — Shared behavior
   Scope: mobile nav toggle, scrolled-header state, lightweight conversion
   tracking for diagnostic-request form (no third-party trackers loaded —
   staging-safe, privacy-conscious, console + localStorage-based funnel log
   that Puck/Grimstroke/Yves can inspect before any analytics vendor is
   approved for production).
*/
(function () {
  "use strict";

  // ---- Mobile nav toggle -------------------------------------------------
  function initNav() {
    var toggle = document.querySelector(".mobile-menu-toggle");
    var links = document.querySelector(".nav-links");
    if (!toggle || !links) return;
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- Scrolled header state ---------------------------------------------
  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 24) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ---- Conversion tracking (staging-only, no PII to third parties) -------
  // Fires a "diagnostic_request_*" funnel event into localStorage + console.
  // This is intentionally lightweight: staging build must not add an
  // external analytics vendor without a separate approval. Once Yves/Puck
  // approve a production analytics stack, replace NLTrack.send() body with
  // the real vendor call and keep the same call sites.
  var NLTrack = {
    key: "nl_conversion_log_v1",
    send: function (eventName, data) {
      var entry = {
        event: eventName,
        data: data || {},
        page: window.location.pathname,
        ts: new Date().toISOString(),
      };
      try {
        var log = JSON.parse(localStorage.getItem(this.key) || "[]");
        log.push(entry);
        // keep last 200 events only
        if (log.length > 200) log = log.slice(log.length - 200);
        localStorage.setItem(this.key, JSON.stringify(log));
      } catch (e) {
        /* localStorage unavailable — degrade silently */
      }
      if (window.console && window.console.info) {
        console.info("[nl-track]", eventName, entry);
      }
    },
  };
  window.NLTrack = NLTrack;

  function initConversionTracking() {
    // Page view on every load
    NLTrack.send("page_view");

    // Any CTA click that points at the diagnostic-request form
    document.querySelectorAll('a[href*="contact.html"], a[href*="#diagnostic-form"]').forEach(function (el) {
      el.addEventListener("click", function () {
        NLTrack.send("diagnostic_request_cta_click", { label: el.textContent.trim() });
      });
    });

    // Diagnostic-request form: track start (first focus) and submit
    var form = document.getElementById("diagnostic-form");
    if (form) {
      var startedTracked = false;
      form.addEventListener(
        "focusin",
        function () {
          if (!startedTracked) {
            startedTracked = true;
            NLTrack.send("diagnostic_request_started");
          }
        },
        { once: false }
      );
      form.addEventListener("submit", function () {
        var problemAreaEl = form.querySelector("#df-problem-area");
        NLTrack.send("diagnostic_request_submitted", {
          problem_area: problemAreaEl ? problemAreaEl.value : undefined,
        });
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initHeaderScroll();
    initConversionTracking();
  });
})();
