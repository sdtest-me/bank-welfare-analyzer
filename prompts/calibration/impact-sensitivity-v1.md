# Impact Sensitivity Calibration v1

## Purpose

Define calibration objectives for improving differentiation between banks and reducing score compression.

The calibration layer governs analytical sensitivity rather than narrative generation.

---

# Calibration Goals

The engine should:

- clearly separate banks with different structural profiles
- avoid clustering near baseline values
- preserve narrative differentiation
- maintain stable risk-impact consistency

---

# Compression Detection

Calibration drift exists when:

- most banks cluster near the same impact range
- narratives become repetitive
- risk tiers fail to differentiate institutions
- structural mismatch produces weak separation

---

# Sensitivity Targets

The engine should increase sensitivity to:

- affordability pressure
- extraction imbalance
- ESG divergence
- mismatch escalation
- dominant stage conflict

The engine should reduce sensitivity to:
- isolated single metrics
- noisy edge cases
- weak-confidence signals

---

# Narrative Separation Rules

Different impact tiers should produce:

- visibly different recommendations
- visibly different risk narratives
- visibly different strategic implications

Avoid:
- generic recommendation reuse
- near-identical outputs across banks

---

# Calibration Constraints

Do NOT:
- overfit to one country
- hardcode institution-specific behavior
- create deterministic outputs

Prefer:
- adaptive calibration
- probabilistic interpretation
- multi-factor differentiation

---

# Validation Expectations

Calibration improvements should:
- increase bank differentiation
- preserve narrative consistency
- reduce false structural-risk escalation
- improve interpretability
