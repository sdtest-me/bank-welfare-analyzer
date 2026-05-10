# GitHub Issue Standard

Version: v1
Status: Active
Repository: `sdtest-me/bank-welfare-analyzer`

---

## Purpose

Every implementation issue must be written to this standard before assigning to Codex, Cursor, or any AI agent.

A well-specified issue:
- reduces token waste,
- prevents refactor drift,
- produces predictable output,
- makes PR review faster.

---

## Required Sections

Every implementation issue must contain:

### 1. Goal
What business or UX problem is solved.
One or two sentences maximum.

### 2. Success Criteria
Observable, measurable outcome.
Must be verifiable without running the full test suite.

### 3. Scope
Files and modules the implementer is allowed to change.
List explicitly — do not leave open-ended.

### 4. Constraints
What must NOT be changed.
List explicitly.

### 5. Validation
How implementation correctness is verified.
Steps a human can follow to confirm it works.

### 6. Output
Expected user-visible result.
What the user sees or experiences after the change.

---

## Example Issue

**Title:** Improve Sponsor Lab conversion visibility

### Goal
Users scroll past the Sponsor Lab CTA without reading it.
Improve visibility so the value proposition is understood within 30 seconds.

### Success Criteria
- CTA block is visually distinct from surrounding content
- User can identify the difference between demo and Sponsor Lab in one glance
- EN and RU versions both render correctly

### Scope
- `index.html`
- `src/js/i18n.js`

### Constraints
- No changes to scoring logic
- No changes to `src/js/core/*.js`
- No architecture refactor
- No new dependencies

### Validation
1. Open `index.html` in browser
2. Run analysis with any inputs
3. Scroll to results — CTA block must be visible without scrolling further
4. Switch language to RU — all CTA text must render in Russian
5. Check mobile view (375px width) — CTA must not overflow

### Output
Conversion block rendered below mismatch analysis with clear visual separation from analytical content.

---

## Anti-Patterns to Avoid

| Anti-pattern | Problem |
|---|---|
| "Improve the UI" | No scope, no criteria — AI will refactor everything |
| "Fix the bug" | No description of expected vs actual behavior |
| "Add feature X" | No constraints — AI may touch unrelated files |
| "Make it better" | Unmeasurable — no way to verify completion |
| Open-ended scope | Codex will interpret broadly and cause drift |

---

## Issue Quality Checklist

Before submitting an issue to Codex or Cursor:

```
[ ] Goal is one or two sentences
[ ] Success criteria are measurable
[ ] Scope lists specific files
[ ] Constraints list what must NOT change
[ ] Validation steps are manual and clear
[ ] Output describes what the user sees
```

---

## Related

- `specs/ai-workflow.md` — which AI tool handles which task
- `prompts/issues/implement-issue.md` — prompt template for Codex/Cursor
- `specs/architecture.md` — engine boundaries to respect in Scope/Constraints
