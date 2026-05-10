# Bank Welfare Analyzer — Architecture Specification

<<<<<<< HEAD
Version: v3
Status: Active
Repository: `sdtest-me/bank-welfare-analyzer`
Canonical specs: `specs/` — see `specs/overview.md` for document hierarchy
=======
Version: v2
Status: Active
Repository: `sdtest-me/bank-welfare-analyzer`
>>>>>>> origin/main

---

## 1. System Overview

Bank Welfare Analyzer is a client-side analytical application that evaluates the structural alignment between:

- bank behavior,
- population conditions,
- welfare outcomes,
- and institutional risk dynamics.

The system combines:

- welfare scoring,
- Spiral Dynamics stage modeling,
- mismatch detection,
- impact estimation,
- narrative generation,
- and strategic recommendations.

The architecture is intentionally modular even when deployed as a static frontend application.

---

## 2. Core Analytical Engines

The system is built around five interdependent layers that execute in sequence. Each layer depends on the outputs of the previous one; the Calibration System operates across all layers to prevent drift.

| Engine | Input | Output | Role |
|---|---|---|---|
| Scoring Engine | Raw economic indicators | `welfareScore` 0–100 | Baseline welfare evaluation of the bank |
| Mismatch Engine | vMeme stage distributions (bank + population) | `mismatchScore` 0–1, `stageGap` | Structural divergence between bank behavior and population conditions |
| Impact Engine | `welfareScore`, `mismatchScore`, ESG quality, confidence | `impactIndex` 0–100, tier | Unified decision-grade metric combining performance and alignment |
| Narrative Engine | All engine outputs + dominant stage pair | Text explanations, recommendations | Translates analytical outputs into interpretable strategic language |
| Calibration System | All engine outputs | Adjusted score distributions | Prevents compression, repetition, and drift across the full pipeline |

---

## 3. Scoring Engine

Produces the baseline welfare score (`score: 0–100`) and Spiral Dynamics stage distributions for both bank and population. These two outputs are the foundation for all downstream engines.

### Outputs

```
score: 0–100          (welfare score, via calcScore())
spiral.bank{}         (stage distribution, via calculateSpiralStages())
spiral.population{}   (stage distribution, via calculateSpiralStages())
```

### Input Variables

| Variable | Meaning |
|---|---|
| `pg` | Bank profit growth (%) |
| `ig` | Population income growth (%) |
| `cc` | Consumer credit concentration (%) |
| `pr` | Poverty rate (%) |
| `cb` | Business loan share (%) |
| `im` | Average deposit rate (%) |
| `ix` | Average lending rate (%) |
| `di` | Dividend payout ratio (%) |
| `cp` | Capital adequacy ratio (%) |
| `co2` | ESG/CO₂ proxy (0–100) |

### Welfare Score Formula (`calcScore`)

```javascript
gap = pg / max(ig, 0.1)
gf  = max(0, 100 − gap × 3)         // profit-income gap factor  — weight 0.30
cf  = 100 − cc                        // consumer credit factor    — weight 0.25
pf  = 100 − pr                        // poverty factor            — weight 0.20
ar  = (im + ix) / 2
inf = max(0, 100 − (ar − 10) × 2)    // interest rate factor      — weight 0.15
df  = 100 − di × 0.5                  // dividend factor           — weight 0.10

score = clamp(round(gf×0.30 + cf×0.25 + pf×0.20 + inf×0.15 + df×0.10), 0, 100)
```

### Stage Distribution (`calculateSpiralStages`)

Stage distributions are computed as signal-driven formulas, not fixed weights. Each stage signal is a function of input variables; signals are then normalized so that each distribution (bank and population) sums to 100%.

**Normalization:** `normalizeAndCap(obj, max=40)` — iterative redistribution ensuring no single stage exceeds 40%, with integer rounding and remainder correction.

**Population:** Branches on `cc > 40` (high consumer credit concentration) vs. general case. Key drivers: `pr` (poverty rate), `gd` (GDP per capita), `ig` (income growth).

**Bank:** Stage signals are computed competitively with `competitivePower = 1.7`:

