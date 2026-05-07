Problem:
After recent impact model changes, ImpactIndex range is still compressed (≈44–76) and does not reflect expected separation from Country Welfare Contribution Index baseline (~58/100).

Observed issue:
- Low-risk banks still cluster too close to baseline
- High mismatch banks do not degrade sufficiently
- Relative ordering is correct, but amplitude is weak for decision-making

Expected behavior:
- Clear separation between:
  - strong systems (>70)
  - neutral systems (~55–65 aligned with welfare index ~58)
  - weak systems (<50)
- Stronger divergence under higher mismatch / structural gap

Hypothesis:
Current penalty weights are still too conservative relative to:
- mismatchScore sensitivity
- structuralGap contribution
- lack of stronger tail risk amplification

Requested direction (not full redesign):
- increase non-linear sensitivity of mismatchScore
- slightly increase structuralGap weight
- allow lower bound compression (<45 for weak systems)
- preserve current formula architecture (no structural rewrite)

Acceptance criteria:
- at least 2 banks fall below 50 in current dataset
- at least 1 bank exceeds 70
- welfare baseline (≈58) sits in middle cluster, not top cluster