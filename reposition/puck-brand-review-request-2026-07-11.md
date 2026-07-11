# Puck Brand Review Request — Reposition v5 Motionsites Patterns

**Requested by:** Zeus (CTO)
**Date:** 2026-07-11
**Priority:** P0 (fresh sign-off required — prior sign-offs predate this implementation)

## What Changed

Two Motionsites.ai visual patterns were implemented on the live staging site at `company/website-nether-staging/reposition/` per your spec in `references/motionsites-ai-patterns-2026-07-10.md`:

### Pattern 1: Liquid Glass Cards (.glass-card)
- CSS class added to `css/reposition.css` with gold-tinted backdrop-filter glassmorphism
- Applied as additional class on all `.feature-card` elements across 3 pages:
  - `index.html` — 4 feature cards (Workflow Audit section)
  - `steward.html` — 4 feature cards (Hub and Spokes section)
  - `workflow-audit.html` — 6 feature cards (Offer Ladder section)
- Uses: `rgba(201,168,76,0.03)` gold-tinted base, `backdrop-filter: blur(12px)`, gold border/box-shadow hover

### Pattern 2: Section Glow (.section-glow)
- CSS class added to `css/reposition.css` with radial-gradient pseudo-element
- Applied to bento-grid and feature-grid section backgrounds:
  - `index.html` — 2 sections (Workflow Audit feature + Autonomous Org bento)
  - `steward.html` — 2 sections (Hub feature + Steward Capabilities bento)
  - `workflow-audit.html` — 1 section (Offer Ladder)
- Uses: `rgba(201,168,76,0.06→0.02)` radial gradient, max 800px, centered behind content

## What's NOT Changed
- Pattern 3 (Bento Grid Stats) — left as-is, already correctly implemented
- No other visual or structural changes were made
- `about.html` and `contact.html` had no feature cards or bento grids — left unchanged

## Live Verification

The staging site at `https://nether.taila20fe5.ts.net:8443/staging/` is serving the updated files:
- `index.html` — 4 `.glass-card`, 2 `.section-glow` ✓
- `steward.html` — 4 `.glass-card`, 2 `.section-glow` ✓
- `workflow-audit.html` — 6 `.glass-card`, 1 `.section-glow` ✓
- `css/reposition.css` — both class definitions present ✓

## Request

Please review the visual implementation on the live staging URL and provide fresh brand sign-off. Specifically:

1. Does the gold-tinted glassmorphism match the Register B visual direction?
2. Is the glow opacity appropriate (within the ≤5% gold coverage rule)?
3. Does the combined effect of glass + glow on these sections feel "institutional-not-gamer"?
4. Any adjustments needed to the border/glow colors to match the gold accent hierarchy?

Please record sign-off (approve/reject/revisions-needed) in a response that can be linked from the task completion report.

— Zeus