```javascript
redSignal    = cc×0.95 + interestSpread×2.4 + profitGap×3.2 − cb×0.4 − ig×0.5
orangeSignal = pg×0.45 + cb×1.28 + (profitGap < 3 ? 8 : 3) − cc×0.4
blueSignal   = capitalDiscipline×2.2 + (cp > 35 ? 11 : 4) − interestSpread×0.75
greenSignal  = welfareSignal×1.5 + ig×1.35 + (100−di)×0.3 − cc×0.45

bank.red    = clamp(pow(redSignal/20,    1.7) × 10 + 6,  6, 38)
bank.orange = clamp(pow(orangeSignal/25, 1.7) × 10 + 4,  6, 35)
bank.blue   = clamp(pow(blueSignal/21,   1.7) × 10 + 5,  7, 37)
bank.green  = clamp(pow(greenSignal/24,  1.7) × 10 + 5,  6, 37)
```

### Design Principles

**Welfare-first:** The score penalizes extractive profit gaps, high consumer debt concentration, poverty, and excessive dividends — not just raw profitability.

**Competitive stage dynamics:** Bank stage signals compete against each other with a power amplifier (`1.7`), creating decisive peaks rather than flat distributions.

### Key Functions

```
calcScore(data)
calculateSpiralStages(data)
normalizeAndCap(obj, max=40)
```

---

## 4. Mismatch Engine

The system's central diagnostic layer. Measures structural divergence between the bank behavioral profile and population life conditions. Takes `score` and `spiral` from the Scoring Engine plus optional ESG text as input.

### Mismatch Score Formula (`calculateMismatch`)

```javascript
redGap       = max(0, bank.red − population.red)
greenGap     = max(0, population.green − bank.green)
structuralGap = Σ |bank[s] − population[s]| / 2   // over all 8 stages
stageGap     = |bank[bankDominant] − population[popDominant]|

claimsPenalty = (esgClaimsHigh && bank.red ≥ 25 && bank.green ≤ 10) ? 0.2 : 0
scorePenalty  = (100 − score) / 100

baseStagePressure = (redGap/40)×0.4 + (greenGap/40)×0.3
structuralPressure = (structuralGap/100)×0.2
scorePressure      = scorePenalty×0.1
heavyGapBoost      = clamp01(((redGap + greenGap + stageGap) / 120) ^ 1.4)
spreadFactor       = clamp01(((structuralGap/100) + (stageGap/50)) / 2)

mismatchScore = clamp01(
  baseStagePressure + structuralPressure + scorePressure
  + claimsPenalty + heavyGapBoost×0.14 + spreadFactor×0.08
)
```

### Output

```
mismatchScore: 0.000–1.000   (3 decimal places)
riskLevel: 'low' | 'medium' | 'high'
primaryDriver: 'redPressure' | 'empathyGap' | 'stageMismatch' | 'welfareScorePenalty' | 'esgClaimMismatch'
driverConfidence: 0–1
explanationText: { en, ru }
predictiveImpact: { shortTerm: { en, ru }, longTerm: { en, ru } }
```

### Risk Level Assignment

Risk level is derived from `impactIndex` (computed internally):

```
impactIndex > 70  → 'low'
impactIndex ≥ 50  → 'medium'
impactIndex < 50  → 'high'

// Override: low → medium if mismatchScore > 0.35 or impactIndex < 60
```

Tension level for narrative branching:
<<<<<<< HEAD
=======

>>>>>>> origin/main
```
mismatchScore ≥ 0.67 → 'high'
mismatchScore ≥ 0.34 → 'medium'
otherwise             → 'low'
```

### Interpretation

<<<<<<< HEAD
The system uses two distinct tier vocabularies for mismatch severity:

**Implementation tiers** (code, `mismatch.js`) — three levels derived from `impactIndex`:

| mismatchScore | riskLevel (code) | Interpretation |
|---|---|---|
| < 0.34 | `'low'` | Limited immediate mismatch exposure |
| 0.34–0.66 | `'medium'` | Moderate misalignment, active monitoring required |
| ≥ 0.67 | `'high'` | High risk of extractive mismatch |

