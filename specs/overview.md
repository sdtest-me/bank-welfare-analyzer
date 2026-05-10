# Bank Welfare Analyzer — Documentation Overview

Version: v1
Status: Active
Repository: `sdtest-me/bank-welfare-analyzer`
Purpose: AI onboarding entry point and document hierarchy guide

---

## What This Repository Does

Bank Welfare Analyzer evaluates whether a financial institution contributes to sustainable economic development and population welfare — or primarily extracts value through debt expansion, behavioral mismatch, and structural asymmetry.

It is a client-side analytical application (HTML + Vanilla JS) hosted on GitHub Pages. No backend. No database. All computation runs in the browser.

The system produces:
- a **Welfare Score** (baseline performance)
- a **Mismatch Score** (behavioral alignment vs. population)
- an **Impact Index** (decision-grade composite metric)
- **Narratives** (human-readable strategic interpretation)
- **Recommendations** (stage-pair-driven corrective direction)

---

## How the Engines Connect

Engines execute in strict sequence. Each depends on the outputs of the previous.

```
analyzeBank(data)                          ← entry point: engine.js
    │
    ├── calcScore(data)                    ← scoring.js
    │       → score: 0–100
    │
    ├── calculateSpiralStages(data)        ← scoring.js
    │       → spiral.bank{}, spiral.population{}
    │
    ├── mapValuesToBehavior(esgText)       ← valueMapping.js
    │       → behavior (ESG → vMeme mapping)
    │
    ├── calculateMismatch({score, spiral}, esgText)   ← mismatch.js
    │       → mismatchScore, riskLevel, primaryDriver
    │       → explanationText, predictiveImpact
    │
    └── calculateImpact(result)            ← impact.js
            → impactIndex: 0–100
            → reputationalRiskKey, stageGaps
```

After `analyzeBank()` returns, `ui.js` renders all outputs including the Conversion Messaging Layer (Sponsor Lab CTA).

---

## Document Hierarchy

### Authoritative Implementation Documents

These reflect actual code behavior. Use these when writing, debugging, or reviewing engine logic.

| Document | Purpose |
|---|---|
| `specs/architecture.md` | High-level orchestration, formulas, data flow, code mapping |
| `specs/scoring-engine.md` | Scoring Engine: welfare score formula, stage distribution logic |
| `specs/mismatch-engine.md` | Mismatch Engine: divergence formula, drivers, severity tiers |
| `specs/impact-engine.md` | Impact Engine: impact index formula, escalation conditions |
| `specs/narrative-engine.md` | Narrative Engine: 4-layer structure, severity, conversion layer |
| `specs/calibration.md` | Calibration system: objectives, principles, risks |

### Strategic and Product Documents

These define intent, direction, and product positioning. They may be ahead of current implementation.

| Document | Purpose |
|---|---|
| `specs/roadmap.md` | Authoritative 6-phase product roadmap |
| `specs/product.md` | Product thesis, positioning, target users, success criteria |
| `specs/narrative.md` | Extended narrative design principles (supplements narrative-engine.md) |

---

## Conceptual vs. Implementation Distinctions

Some specs use conceptual vocabulary that differs from code variable names. This is intentional — specs describe analytical intent; code implements a specific approximation.

**Known distinctions to be aware of:**

**Mismatch severity tiers:**
- Code (`mismatch.js`) uses three levels: `'low'` / `'medium'` / `'high'`
- `specs/mismatch-engine.md` uses four conceptual tiers: Low / Moderate / High / Critical
- `Critical` is not a code value. It describes the analytical interpretation when `riskLevel = 'high'` combines with extreme extraction signals (`redGap ≥ 18` or `esgClaimMismatch` driver).

**Scoring factor names:**
- `specs/scoring-engine.md` uses F1–F5 with human-readable labels
- `scoring.js` uses short variable names: `pg`, `ig`, `cc`, `pr`, `cb`, `im`, `ix`, `di`, `cp`
- These map 1:1; see the input variable table in `specs/architecture.md` Section 3

**Narrative layers:**
- `specs/narrative-engine.md` defines the canonical 4-layer structure: Situation → Tension → Consequence → Recommendation
- Earlier versions of `architecture.md` used a different 5-layer taxonomy — this has been corrected in v3

---

## Structural Risk Escalation

A critical condition that affects impact interpretation across multiple engines:

```
profitGap > 5  AND  creditConsumption > 40
```

When both conditions are true simultaneously:
- impact tier escalates toward Structural Risk
- narrative severity increases
- recommendations enter override mode

This is the strongest extraction signal in the model. Documented in `specs/scoring-engine.md`, `specs/impact-engine.md`, and `specs/architecture.md`.

---

## Calibration

Calibration is not a post-processing step. It is a continuous constraint applied across all engines to prevent:
- score compression (all banks clustering around 50–60)
- narrative repetition
- false certainty from weak inputs
- Red Dominance Collapse (all banks assigned RED as dominant stage)

→ See `specs/calibration.md` for full calibration objectives, principles, and risk table.

---

## Conversion Layer

The product includes a Sponsor Lab conversion bridge rendered in the UI after analysis results. It is:
- UI-only (no backend)
- Localized via `src/js/i18n.js` (RU/EN)
- Must not alter any analytical outputs
- Must not generate claims beyond what the engines produced

CTA copy is managed via `i18n.js` keys: `sponsorLead`, `sponsorTension`, `sponsorResolution`, `sponsorPrimaryCta`, etc.

→ See `specs/narrative-engine.md` (Conversion Layer section) and `specs/architecture.md` Section 13.1.

---

## Key Files Quick Reference

```
src/js/core/engine.js           ← analyzeBank() orchestration
src/js/core/scoring.js          ← calcScore(), calculateSpiralStages()
src/js/core/mismatch.js         ← calculateMismatch(), inferPrimaryDriver()
src/js/core/impact.js           ← calculateImpact()
src/js/core/valueMapping.js     ← mapValuesToBehavior() (ESG → vMeme)
src/js/core/ranking.js          ← multi-bank comparison
src/js/core/recommendations.js  ← stage-pair-driven recommendations
src/js/ui.js                    ← rendering, charts, CTA layer
src/js/i18n.js                  ← RU/EN dictionary incl. CTA copy
specs/                          ← all documentation
prompts/                        ← versioned prompt specifications
```

---

## For AI Assistants (Codex / Cursor / Claude)

When working on this repository:

1. **Start here** (`specs/overview.md`) for orientation.
2. **Read `specs/architecture.md`** for formulas, data flow, and code mapping before modifying any engine.
3. **Do not invent functions** — verify names in Code Mapping before referencing them.
4. **Respect the calibration constraints** in `specs/calibration.md` — changes to scoring weights or mismatch formula coefficients must be evaluated against calibration targets.
5. **Narrative changes** must conform to the 4-layer structure in `specs/narrative-engine.md`.
6. **Roadmap** is in `specs/roadmap.md` — do not treat `architecture.md` as the roadmap source.
7. **The escalation condition** (`profitGap > 5 AND creditConsumption > 40`) is a hard product requirement — do not remove or soften it.
