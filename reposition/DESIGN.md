# Nether Labs v5 Design Specification

## Overview
Nether Labs v5 is a repositioning website for Nether Labs, featuring a dark luxury brand aesthetic with semantic HTML, WCAG AA accessibility compliance, and smooth scroll interactions.

**Status:** Hallmark QA Gate approved with 3 medium remediation items  
**Last Updated:** 2026-07-10  
**Design Lead:** Lina (UI/UX)  
**Engineering Lead:** Tinker  

---

## Visual Design

### Color Palette
All colors are tokenized as CSS variables in `:root`:

| Token | Value | Usage |
|---|---|---|
| `--bg` | #0d0d0d | Page background |
| `--surface` | #111111 | Card/section backgrounds |
| `--surface-alt` | #161616 | Alternative surface |
| `--surface-hi` | #1a1a1a | Elevated surface |
| `--bg-dark` | #080808 | Dark section backgrounds (footer) |
| `--accent` | #C9A84C | Brand gold; buttons, links, highlights |
| `--text-inverse` | #09090a | Button text on light backgrounds |
| `--text-hover` | #dfc05e | Hover state for links/buttons |
| `--text-error` | #e07474 | Error states in forms |
| `--headline` | #ede9e3 | Headings |
| `--body` | #b0ada6 | Body text |
| `--body-hi` | #d0ccc4 | Emphasized body text |
| `--muted` | #82827e | Muted/secondary text; button disabled state |

**WCAG Compliance:** All text colors meet WCAG AA contrast ratios (4.5:1 minimum) on their backgrounds.

### Typography
- **Display Font:** Playfair Display 400/600/700 (serif, elegant, headings)
- **Body Font:** Inter 400/500/600 (sans-serif, clean, body text and UI)
- Both loaded from Google Fonts CDN

### Layout
- **Max Width:** 1200px
- **Horizontal Padding:** 32px (desktop), 20px (mobile ≤640px)
- **Section Padding:** 100px vertical (desktop), 64px (tablet), responsive down to 0 on mobile

---

## Motion Layer

### Specification
The motion layer uses **GSAP 3.12.5 + ScrollTrigger + Lenis 1.1.13** for scroll-based animations and smooth scrolling:

**Lenis Configuration:**
- Duration: 1.3s ease-out (custom cubic-bezier)
- Smooth wheel scrolling enabled
- Wheel multiplier: 1x (standard scroll distance)
- Integrated with GSAP ticker for precise timing

**ScrollTrigger Animations:**
1. **Section reveals** (`[data-reveal]`): Elements fade in + translate up when scrolling into view (start: top 85%)
2. **Staggered children** (`[data-stagger]`): Child elements animate in sequence with animation delay (stagger: 0.15s)
3. **Hero load** (on page load): Hero content (kicker, h1, sub, CTA, note, scroll indicator) fade in + translate from Y:50 over 0.8s with stagger
4. **Parallax images** (`.section-break img`, `.hero-image-bg img`): Translate Y:15% based on scroll position (scrub: 1 = real-time scroll tracking)
5. **Header scroll behavior**: Header gains `.scrolled` class when scrollY > 24px (updates nav styling)
6. **Page header animation**: Interior page headers animate from Y:30 + opacity:0 on page load

**CSS Transition Primitives:**
- Form focus states: 0.25s border-color + box-shadow
- Button states: 0.2s background transition
- Navigation links: 0.2s color transition
- All use `ease` (default) or `ease-in-out` for smooth, natural motion

### Implementation Rationale
GSAP + Lenis was chosen over simpler CSS-only transitions because:
1. **Scroll-triggered reveals** require pixel-precise triggering based on viewport position (ScrollTrigger)
2. **Parallax effects** need real-time scroll position tracking and frame-rate independent animation
3. **Lenis** provides inertia-based smooth scrolling that feels premium and improves accessibility for users with vestibular disorders
4. **Hero load** animations benefit from precise timing and sequencing that GSAP provides out-of-the-box

---

## Form States