**Conceptual interpretation tiers** (`specs/mismatch-engine.md`) — four levels for analytical framing:

| Conceptual Tier | Meaning |
|---|---|
| Low | Alignment mostly consistent |
| Moderate | Strategic tension emerging |
| High | Structural inconsistency |
| Critical | Extraction dominates narrative |

The `Critical` tier does not exist as a code value. It is a conceptual label used in analytical interpretation when `riskLevel = 'high'` combines with `redGap ≥ 18` or `esgClaimMismatch` driver — indicating extraction dominance. Narratives and recommendations may use "critical" language in this condition without a separate code branch.
=======
| mismatchScore | riskLevel | Interpretation |
|---|---|---|
| < 0.34 | low | Limited immediate mismatch exposure |
| 0.34–0.66 | medium | Moderate misalignment, active monitoring required |
| ≥ 0.67 | high | High risk of extractive mismatch |
>>>>>>> origin/main

### Dominant Stage Analysis

The engine identifies `bankDominant` and `populationDominant` (argmax of each distribution), then computes `redGap`, `greenGap`, and `structuralGap` as the primary diagnostic signals. The `primaryDriver` is inferred by ranking five weighted factor scores; if the margin between top and second driver is below the ambiguity floor (`0.085`), the engine defaults to `stageMismatch`.

### ESG Signal Integration

When ESG text is provided, `mapValuesToBehavior()` maps it to detected vMeme stages. If the bank claims high ESG stages (green/yellow/turquoise) but has `bank.red ≥ 25` and `bank.green ≤ 10`, a `claimsPenalty = 0.2` is added to the mismatch score.

### Key Functions

```
calculateMismatch(scoringOutput, esgText)
parseEsgSignal(esgText)
inferPrimaryDriver()
buildExplanationText(primaryDriver, driverConfidence)
buildPredictiveImpact(primaryDriver, driverConfidence)
```

---

## 5. Impact Engine

Combines welfare performance and structural alignment into a single decision-grade metric (`impactIndex`). Takes the full result object from `analyzeBank()` — including `welfareIndex` / `score`, `mismatch`, and `spiral` — as input.

### Output

```
impactIndex: 0–100
reputationalRiskKey: 'impactRiskLow' | 'impactRiskMedium' | 'impactRiskHigh'
stageGaps: { bankDominant, populationDominant, dominantGap, redGap, greenGap, structuralGap }
prediction: { shortTerm, longTerm }
```

### Impact Index Formula (`calculateImpact`)

```javascript
baseImpact   = welfareIndex ?? score ?? 50
safeMismatch = clamp(mismatchScore, 0, 1)
heavyMismatch = pow(safeMismatch, 1.4)

redPenalty        = bank.red > 25 ? 0.15 : 0
dominantGapPenalty = min(|dominantGap| / 40, 1)

penalty = min(0.9,
  0.6 × heavyMismatch +
  0.25 × dominantGapPenalty +
  0.15 × redPenalty
)

mismatchPressure = (mismatchScore > 0.30) ? 0.9 : 1.0

impactIndex = clamp(round(baseImpact × (1 − penalty) × mismatchPressure), 0, 100)
```

### Strategic Tiers

| impactIndex | Tier | riskLevel |
|---|---|---|
| > 70 | Stable alignment | low |
| 50–70 | Transitional alignment | medium |
| < 50 | Structural risk | high |

### Reputational Risk Assignment

```
riskLevel = 'high'   OR  mismatchScore ≥ 0.67  OR  redGap ≥ 18  → impactRiskHigh
riskLevel = 'medium' OR  mismatchScore ≥ 0.34  OR  redGap ≥ 10  OR  greenGap ≥ 10  → impactRiskMedium
otherwise → impactRiskLow
```

<<<<<<< HEAD
### Structural Risk Escalation Trigger

A hard escalation condition activates when both of the following are true:

```
profitGap > 5  AND  creditConsumption > 40
```

Where:
- `profitGap = pg / max(ig, 0.1)` — bank profit growth relative to population income growth
- `creditConsumption = cc` — consumer credit concentration (%)

