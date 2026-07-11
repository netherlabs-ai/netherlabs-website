/* Nether Labs — Website Repositioning v1 — Shared behavior
   Scope: mobile nav toggle, scrolled-header state, lightweight conversion
   tracking for diagnostic-request form (no third-party trackers loaded —
   staging-safe, privacy-conscious, console + localStorage-based funnel log
   that Puck/Grimstroke/Yves can inspect before any analytics vendor is
   approved for production).

   MOTION LAYER (v5 visual fix):
   - Lenis: smooth-scroll with inertia
   - GSAP + ScrollTrigger: scroll-triggered reveals, parallax, hero load
   - CSS transition primitives: [data-reveal], [data-stagger], [data-reveal="left|right|scale"]

   CDN deps (replace with bundled versions in production):
   - lenis@1.1.13
   - gsap@3.12.5 + ScrollTrigger
*/
(function () {
  "use strict";

  // ─── MOBILE NAV TOGGLE ──────────────────────────────────────────
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

  // ─── SCROLLED HEADER STATE ──────────────────────────────────────
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

  // ─── CONVERSION TRACKING ───────────────────────────────────────
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
        if (log.length > 200) log = log.slice(log.length - 200);
        localStorage.setItem(this.key, JSON.stringify(log));
      } catch (e) { /* degrade silently */ }
      if (window.console && window.console.info) {
        console.info("[nl-track]", eventName, entry);
      }
    },
  };
  window.NLTrack = NLTrack;

  function initConversionTracking() {
    NLTrack.send("page_view");

    document.querySelectorAll('a[href*="contact.html"], a[href*="#diagnostic-form"]').forEach(function (el) {
      el.addEventListener("click", function () {
        NLTrack.send("diagnostic_request_cta_click", { label: el.textContent.trim() });
      });
    });

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

  // ══════════════════════════════════════════════════════════════════
  // MOTION LAYER — Gsap / Lenis / ScrollTrigger integration
  // ══════════════════════════════════════════════════════════════════

  // Guard: only run motion if GSAP loaded
  function initMotion() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      console.warn("[nl-motion] GSAP or ScrollTrigger not loaded — motion disabled");
      return;
    }

    var hasLenis = typeof Lenis !== "undefined";

    // ─── Lenis (smooth scroll) ──────────────────────────────────
    var lenis;
    if (hasLenis) {
      lenis = new Lenis({
        duration: 0.9,
        easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
        orientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
      });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    }

    gsap.registerPlugin(ScrollTrigger);

    // ─── Nav scroll behavior ────────────────────────────────────
    var nav = document.querySelector(".site-header");
    if (nav) {
      ScrollTrigger.create({
        start: "top -60px",
        onUpdate: function (self) {
          nav.classList.toggle("scrolled", self.progress > 0);
        }
      });
    }

    // ─── Reveal animations via ScrollTrigger ────────────────────
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        end: "bottom 30%",
        onEnter: function () { el.classList.add("is-visible"); },
        once: true,
      });
    });

    // ─── Staggered children ─────────────────────────────────────
    document.querySelectorAll("[data-stagger]").forEach(function (parent) {
      ScrollTrigger.create({
        trigger: parent,
        start: "top 82%",
        onEnter: function () { parent.classList.add("is-visible"); },
        once: true,
      });
    });

    // ─── Hero load animation ────────────────────────────────────
    var hero = document.querySelector(".hero");
    if (hero) {
      var heroContent = hero.querySelectorAll(
        ".hero-kicker, h1, .hero-sub, .hero-actions, .hero-note, .hero-scroll-indicator"
      );
      if (heroContent.length) {
        gsap.from(heroContent, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2,
        });
      }
    }

    // ─── Parallax images ────────────────────────────────────────
    document.querySelectorAll(".section-break img, .hero-image-bg img").forEach(function (img) {
      var wrapper = img.closest(".section-break") || img.closest(".hero-image-bg");
      if (wrapper) {
        gsap.to(img, {
          y: "15%",
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });
      }
    });

    // ─── Page header subtle parallax ────────────────────────────
    var pageHeader = document.querySelector(".page-header");
    if (pageHeader) {
      gsap.from(pageHeader.querySelector("h1"), {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.15,
      });
    }

    ScrollTrigger.refresh();

    console.log("[nl-motion] Nether Labs v5 — motion layer active" + (hasLenis ? " (Lenis + GSAP)" : " (GSAP only)"));
  }

  // ─── INIT ────────────────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initHeaderScroll();
    initConversionTracking();
    initMotion();
  });
})();