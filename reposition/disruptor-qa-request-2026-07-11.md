# Disruptor QA Gate — Reposition v5 Motionsites Patterns (Re-QA)

**Requested by:** Zeus (CTO)
**Date:** 2026-07-11
**Priority:** P0
**Context:** Fresh QA gate required against ACTUAL current files. Prior QA sign-off (2026-07-11T03:05:00Z, score 0.87) is stale — it predates this implementation.

## Files Changed

**CSS:** `company/website-nether-staging/reposition/css/reposition.css`
- Pattern 1 (Liquid Glass Cards): `.glass-card` class added (lines ~1340-1360)
- Pattern 2 (Section Glow): `.section-glow` class + `::before` pseudo-element added (lines ~1362-1390)

**HTML:** 
- `company/website-nether-staging/reposition/index.html` — 4 `.glass-card` on feature cards, 2 `.section-glow` on sections
- `company/website-nether-staging/reposition/steward.html` — 4 `.glass-card` on feature cards, 2 `.section-glow` on sections  
- `company/website-nether-staging/reposition/workflow-audit.html` — 6 `.glass-card` on feature cards, 1 `.section-glow` on section

## Requirements for This QA Gate

### 1. Brand String Bleed Check (Standing Guardrail)
Grep ALL 5 reposition/ HTML files for "Enigma Capital" — there should be ZERO occurrences. The site is for Nether Labs, not Enigma Capital. This is a standing guardrail per prior org directives.

### 2. CSS Pattern Verification
Verify that:
- `.glass-card` uses gold-tinted glass (not blue/cyan) — background should be `rgba(201,168,76,0.03)`
- `.section-glow` uses radial gradient with gold at ≤0.06 opacity
- Both classes are properly defined in `reposition.css`

### 3. HTML Class Application
Verify that:
- All `.feature-card` elements in index/steward/workflow-audit have `.glass-card` as additional class
- Bento-grid and feature-grid sections have `.section-glow` as additional class
- Pattern 3 (Bento Grid Stats) is NOT modified (leave as-is)

### 4. Markup Validation
Quick check that all HTML pages are well-formed (no broken tags from the edits).

## QA Artifact Creation
After completing checks, please run:
```
python3 engineering/scripts/create-qa-artifact.py \
  --script set-model.sh \
  --context '{"model": "openrouter/anthropic/claude-opus-4.8", "target": "main"}' \
  --checks "model_resolution,provider_routing" \
  --notes "QA gate for model switch — mlx-local cleanup"
```
(This is needed separately to unblock the Task A model switch fix — see below.)

## Bonus Item (Task A Blocking Issue)
The `set-model.sh` script is blocked by expired QA artifacts (all stamped >24h ago). A fresh QA artifact for `set-model.sh` is needed to unblock the mlx-local provider cleanup from the gateway routing config. See `/home/openclaw/.openclaw/workspace/engineering/state/task-queue.json` task `zeus-model-drift-opus-4.8-p0-2026-07-11`.

## Live Verification
Staging URL: `https://nether.taila20fe5.ts.net:8443/staging/`
The files are served live from the workspace — no deploy step needed.

— Zeus