When this condition fires:
- impact tier is escalated toward Structural Risk regardless of raw `impactIndex`
- narrative severity increases to high/critical framing
- recommendations enter override mode with structural intervention language
- the condition is documented in `specs/scoring-engine.md` and `specs/impact-engine.md`

This trigger represents the clearest signal of extractive behavior: the bank is growing profits faster than population income while simultaneously concentrating lending in consumer (rather than productive business) credit.

=======
>>>>>>> origin/main
### Critical Design Rules

1. The penalty is dominated by `heavyMismatch` (weight 0.6) — high mismatch compresses impact even with strong welfare scores.
2. `bank.red > 25` triggers an additional flat penalty of 0.15, making extractive-dominant banks structurally disadvantaged.
3. `mismatchPressure = 0.9` applies a global 10% compression once `mismatchScore > 0.30`.
4. `baseImpact` falls back to `score` if `welfareIndex` is absent, and to `50` if both are missing — ensuring no null inflation.

### Key Functions

```
calculateImpact(result)
dominantStage(stageMap)
```

---

## 6. Narrative Engine

Transforms analytical outputs into readable explanations, strategic interpretations, and actionable recommendations. Without narratives, users cannot interpret scores quickly, analytical trust collapses, and the platform's decision-grade value proposition weakens.

The Narrative Engine is both an analytical layer and a user-facing communication layer. It is the primary surface through which the system's institutional diagnostics become legible to regulators, ESG analysts, and decision-makers.

## 7. Narrative Architecture

<<<<<<< HEAD
The canonical narrative structure is defined in `specs/narrative-engine.md`. Four sequential layers:

| Layer | Purpose |
|---|---|
| Situation | Explains current bank posture, societal interaction, and dominant operating logic |
| Tension | Exposes structural contradictions, extraction pressure, and instability drivers |
| Consequence | Describes likely systemic outcomes, institutional risks, and public resilience implications |
| Recommendation | Provides corrective direction, strategic intervention, and monitoring priorities |

Each tier (Stable / Transitional / Structural Risk) has a dedicated variant selected based on `impactIndex` tier, dominant stage pair, `mismatchScore` range, and confidence level. Narrative text generation uses prompt templates in `/prompts/narratives/`.
=======
| Layer | Purpose |
|---|---|
| Risk Narrative | Explains the nature and source of institutional danger |
| Impact Narrative | Describes the social effect on population welfare |
| Recommendation Layer | Suggests concrete strategic actions for the institution |
| Strategic Shift Layer | Describes the transformation direction required for realignment |
| Mitigation Layer | Identifies paths to reduce systemic risk without full structural change |

Narrative text is generated using prompt templates defined in `/prompts/narratives/`. Each tier (Stable / Transitional / Structural Risk) has a dedicated prompt variant selected based on `impactIndex` tier, dominant stage pair, `mismatchScore` range, and confidence level.
>>>>>>> origin/main

### Design Rules

Narratives must reflect actual metric values, avoid generic repetition, and differentiate meaningfully across tiers. The language must be calibrated to the specific stage pair driving mismatch — a RED/BEIGE divergence calls for different framing than an ORANGE/PURPLE divergence.

Example hard constraint:

```
Low mismatch + low impact
→ must NOT generate "high structural collapse" language
```

<<<<<<< HEAD
Narratives are split into short-term (0–12 months) and long-term (1–5 years) horizons. The `buildPredictiveImpact()` function in `mismatch.js` implements this split based on `primaryDriver` and `tensionLevel`.

### Confidence Layer

Uncertainty and data limitation disclaimers must always be surfaced. The system must never simulate false certainty. Confidence is exposed via `driverConfidence` and `esgSignal.confidence` in `mismatch.js` output.
=======
Narratives are split into short-term (0–12 months) and long-term (1–5 years) horizons to avoid conflating immediate signals with structural trends.

### Confidence Layer

Uncertainty, confidence quality, and data limitation disclaimers must always be surfaced. The system must never simulate false certainty. When `ConfidenceModifier` falls below 0.8, narratives must include an explicit caveat about input completeness.
>>>>>>> origin/main