### Input States
All form inputs (`.form-input`, `.form-select`, `.form-textarea`) support:
- **Default:** Border-bottom 1px solid `--border`
- **Focus:** Border-bottom-color transitions to `--accent-mid`, box-shadow added
- **Error (`:invalid`):** Border-bottom-color transitions to `--text-error`
- **Disabled:** Opacity 0.6, cursor: not-allowed
- **Loading** (`.is-loading` class): Border-bottom animated with pulsing gradient

### Button States
All buttons (`.button`, `.button-outline`) support:
- **Default:** Standard background and text color
- **Hover:** Background transitions to `--text-hover`
- **Active:** Slight translateY(1px) press effect
- **Disabled (`:disabled`, `[disabled]`):** Background transitions to `--muted`, opacity 0.65, cursor: not-allowed
- **Loading:** Managed via JavaScript—button text becomes "Submitting…" and `aria-busy="true"` is set

### Form Submission Flow
1. User submits form
2. Button disabled + text changed to "Submitting…"
3. All inputs marked with `.is-loading` class (visual feedback via animated gradient)
4. API call fires
5. On success: success banner displayed, form reset, inputs unmarked
6. On error: error banner displayed, button re-enabled
7. Finally: all states cleared, button text restored

---

## Accessibility

### Semantic HTML
- All interactive elements use proper `<button>`, `<a>`, `<form>`, `<input>` tags
- Form labels explicitly associated with `<label for="id">` and input `id="id"`
- Required fields marked with `required` attribute and `aria-required="true"`

### ARIA Attributes
- Staging banner: `role="status" aria-live="polite"`
- Mobile menu button: `aria-label="Toggle menu" aria-expanded="true|false"`
- Form submission button: `aria-busy="true"` during submission
- Decorative elements: `aria-hidden="true"` on non-semantic images, grids, glows
- Images: `role="img"` on decorative images (SVGs, backgrounds)

### Mobile Navigation
- Fixed header with hamburger button at ≤640px
- Mobile nav dropdown expands on button click
- Links in dropdown automatically close menu on click
- `aria-expanded` state kept in sync with menu visibility

---

## Responsive Breakpoints

### Desktop (>860px)
- Full-width layouts, 2+ column grids
- Persistent header CTA button visible
- Full sidebar/multi-column features

### Tablet (641px–860px)
- Feature grid: 1 column
- Stats grid: 2 columns
- Form grid: 1 column
- Section padding: 64px

### Mobile (≤640px)
- Feature grid: 1 column
- Stats grid: 2 columns (stacked)
- Form grid: 1 column
- Mobile hamburger menu active
- Persistent header CTA hidden (reachable via mobile nav)
- Horizontal padding: 20px
- Section padding: varies by section
- Footer links wrap with adjusted gap

---

## QA Gate Remediation (2026-07-10)

### Finding 1: Tokenized Colors ✅
**Resolution:** All inline hex values moved to CSS variables:
- `#09090a` → `--text-inverse`
- `#dfc05e` → `--text-hover`
- `#080808` → `--bg-dark`
- `#e07474` → `--text-error`
- `#C9A84C` (inline styles) → `var(--accent)`

All usages in CSS and HTML updated. Staging banner now uses `var(--accent)` and `var(--text-inverse)`.

### Finding 2: Form Submit Button & Input States ✅
**Resolution:** Added comprehensive form states:
- `.button:disabled` / `[disabled]` states with reduced opacity and muted color
- `.form-input:invalid` / `.form-textarea:invalid` states with error color
- `.form-input.is-loading` class with animated gradient underline
- Button during submission: `disabled` + `aria-busy="true"` + text change
- Form JavaScript: adds/removes `.is-loading` during submission, manages `aria-busy`

### Finding 3: SVG Accessibility ✅
**Resolution:** Added accessibility attributes to all decorative SVGs and images:
- Decorative elements: `aria-hidden="true"` or `role="presentation"`
- Ornamental images: `role="img"`
- Staging banner: `role="status" aria-live="polite"` for dynamic status updates

---

## Browser Support

- **Desktop:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile:** iOS Safari 14+, Chrome Android 90+
- **Fallbacks:** CSS Grid, flexbox; no IE11 support
- **Smooth Scroll:** Progressive enhancement—Lenis gracefully degrades if JS unavailable (native scroll behavior)

---

## Performance

