# Scoring Engine Specification v1

## Purpose

The Scoring Engine converts raw bank and macroeconomic indicators into a normalized analytical baseline for downstream systems.

It produces:

- Welfare Score
- Impact Index
- Structural Risk Signals
- Calibration Inputs
- Narrative Severity Inputs

The engine is deterministic.

No AI/LLM inference is used.

---

# Inputs

## Bank Inputs

| Variable | Description |
|---|---|
| profitGrowth | Annual bank profit growth (%) |
| incomeGrowth | Population income growth (%) |
| creditConsumption | Consumer lending share (%) |
| creditBusiness | Business lending share (%) |
| povertyRate | National poverty rate (%) |
| avgInterestRate | Average retail lending rate (%) |
| dividendPayout | Dividend payout ratio (%) |
| capitalAdequacy | Bank capitalization strength |

---

# Derived Metrics

## Profit Gap

```text
profitGap = profitGrowth / incomeGrowth
```

Purpose:
Detect extraction asymmetry between bank growth and population welfare growth.

---

## Welfare Score

Weighted baseline score.

### Formula

```text
WelfareScore =
(F1 × 0.30) +
(F2 × 0.25) +
(F3 × 0.20) +
(F4 × 0.15) +
(F5 × 0.10)
```

---

# Welfare Factors

| Factor | Description |
|---|---|
| F1 | Profit disparity |
| F2 | Consumer lending pressure |
| F3 | Poverty burden |
| F4 | Interest rate pressure |
| F5 | Dividend extraction pressure |

---

# Impact Index

## Purpose

The Impact Index is the primary decision-grade metric.

It supersedes raw Welfare Score interpretation.

The index estimates whether a bank:
- stabilizes society,
- extracts from fragility,
- or amplifies systemic risk.

---

# Impact Drivers

| Driver | Effect |
|---|---|
| profitGap | Structural extraction |
| mismatchPressure | Narrative inconsistency |
| lendingPressure | Household debt pressure |
| povertySensitivity | Population fragility |
| dividendExtraction | Capital withdrawal |

---

# Structural Risk Trigger

High structural risk occurs when:

```text
profitGap > 5
AND
creditConsumption > 40
```

This activates:
- severe narrative escalation,
- recommendation override,
- structural risk messaging.

---

# Normalization

All scores are normalized to:
- 0–100
- bounded
- NaN-protected
- deterministic

---

# Engine Constraints

The engine must:
- never return NaN,
- never exceed 0–100,
- remain deterministic,
- remain explainable,
- support calibration layers.

---

# Dependencies

Used by:
- mismatch engine,
- narrative engine,
- recommendation engine,
- calibration system,
- uncertainty system.

---

# Future Expansion

Planned:
- ESG weighting,
- confidence-aware scoring,
- scenario simulation,
- internal-data calibration,
- Sponsor Lab recalibration layer.