---

## 8. Calibration System

Calibration stabilizes the entire analytical pipeline. Without it, even a well-designed scoring model degrades over time: outputs compress toward the median, all banks start receiving similar scores, narratives become interchangeable, and the system loses its core value — differentiation.

Calibration is not a post-processing step. It is a continuous constraint applied across all five engines.

## 9. Calibration Targets

| Component | Goal | Failure Mode |
|---|---|---|
| Welfare Score | Preserve spread across full 0–100 range | Compression to 40–60 band |
| Mismatch Score | Preserve structural sensitivity at extremes | All banks scoring 0.2–0.4 |
| Impact Index | Prevent compression toward the 50–60 band | Loss of Stable/Risk differentiation |
| Narratives | Preserve differentiation across tiers and stage pairs | Generic output across all analyses |
| Recommendations | Preserve relevance to dominant stage pair | Identical recommendations for RED and GREEN banks |

## 10. Calibration Philosophy

The model is intentionally decision-oriented rather than academically neutral. It is designed to surface tension, not smooth it. A bank that extracts value from a vulnerable population should score differently from one that supports productive lending — and that difference must be visible and legible to a non-technical reader within 60 seconds.

This means calibration actively resists regression to the mean, even when input data is noisy or incomplete.

## 11. Calibration Risks

| Risk | Effect | Detection Signal |
|---|---|---|
| Compression Drift | All banks cluster around the same score band | Score variance < 15 points across sample |
| Red Dominance Collapse | Every bank is assigned RED as dominant stage | Stage distribution entropy near zero |
| Narrative Repetition | Users stop trusting outputs as generic | Same recommendation text across 3+ analyses |
| Confidence Inflation | Weak or missing data appears reliable | `ConfidenceModifier` = 1.0 with incomplete inputs |
| Risk Escalation Drift | All outputs default to "high risk" regardless of inputs | Structural Risk tier assigned to 80%+ of analyses |

---

## 12. Prompt Specification Layer

The repository contains versioned prompt specifications enabling narrative consistency, calibration continuity, and reproducible AI-assisted generation.

```
/prompts/core/           ← System instructions and scoring context
/prompts/narratives/     ← Per-tier narrative templates
/prompts/calibration/    ← Calibration guard prompts
```

Prompt specs allow reproducible AI behavior across versions, auditable analytical logic, and future multi-agent or batch analysis workflows.

---

## 13. Frontend Architecture

### Current Stack

| Component | Technology |
|---|---|
| UI | HTML5 |
| Styling | CSS3 |
| Logic | Vanilla JavaScript |
| Charts | Chart.js |
| Storage | localStorage |
| Hosting | GitHub Pages |
| i18n | RU/EN dictionary |

---

### 13.1 Conversion Messaging Layer

The results view includes a conversion bridge rendered directly below mismatch diagnostics.

Its role is to connect analytical outputs to deeper engagement — without modifying or overstating those outputs.

**Function:**

- Contextualizes demo limitations: the displayed analysis is based on public or estimated inputs.
- Creates tension around unresolved risk: internal institutional data may reveal a different picture.
- Resolves with a clear call-to-action toward Sponsor Lab for calibrated simulation using proprietary data.

**Implementation constraints:**

- UI copy and layout only — no backend dependency.
- Fully localized via the existing RU/EN i18n dictionary.
- Must not alter `welfareScore`, `mismatchScore`, or `impactIndex` values.
- Must not generate narrative claims beyond what the analytical engines have produced.

---

## 14. Data Flow

All engines are orchestrated by `analyzeBank()` in `engine.js`:

```
Raw Inputs (data{pg, ig, cc, pr, cb, im, ix, di, cp, co2, esgText})
    ↓
[engine.js → analyzeBank(data)]
    ↓
[scoring.js → calcScore(data)]
    → score: 0–100
[scoring.js → calculateSpiralStages(data)]
    → spiral.bank{}, spiral.population{}
    ↓
[valueMapping.js → mapValuesToBehavior(esgText)]
    → behavior (ESG stage mapping)
    ↓
[mismatch.js → calculateMismatch({score, spiral}, esgText)]
    → mismatchScore, riskLevel, primaryDriver
    → driverConfidence, explanationText
    → predictiveImpact{shortTerm, longTerm}
    ↓
[impact.js → calculateImpact(result)]
    → impactIndex: 0–100
    → reputationalRiskKey, stageGaps
    ↓
[ui.js → render + Conversion Messaging Layer]
```