- **Lazy Loading:** Images on non-hero sections use `loading="lazy"`
- **Font Loading:** Google Fonts with display=swap (shows fallback until loaded)
- **Script Timing:** Motion layer GSAP/Lenis loaded after DOM content to avoid render-blocking
- **CSS:** ~14KB minified + gzipped

---

## File Structure

```
reposition/
├── index.html           (Home page)
├── about.html           (About Nether Labs + Yves bio)
├── contact.html         (Diagnostic request form)
├── steward.html         (Steward product page)
├── workflow-audit.html  (Workflow Audit feature page)
├── css/
│   └── reposition.css   (component library appended 2026-07-11, see below)
├── js/
│   └── reposition.js    (Mobile nav, scroll tracking, motion layer init)
├── images/
│   ├── workflow-methodology.svg  (P0-1: 5-step methodology diagram)
│   └── steward-architecture.svg  (P0-1: hub-and-spokes architecture diagram)
├── DESIGN.md            (This file)
└── [*.jpg]              (Hero textures, geometric backgrounds, portraits)
```

---

## P0 Gap Port (2026-07-11) — Component Library Addition

**Source:** Ported from `company/website-v5/design.md` (Register B design
system) and Tinker's P0 gap implementation, which was built against the
wrong site (`company/website-v5/staging/` — the parked Enigma Capital
build) and then correctly ported onto this file's actual pages by Zeus.
Structural/component port only; no Enigma Capital copy was carried over.

**Added to `css/reposition.css`:**
- `.faq-accordion` / `.faq-item` / `.faq-trigger` / `.faq-panel` — native
  `<details>/<summary>`-based accordion, no JS dependency, gold chevron
  rotation via `[open]` selector
- `.bento-grid` / `.bento-cell` (with `.span-2` / `.span-2-row` modifiers) —
  4→2→1 column responsive asymmetric grid
- `.metrics-row` / `.metric-item` — compact 4→2→1 column stat display,
  replaces `.stats-grid` card treatment on the Home page
- `.diagram-wrap` — responsive wrapper for the two new informational SVGs
- `.prose h3` / `.faq-trigger` / `.founder-quote p` — Playfair Display
  italic subsection override (Hallmark Gate 38a override, intentional,
  matches `website-v5/design.md` typographic scale)

**Added imagery (`images/`):**
- `workflow-methodology.svg` — 5-step diagram (Map → Score → Roadmap →
  Design → Build & Measure), used on `workflow-audit.html`
- `steward-architecture.svg` — hub-and-spokes diagram (Steward hub +
  8 agent-role spokes: Orchestrator, Risk Monitor, Alpha Engine,
  Compliance, Systems Engineering, Brand Strategy, Comptroller, Live Ops),
  used on `steward.html`

**Pages updated:**
- `workflow-audit.html` — added methodology SVG diagram + FAQ accordion
- `steward.html` — added architecture SVG diagram + bento grid (capabilities)
- `index.html` — converted stats-grid → metrics-row, added bento grid
  (Researches / Executes / Governs)

**Guardrail added:** `engineering/scripts/website-brand-preflight.sh` —
greps any website deliverable path for wrong-brand strings before a
website task can be marked complete. Routed into Disruptor's permanent QA
checklist (`engineering/docs/qa-checklist-disruptor.md`).

---

## Development Notes

### Adding New Animations
To add scroll-triggered reveals to new elements:
1. Add `data-reveal` attribute to the element
2. JS automatically creates ScrollTrigger for it (no additional code needed)
3. CSS class `is-visible` applied on trigger; style in CSS with `.is-visible`

### Color Changes
To change the brand color:
1. Edit `--accent` in `:root` in reposition.css
2. All dependent colors (hover, dim, mid, glow, etc.) auto-update
3. All HTML using `var(--accent)` auto-updates

### Disabling Motion
To test without motion or for accessibility:
1. Comment out `initMotion()` call in reposition.js
2. Page uses CSS transitions only (no GSAP/Lenis)
3. `[data-reveal]` elements visible immediately (no scroll animation)

---

**Last reviewed by:** Disruptor (QA)  
**Hallmark gate status:** Approved with remediation (2026-07-10)
