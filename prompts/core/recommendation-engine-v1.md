# Recommendation Engine v1

## Purpose

Generate strategic recommendations based on:

- impactIndex
- mismatchScore
- dominant stage conflict
- ESG alignment gap
- confidence level

---

## Tier Logic

### Stable Alignment

Condition:
- impactIndex > 70

Narrative:
- reinforce current strategy
- incremental improvement
- disciplined monitoring

---

### Transitional Alignment

Condition:
- impactIndex >= 50

Narrative:
- targeted portfolio adjustments
- improve execution consistency
- borrower-outcome alignment

---

### Structural Risk

Condition:
- impactIndex < 50

Narrative:
- structural-risk correction plan
- governance review
- affordability intervention
- stage realignment

---

## Missing Impact Handling

If impactIndex is:
- null
- undefined
- empty

Then:
- avoid tier escalation
- produce neutral transition guidance

---

## Narrative Constraints

Avoid:
- deterministic language
- absolute certainty
- unsupported causal claims

Prefer:
- probabilistic framing
- systemic interpretation
- uncertainty disclosure