---

## 15. Code Mapping

| Engine / Component | File Path | Notes |
|---|---|---|
| Orchestration | `src/js/core/engine.js` | `analyzeBank()` — calls all engines in sequence |
| Scoring Engine | `src/js/core/scoring.js` | `calcScore()`, `calculateSpiralStages()`, `normalizeAndCap()` |
| Mismatch Engine | `src/js/core/mismatch.js` | `calculateMismatch()`, `inferPrimaryDriver()`, `buildPredictiveImpact()` |
| Impact Engine | `src/js/core/impact.js` | `calculateImpact()`, `dominantStage()` |
| Value Mapping | `src/js/core/valueMapping.js` | `mapValuesToBehavior()` — ESG text → vMeme stage mapping |
| Ranking | `src/js/core/ranking.js` | Multi-bank comparison and sorting |
| Recommendations | `src/js/core/recommendations.js` | Stage-pair-driven recommendation generation |
| UI & Rendering | `src/js/ui.js` | Single file; renders results, charts, CTA layer |
| Internationalization | `src/js/i18n.js` | RU/EN dictionary; includes all CTA/Sponsor Lab copy |

---

<<<<<<< HEAD
## 16. Roadmap

The full 6-phase product roadmap is maintained in `specs/roadmap.md` as the authoritative source.

Summary of phases:

| Phase | Name | Status |
|---|---|---|
| 1 | Analytical Foundation | In Progress |
| 2 | Decision-Grade Interpretation | Planned |
| 3 | Conversion Optimization | Planned |
| 4 | Institutional Simulation | Future |
| 5 | Comparative Intelligence | Future |
| 6 | Enterprise Layer | Future |

Current focus (Phase 1): stabilize scoring, improve differentiation, calibrate impact logic, reduce generic narratives. The `feature/cta-layer` branch implements Phase 3 conversion messaging ahead of schedule as a lightweight UI-only addition.

→ See `specs/roadmap.md` for full phase definitions, goals, and technical priorities.
=======
## 16. Roadmap Phases

### Phase 1: Core Stability ✓ (Current)

- Single-file modular logic in Vanilla JS
- RU/EN i18n support
- Static hosting via GitHub Pages
- CTA / Conversion Messaging Layer (feature/cta-layer)
- **Status:** Active. Core algorithm stability is the primary constraint before Phase 2.

### Phase 2: Decoupling & Testing

- Extract engines from inline scripts into separate ES modules
- Introduce automated test suite (Jest) covering scoring, mismatch, and impact formulas
- Add lightweight build step (Vite) for bundling and tree-shaking
- **Trigger:** When regression risk from ongoing feature additions becomes unacceptable.

### Phase 3: Scale & Integration

- Scenario Engine: simulate macro shocks (rate spike, poverty surge, ESG collapse)
- REST API layer for external tool integration
- Multi-country dataset support with normalized indicator mappings
- **Trigger:** When institutional partners require programmatic access or batch analysis.
>>>>>>> origin/main

---

## 17. Commercial Objective

The system is designed to evolve toward decision-grade institutional intelligence.

Target audiences:

- Regulators and policy researchers
- ESG analysts and investors
- Financial institutions seeking self-assessment
- Journalists and NGOs

---

## 18. Success Criteria

The platform succeeds when:

1. **Clarity:** Users understand outputs within 30–60 seconds of viewing results.
2. **Differentiation:** Banks visibly separate in scoring — no clustering around the median.
3. **Credibility:** Narratives feel specific to the institution, not generic templates.
4. **Actionability:** Recommendations drive strategic thought, not passive reading.
5. **Conversion:** The CTA layer successfully moves users toward Sponsor Lab or deeper analysis.
