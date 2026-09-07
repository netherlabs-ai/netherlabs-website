# Nether Labs website, September 7 integration

Current source combines the supplied September 7 cinematic design with the existing production diagnostic intake and July 17 privacy policy. Netlify hosts a Next.js static export and one existing intake function. The previous mailbox-only boundary is not the deployed integration.

## Verification

`npm ci`, `npm run check`, `npm run build`, and `npm audit` verify this source. `out/` is the deployable static tree; retain `netlify/functions/intake-form.js` and the Netlify Forms declaration. Do not use `next start` for the static export.

## Source provenance

Original ZIP and unmodified acceptance/provenance documents are retained separately in the workspace integration evidence. Source archive SHA-256: 8c3c2a3c286241a1494330af7343e3b634ae4c40d94e3ed553daddd7b0a4eafb.

Historical archive reports are under `docs/upstream/`. They describe the unmodified incoming ZIP, not current release results. The current results are in `docs/RELEASE.md`.
