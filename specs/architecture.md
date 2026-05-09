````markdown
# Bank Welfare Analyzer — Architecture Specification

Version: v1  
Status: Active  
Repository: `sdtest-me/bank-welfare-analyzer`

---

# 1. System Overview

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

# 2. Core System Layers

The system consists of five analytical layers:

| Layer | Purpose |
|---|---|
| Scoring Engine | Calculates welfare-oriented baseline metrics |
| Mismatch Engine | Detects structural misalignment between bank and population |
| Impact Engine | Produces decision-grade impact estimation |
| Narrative Engine | Converts analytical outputs into human-readable strategic interpretation |
| Calibration System | Stabilizes model behavior and prevents drift |

---

# 3. Scoring Engine

## Purpose

The Scoring Engine produces the baseline welfare-oriented evaluation of a bank.

It converts raw economic indicators into normalized analytical signals.

---

## Inputs

Typical inputs:

- bank profit growth
- population income growth
- poverty rate
- business loan share
- consumer loan share
- dividend payout ratio
- average interest rate
- ESG indicators
- capital adequacy
- GDP per capita

---

## Primary Output

```text
welfareScore: 0–100
````

---

## Design Principles

### 1. Welfare-first

The engine prioritizes:

* borrower outcomes,
* productive lending,
* systemic stability,

instead of shareholder profitability alone.

---

### 2. Penalty-based logic

The score decreases when:

* extractive lending rises,
* consumer debt dominates,
* inequality increases,
* ESG credibility weakens.

---

### 3. Normalization

All intermediate values are normalized before aggregation.

This prevents:

* single-variable domination,
* runaway weighting,
* unstable outputs.

---

## Key Functions

Typical functions:

```text
calcScore()
normalizeMetric()
calculateESGAlignment()
```

---

## Failure Handling

The engine must:

* reject NaN propagation,
* clamp invalid ranges,
* handle missing values explicitly,
* expose uncertainty when inputs are incomplete.

---

# 4. Mismatch Engine

## Purpose

The Mismatch Engine measures structural divergence between:

* bank behavioral profile,
* population life conditions.

This is the system’s central diagnostic layer.

---

## Conceptual Basis

The model uses Spiral Dynamics-inspired stage distributions.

The engine compares:

```text
bankStages[]
vs
populationStages[]
```

---

## Main Output

```text
mismatchScore: 0.00–1.00
```

---

## Interpretation

| Range     | Interpretation        |
| --------- | --------------------- |
| 0.00–0.15 | Strong alignment      |
| 0.16–0.35 | Transitional mismatch |
| 0.36–1.00 | Structural mismatch   |

---

## Dominant Stage Analysis

The engine identifies:

* dominant bank stage,
* dominant population stage,
* stage gap,
* direction of pressure.

Example:

```text
Bank: RED
Population: BEIGE
```

This represents extractive asymmetry.

---

## Structural Logic

Mismatch is not purely numerical.

The engine also evaluates:

* stage incompatibility,
* social pressure asymmetry,
* institutional friction,
* welfare sustainability.

---

## Important Constraint

Stage distributions must:

```text
sum = 100%
```

and remain normalized after all transformations.

---

# 5. Impact Engine

## Purpose

The Impact Engine converts:

* welfare score,
* mismatch score,
* ESG quality,
* confidence signals,

into a unified strategic impact metric.

---

## Main Output

```text
impactIndex: 0–100
```

---

## Why It Exists

The welfare score alone was insufficient because:

* banks could score moderately while remaining structurally extractive,
* mismatch risk was underweighted,
* narratives became inconsistent.

The Impact Engine resolves this.

---

## Impact Philosophy

Impact represents:

```text
real-world structural effect
```

not cosmetic ESG performance.

---

## Inputs

The engine combines:

* welfareScore
* mismatchScore
* ESG alignment
* dominant stage asymmetry
* confidence modifiers
* risk pressure multipliers

---

## Strategic Tiers

| Impact Index | Tier                   |
| ------------ | ---------------------- |
| 70–100       | Stable alignment       |
| 50–69        | Transitional alignment |
| 0–49         | Structural risk        |

---

## Critical Design Rule

Low mismatch alone cannot produce high impact.

Likewise:

high welfare without social alignment cannot produce stable impact.

---

## Failure Protection

The engine must:

* clamp mismatch before exponentiation,
* prevent null coercion,
* expose uncertainty,
* avoid fallback escalation caused by missing values.

---

# 6. Narrative Engine

## Purpose

The Narrative Engine transforms analytical outputs into:

* readable explanations,
* strategic interpretations,
* actionable recommendations.

---

## Why It Matters

Without narratives:

* users cannot interpret outputs quickly,
* analytical trust collapses,
* conversion potential weakens.

The Narrative Engine is therefore both:

* analytical,
* and commercial.

---

# 7. Narrative Architecture

The narrative system consists of:

| Layer                 | Purpose                            |
| --------------------- | ---------------------------------- |
| Risk Narrative        | Explains institutional danger      |
| Impact Narrative      | Explains social effect             |
| Recommendation Layer  | Suggests actions                   |
| Strategic Shift Layer | Describes transformation direction |
| Mitigation Layer      | Reduces systemic risk              |

---

## Design Rules

Narratives must:

* reflect actual metrics,
* avoid generic repetition,
* adapt to mismatch drivers,
* differentiate stable vs transitional vs structural cases.

---

## Example Logic

Example:

```text
Low mismatch + low impact
```

must NOT generate:

```text
high structural collapse language
```

---

## Time Horizons

Narratives are separated into:

* short-term impact,
* long-term impact.

This improves strategic realism.

---

## Confidence Layer

Narratives must expose:

* uncertainty,
* confidence quality,
* data limitations.

The system must never simulate false certainty.

---

# 8. Calibration System

## Purpose

Calibration stabilizes the entire analytical ecosystem.

Without calibration:

* outputs drift,
* scores collapse toward the middle,
* narratives become repetitive,
* differentiation disappears.

---

# 9. Calibration Targets

The system calibrates:

| Component       | Goal                            |
| --------------- | ------------------------------- |
| Welfare Score   | Preserve spread                 |
| Mismatch Score  | Preserve structural sensitivity |
| Impact Index    | Prevent compression             |
| Narratives      | Preserve differentiation        |
| Recommendations | Preserve relevance              |

---

# 10. Calibration Philosophy

The model is intentionally:

```text
decision-oriented
```

not academically neutral.

It is designed to produce:

* interpretable differentiation,
* institutional diagnostics,
* strategic tension visibility.

---

# 11. Calibration Risks

Major risks include:

| Risk                   | Effect                              |
| ---------------------- | ----------------------------------- |
| Compression Drift      | All banks cluster around same score |
| Red Dominance Collapse | Every bank becomes RED              |
| Narrative Repetition   | Users stop trusting outputs         |
| Confidence Inflation   | Weak data appears reliable          |
| Risk Escalation Drift  | All outputs become “high risk”      |

---

# 12. Prompt Specification Layer

The repository contains prompt specifications used for:

* narrative consistency,
* calibration continuity,
* future AI-assisted evolution.

---

## Prompt Structure

```text
/prompts/core
/prompts/narratives
/prompts/calibration
```

---

## Purpose

Prompt specs allow:

* reproducible AI behavior,
* versioned analytical logic,
* future multi-agent workflows.

---

# 13. Frontend Architecture

Current frontend stack:

| Component | Technology         |
| --------- | ------------------ |
| UI        | HTML5              |
| Styling   | CSS3               |
| Logic     | Vanilla JavaScript |
| Charts    | Chart.js           |
| Storage   | localStorage       |
| Hosting   | GitHub Pages       |
| i18n      | RU/EN dictionary   |

---

## 13.1 Conversion Messaging Layer (UI-only)

The results view includes a conversion bridge directly under mismatch diagnostics.

Its responsibility is commercial framing without changing analytical outputs:

* states that demo output is based on public/estimated inputs,
* creates tension about hidden risk in internal datasets,
* resolves with a Sponsor Lab call-to-action for calibrated simulation.

Implementation constraints:

* UI and copy only (no backend dependency),
* localized via existing RU/EN i18n dictionary,
* no scoring, mismatch, or prediction logic changes.

---

# 14. Future Architecture Direction

Planned evolution:

| Direction              | Purpose                     |
| ---------------------- | --------------------------- |
| Modular JS             | Reduce complexity           |
| Test Harness           | Prevent regression          |
| Scenario Engine        | Simulate macro shocks       |
| API Layer              | Enable external integration |
| Multi-country datasets | Improve realism             |
| Conversion Layer       | Commercialization           |

---

# 15. Commercial Objective

The system is not only analytical.

It is intended to evolve toward:

```text
decision-grade institutional intelligence
```

for:

* regulators,
* ESG analysts,
* investors,
* journalists,
* NGOs,
* policy researchers,
* financial institutions.

---

# 16. Success Criteria

The platform succeeds when:

* users understand outputs within 30–60 seconds,
* banks visibly differentiate,
* narratives feel credible,
* recommendations feel actionable,
* the system produces strategic insight rather than decorative ESG scoring.

---

```text
```
