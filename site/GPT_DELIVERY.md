# Delivery evidence

Prepared 2026-09-07. Contract acceptance: **fail** (36 pass, 2 fail, 7 not run).

This is a complete source handoff for engineering review. It is not cleared for external release. The inherited locked production dependencies fail the audit gate. Fresh browser QA and Netlify draft verification remain open.

## Source and scope

Visual source is private preview version 13, commit `f81648c6a6f2b2b33a605347fb0b63de7a609a06`, with the cinematic hero restoration. Immediate baseline is the verified July 23 source ZIP. Foundation configuration and lockfile are preserved byte for byte. See BASELINE_PROVENANCE.json and docs/INTEGRATION.md.

## Fresh command evidence

Toolchain: Node v22.13.0, npm 10.9.2. NEXT_TELEMETRY_DISABLED=1; production NEXT_PUBLIC_BASE_PATH unset. No production credentials used. Commands ran in the packaged source root. Full structured timings are in docs/COMMAND_RESULTS.json.

| Command | Start UTC | Finish UTC | Exit |
| --- | --- | --- | --- |
| `npm ci` | 2026-09-07T14:14:51.605091+00:00 | 2026-09-07T14:15:21.794566+00:00 | 0 |
| `npm audit --omit=dev --audit-level=high --json` | 2026-09-07T14:15:45.453088+00:00 | 2026-09-07T14:16:00.339607+00:00 | 1 |
| `npm run typecheck` | 2026-09-07T14:19:07.080326+00:00 | 2026-09-07T14:19:11.308806+00:00 | 0 |
| `node --version` | 2026-09-07T14:21:13.581056+00:00 | 2026-09-07T14:21:13.590020+00:00 | 0 |
| `npm --version` | 2026-09-07T14:21:13.638971+00:00 | 2026-09-07T14:21:13.824218+00:00 | 0 |
| `npm audit --omit=dev --audit-level=high` | 2026-09-07T14:21:25.976005+00:00 | 2026-09-07T14:21:39.009921+00:00 | 1 |
| `npm run lint` | 2026-09-07T14:21:25.987680+00:00 | 2026-09-07T14:21:29.241773+00:00 | 0 |
| `npm test` | 2026-09-07T14:21:25.991274+00:00 | 2026-09-07T14:21:26.974873+00:00 | 0 |
| `npm run build` | 2026-09-07T14:23:51.305053+00:00 | 2026-09-07T14:24:01.389370+00:00 | 0 |
| `npm run check` | 2026-09-07T14:24:39.946199+00:00 | 2026-09-07T14:24:51.553825+00:00 | 0 |

## Audit and warnings

Audit reports 4 high, 0 critical, 0 moderate, 0 low and 0 informational vulnerable-package records. Multiple advisories may be grouped under one package record. Advisory-level details and primary advisory links are in docs/DEPENDENCY_AUDIT.json.

The package preserves the required historical dependency graph. The team must reconcile existing newer fixes or approve remediation, then rerun all gates. Static export alone does not waive the contract audit requirement. No npm audit fix or forced upgrade was run.

Current build/lint/typecheck warnings are recorded below from the final command outputs:

- `npm ci`: no warning lines in captured output.
- `npm run typecheck`: no warning lines in captured output.
- `npm run lint`: no warning lines in captured output.
- `npm test`: no warning lines in captured output.
- `npm run check`: no warning lines in captured output.
- `npm run build`: no warning lines in captured output.

## Generated routes and budgets

Required pages: `/`, `/about/`, `/workflow-audit/`, `/steward/`, `/contact/`, `/privacy/`. Branded `404.html` includes noindex and home/contact recovery. Generated-output tests verify page presence, h1/landmarks, exact metadata, local runtime assets and budgets.

Measured raster total: 560720 bytes. Largest raster: 276206 bytes. Generated JavaScript gzip total: 208458 bytes. CSS gzip total: 10640 bytes. Build outputs are excluded from the source ZIP.

## Evidence limits and release work

Fresh rendered QA of this external export was not performed. Browser access to the private preview was blocked by URL policy after the cinematic restoration; that restriction was not worked around. Older checks on private preview version 12 covered widths 320 to 1920, 18 tab states, keyboard selection and refresh reset, but predate the restored hero and the external contact/internal-route adaptation. They are not acceptance evidence for this package. No older screenshot is included or presented as current.

Source tests check tab semantics, intrinsic shared sizing, reduced-motion fallbacks, contact boundaries and security configuration. They do not replace real browser checks for text wrapping, overlap, scroll choreography, focus or contrast over moving artwork. Complete docs/QA_CHECKLIST.md after integration.

Actual provider 404, headers and retired intake endpoint method behavior are unverified. Engineering must deploy its authorized Netlify draft and run the preserved verify-live script. Current production source and provider state were not inspected.

No external Git branch, commit, PR, deployment, DNS/provider change or team message was created for this handoff. The private preview was published earlier with explicit user authorization; that is separate from this source-only external handoff.

Contact intentionally follows the external hello mailbox-only contract. It does not carry over the preview form or ops address. The integration guide instructs the team to reconcile later production intake work rather than overwrite it.

## Archive verification

One source root and one package manifest. No node_modules, generated output, preview-host scaffolding, environment files, screenshots or credentials. CHANGED_FILES.md covers every included path; SOURCE_SHA256SUMS.txt covers every file except itself. Final archive validation checks clean extraction and complete hash coverage.
