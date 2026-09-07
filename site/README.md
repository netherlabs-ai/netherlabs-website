# Nether Labs website, September 7 integration

Current source combines the supplied September 7 cinematic design with the existing production diagnostic intake and July 17 privacy policy. Netlify hosts a Next.js static export and one existing intake function. The previous mailbox-only boundary is not the deployed integration.

## Verification

`npm ci`, `npm run check`, `npm run build`, and `npm audit` verify this source. `out/` is the deployable static tree; retain `netlify/functions/intake-form.js` and the Netlify Forms declaration. Do not use `next start` for the static export.

## Source provenance

Original ZIP and unmodified acceptance/provenance documents are retained separately in the workspace integration evidence. Source archive SHA-256: 8c3c2a3c286241a1494330af7343e3b634ae4c40d94e3ed553daddd7b0a4eafb.

The historical sections below document the incoming archive, not the integrated release status.

# Nether Labs external website handoff

Prepared for Yves La Rose and the internal engineering team on 2026-09-07.

This source package ports the latest private preview, including the restored cinematic factory hero, into the existing Next.js static-export and Netlify foundation. Start with [the integration guide](docs/INTEGRATION.md).

This is a reviewable source handoff. Read `GPT_DELIVERY.md` and `V2_ACCEPTANCE.json` for fresh results and open release gates. The unchanged historical dependency graph still requires the team's security remediation, and fresh browser QA of the merged external build remains required.

## Included

- Cinematic factory opening with scroll-driven camera, pointer movement and mobile/reduced-motion fallbacks.
- Revised buyer-facing homepage, practical workflow examples and clear diagnostic deliverables.
- Steward explicitly in development; implementation scoped separately from the diagnostic.
- Stable tab panels, keyboard controls and native mobile navigation.
- All six public routes and the branded 404, with matching internal-page styling.
- Local fonts/assets, exact foundation configuration, tests, provenance and checksums.

## Read in this order

1. `docs/INTEGRATION.md`: merge scope and deliberate external adaptations.
2. `GPT_DELIVERY.md`: commands actually run, audit status and evidence limits.
3. `docs/QA_CHECKLIST.md`: browser and Netlify draft release checks.
4. `CHANGED_FILES.md` and `BASELINE_PROVENANCE.json`: complete source accounting.
5. `docs/DESIGN_NOTES.md`: design intent and behavior to preserve.

## Verify locally

Use Node **22.13.0**, npm **10** and an empty production base path. This handoff uses npm **10.9.2**.

```sh
sha256sum -c SOURCE_SHA256SUMS.txt
npm ci
npm run typecheck
npm run lint
npm test
npm run check
npm audit --omit=dev --audit-level=high
npm run build
```

The build generates `out/` and runs generated-output tests. Use `npm run dev` while integrating. The preserved `npm start` is a compatibility entry; `next start` does not serve this static export. Use the team's static preview or Netlify draft for release QA.

Apply reviewed changes to the current external branch; do not overwrite the repository with this folder. Later team-authored changes may be absent from the recovered source baseline.

Visual reference is private preview version 13. Its access is unchanged. This portable source package does not require preview access; private URLs and provider identifiers are omitted.
