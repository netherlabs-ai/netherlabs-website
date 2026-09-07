# Integration guide

## Source identities

Visual/content source: private preview version 13, commit `f81648c6a6f2b2b33a605347fb0b63de7a609a06`, including the cinematic hero restoration.

Immediate foundation: `nether-labs-v2-source-20260723.zip`, SHA-256 `2f8790f6c3b258d840790f40561890009fc4234f664a2f26f15b709084c5a650`. This is the latest recovered source handoff, not current production identity or release approval.

Original contract: `nether-labs-v2-gpt-build-contract-20260716`; RC6 commit `5a788851035d06c1487c2d297a7ecdc49b37db28`; worktree `company/website-nether-release-rc6-static-20260716`; branch `release/nether-next-20260716-rc6-static`.

The current external checkout was not inspected. Reconcile any later production changes before merging, including intake work, legal updates, dependency fixes and infrastructure configuration. Do not roll those changes back to the recovered baseline.

## Apply these changes together

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | Server metadata wrapper with the revised homepage summary. |
| `app/components/HomeExperience.tsx` | Revised homepage, tabs, mobile navigation and mailbox dialog. |
| `app/content.ts` | Home diagnostic, Steward, architecture and FAQ content. |
| `app/components/CinematicHero.tsx` | Restored cinematic camera and motion fallbacks. |
| `app/components/cinematic-hero.css` | Scoped hero geometry and responsive composition. |
| `app/globals.css` | New shared design system and home styling with local font definitions. Replace the old accumulated overrides as a unit. |
| `app/components/StaticShell.tsx` | Shared internal-route navigation/footer and native mobile menu. |
| `app/components/interior.css` | Scoped internal-route styling; required with the new globals. |
| `app/about/page.tsx` | Retains the substantial About story; aligns headline and internal-use proof with latest claims. |
| `app/workflow-audit/page.tsx` | Clarifies initial conversation, paid diagnostic and separate implementation. |
| `app/steward/page.tsx` | Explicit development status and design intentions. |
| `app/lib/site.ts` | Preserved SEO/route foundation with current capability labels. |
| `tests/static-contact.test.js` | Contact/runtime boundaries and current tab/hero assertions. |
| `tests/build-output.test.js` | Current metadata/palette, required routes and output budgets. |
| `tests/release-config.test.js` | Exact foundation/security gates and current provenance inventory. |

Remove retired `app/components/HeroScene.tsx` after checking imports in the team's branch. The current implementation is `CinematicHero.tsx`. Do not retain competing hero implementations or append the old homepage stylesheet after the replacement.

The three factory WebPs, local Geist fonts and favicon are unchanged. Keep them under their existing public paths. `CHANGED_FILES.md` uses original RC6 hashes for contract-required classifications. `BASELINE_PROVENANCE.json` also records the immediate July 23 comparison and removed file.

## Deliberate differences from the preview

| Private preview | External handoff |
| --- | --- |
| Email-preparation fields and ops mailbox | Existing contract's visible `hello@netherlabs.ai` link, disclosure and discussion prompts. No form, clipboard operation, collection or submission. |
| Preview hosting scaffold | Next.js App Router static export on Netlify, publishing `out/`, zero functions. |
| Preview font loader/metadata | Existing local Geist fonts, production canonical URLs and per-route metadata. |
| Mostly section navigation | Section navigation plus all six real public routes and Privacy access. |

If the team's current production contact feature differs, reconcile it as an existing production change. Do not silently overwrite it with either the preview form or this historical mailbox boundary.

`package.json`, `package-lock.json`, `next.config.ts` and `netlify.toml` are byte-identical to the July 23 handoff. Its package file already contains the accepted BLD-004 clarification adding literal `npm test`; the dependency graph is unchanged. No dependency upgrade or forced audit fix was performed. Keep newer team-reviewed remediation and run the full checks on the merged result. The locked historical graph is not a security endorsement.

## Team release sequence

1. Verify ZIP and source checksums before editing. Compare source identities with the current external branch.
2. Apply the connected changes in the team's review branch, preserving later production fixes and legal content.
3. Run every command in `README.md` under the required toolchain. Resolve high/critical production audit findings before release.
4. Complete `docs/QA_CHECKLIST.md` on the final merged build. Source assertions do not establish visual correctness.
5. Deploy an authorized Netlify draft with noindex: build `npm run build`, publish `out`. Preserve the exact global headers and branded 404 fallback.
6. Run `node scripts/verify-live.mjs --base-url https://DEPLOY-HOST --draft` using the actual root HTTPS draft hostname. The verifier rejects credentials, ports, paths, queries and fragments, and tests the retired endpoint method matrix.
7. Run independent Disruptor QA against the exact draft and merged source commit. Have Yves review the cinematic opening and copy, then obtain Zeus release sign-off before any external production action.

Use the team's previous known-good external deployment for rollback. The private preview is a design reference, not an external rollback artifact. No external branch, commit, PR, provider change, deployment or team message was created while preparing this package.
