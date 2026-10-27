# September 7, 2026 integration

## Changes

- Supplied cinematic homepage and matching interior-page design.
- Existing production diagnostic form, intake function, full privacy policy and N favicon retained.
- Next.js 16.2.11 security foundation retained; PostCSS 8.5.28, nanoid 3.3.18 and compatible transitive audit fixes applied.
- No new data recipients, tracking, storage or credential architecture.

## Verification

Typecheck and lint pass. 15 source/config/function tests and 7 exported-build tests pass. Browser checks cover six routes at 320, 390, 768 and 1440 pixels, keyboard tabs, dialogs, and local-mocked form success/error. No horizontal overflow or JavaScript errors observed. Motion checks cover desktop scrolling and mobile/short-screen natural fallbacks. Full dependency audit: zero advisories. Independent source/security integration review: no material blockers.

These are local verification results. Provider deployment and live checks are recorded separately; this file does not claim a published deployment or end-to-end customer submission.

## Deployment

Netlify site ID: 3e2e2127-ee12-4af4-bf25-a1e3dc4653e9. Use a draft deployment, validate it, then promote the same deployment to netherlabs.ai. Preserve functions and Netlify Forms processing. Prior production deployment for rollback: 6a5a06baa9e0ec7ff990b39e. Never publish historical repository directories such as reposition or portal. Root Netlify configuration selects only site/out.

## October 27, 2026: NetherForge name

The product formerly called Steward is NetherForge (Yves, Telegram 4425, 2026-10-27). Pure name change: visible copy, page title and metadata now say NetherForge, with no new product claims. The interior page moved from `/steward/` to `/netherforge/`. `netlify.toml` (root and `site/`) sends `/steward`, `/steward/` and `/steward/*` to the new path with a 301 before the 404 fallback. `scripts/verify-live.mjs` checks the redirect. Internal CSS class names (`.steward*`) are unchanged.
