# AI Workflow — Bank Welfare Analyzer

Version: v1
Status: Active
Repository: `sdtest-me/bank-welfare-analyzer`
Related: `specs/git-workflow.md`, `specs/overview.md`

---

## Purpose

This document defines how AI tools are used in this project.

Not what AI tools can do in general.
What **this project uses them for**, in what sequence, with what rules.

The problem this document solves:
Without defined roles, AI tools produce overlapping, contradictory, or inconsistent outputs.
The developer manually reconciles them — and this does not scale.

---

## Core Principle

**The repository is the source of truth. AI tools are contributors, not owners.**

- specs/ = persistent project memory
- AI chats = working sessions, not archives
- Git commits = decisions you made, reviewed, and approved
- AI output = draft until you commit it

---

## AI Tool Roles

### Claude (this tool)

**Primary role:** Architecture, documentation, spec authorship, analytical logic review, cross-file consistency.

Best used for:
- Writing and synchronizing `specs/` documents
- Reviewing formulas against actual code
- Catching inconsistencies across specs
- Generating `overview.md`-level context
- Drafting narrative engine logic and calibration rules
- Explaining what code does before you modify it

Not used for:
- Direct file writes to the repository (Claude cannot push to GitHub)
- Real-time code execution or browser testing
- Managing Git state

**Workflow with Claude:**
1. Paste relevant code or spec content into the conversation
2. Claude produces a revised document or analysis
3. You download the file or copy the content
4. You review, then commit via Git

**Memory rule:** Claude does not retain conversation history between sessions.
The `specs/` folder is Claude's persistent memory for this project.
Before starting a new session on a complex task, paste `specs/overview.md` as context.

---

### Cursor

**Primary role:** In-editor code generation, refactoring, and implementation of engine logic.

Best used for:
- Implementing changes to `src/js/core/*.js`
- Refactoring within a file based on spec requirements
- Autocomplete-driven iteration on formulas
- Generating `ui.js` rendering updates
- Adding i18n keys to `i18n.js`

Not used for:
- Architecture decisions (those go through Claude + specs first)
- Cross-file consistency review
- Spec authorship

**Workflow with Cursor:**
1. Architecture decision is made and documented in `specs/` first
2. Open the target file in Cursor
3. Provide the spec excerpt as context in the prompt
4. Cursor implements; you review the diff
5. Commit with a clear message referencing the spec

**Key rule:** Cursor operates on the current file. It does not see the full repository by default.
Always provide the relevant spec section as prompt context, not just a vague instruction.

Example prompt pattern:
```
According to specs/mismatch-engine.md, the mismatch score formula is:
[paste formula]
Update calculateMismatch() in this file to match exactly.
```

---

### ChatGPT / Grok / Qwen

**Primary role:** Strategic analysis, second opinion, alternative architectural perspectives, repository-level assessments.

Best used for:
- Validating architectural decisions before committing
- Getting a second read on a spec before finalizing
- Exploring alternative approaches to a problem
- Generating Git workflow or tooling advice
- Repository-level assessments when GitHub access is needed (Grok can read public repos)
- Cross-model consistency validation — run the same spec question through multiple models and compare

Not used for:
- Authoritative spec authorship (Claude owns `specs/`)
- Code implementation (Cursor owns `src/`)
- Git operations

**Tool-specific strengths in this project:**

| Tool | Strength |
|---|---|
| ChatGPT | Strategic and product-level advice, workflow design |
| Grok | Can read public GitHub repos directly; useful for repo-level review without file pasting |
| Qwen | Alternative analytical perspective; useful as a second opinion on formulas and logic |

**Key rule:** Outputs from ChatGPT/Grok/Qwen are input for Claude or Cursor — not direct commits.
If any of these tools suggest a spec change: bring it to Claude for reconciliation with existing specs first.

---

## Workflow Patterns

### Pattern 1: New Feature

```
1. Define the feature in terms of which engine it affects
2. Claude: update the relevant spec in specs/
3. Review the spec for consistency with overview.md
4. Cursor: implement based on the updated spec
5. Test manually in browser
6. Git: commit spec + code changes together
7. PR to main
```

### Pattern 2: Bug Fix in Engine Logic

```
1. Identify which engine file contains the bug
2. Claude: paste the function + spec, ask for diagnosis
3. Claude: produce corrected formula or logic
4. Cursor: apply the fix in the actual file
5. Verify the fix matches the spec
6. Git: commit with fix: <description>
```

### Pattern 3: Spec Synchronization

```
1. Identify inconsistency (e.g., narrative layer mismatch)
2. Claude: paste all conflicting spec sections
3. Claude: produce synchronized versions with minimal changes
4. Review: does overview.md need updating?
5. Git: commit as sync: align <file> with <authoritative source>
```

### Pattern 5: Mixed-Cycle (task-dependent)

This is the default mode for this project. The tool chosen depends on the nature of the task:

```
Strategic or architectural question?
    → Start with Claude or ChatGPT/Grok/Qwen
    → Document decision in specs/
    → Then implement

Code change in an existing engine?
    → Start with Cursor
    → Verify against spec before committing
    → If formula changes: confirm with Claude

Spec inconsistency discovered?
    → Claude: paste conflicting sections, produce sync
    → Review against overview.md
    → Commit as sync:

Second opinion needed?
    → ChatGPT / Grok / Qwen
    → Compare with Claude's version
    → Reconcile in specs/, commit the winner
```

**Decision rule:** whichever tool you start with, the result must land in either `specs/` (for decisions) or `src/` (for code) before it counts as done. Chat history is not a deliverable.



```
1. Open specs/overview.md
2. Paste it as first message to Claude
3. Describe the task
4. Claude will orient itself from overview.md without needing full history
```

This is the most important pattern.
Do not assume Claude remembers previous sessions. It does not.
`specs/overview.md` is the onboarding document for both humans and AI.

---

## What AI Tools Must Not Do

| Prohibited action | Why |
|---|---|
| Push directly to `main` | main is protected; all changes via PR |
| Invent function names not in Code Mapping | Creates phantom references in specs |
| Generate formulas without code verification | Produces plausible-but-wrong documentation |
| Rewrite specs without checking overview.md for authority | Creates divergence |
| Remove the escalation trigger (`profitGap > 5 AND creditConsumption > 40`) | Hard product requirement |
| Add `Critical` as a code-level riskLevel value | It is a conceptual tier only |
| Use `git add .` without diff review after AI session | Risk of committing unintended changes |

---

## Consistency Check Protocol

Before committing any AI-generated change to a spec, verify:

1. **Does it conflict with any other spec?**
   Check `specs/overview.md` — Document Hierarchy section.

2. **Does it reference real function names?**
   Verify against `specs/architecture.md` — Code Mapping section.

3. **Does it match the code?**
   If a formula changed: `grep` the function in the actual `.js` file.

4. **Is the authoritative source respected?**
   - Narrative structure → `specs/narrative-engine.md`
   - Roadmap → `specs/roadmap.md`
   - Architecture + formulas → `specs/architecture.md`
   - Engine intent → individual engine specs

5. **Does `overview.md` need updating?**
   If you added a new file, changed a role, or resolved an inconsistency: update `specs/overview.md`.

---

## Session Startup Checklist

Before starting an AI-assisted work session:

```
[ ] Which file am I changing? (code or spec?)
[ ] Which engine does this affect?
[ ] Have I read the relevant spec section?
[ ] Do I have the current git branch correct?
[ ] Is main up to date? (git pull origin main)
[ ] Is my feature branch rebased on main?
```

Before ending a session:

```
[ ] Did I review all AI-generated diffs before staging?
[ ] Are commit messages descriptive?
[ ] Does overview.md reflect any structural changes?
[ ] Did I delete any stale branches?
[ ] Is there anything in the working directory that should NOT be committed?
```

---

## Document Ownership by AI Tool

| Document | Primary author | Review |
|---|---|---|
| `specs/architecture.md` | Claude | You |
| `specs/overview.md` | Claude | You |
| `specs/git-workflow.md` | Claude | You |
| `specs/ai-workflow.md` | Claude | You |
| `specs/*-engine.md` | Claude | You |
| `specs/calibration.md` | Claude | You |
| `specs/roadmap.md` | You + ChatGPT/Grok/Qwen | Claude for consistency |
| `specs/product.md` | You + ChatGPT/Grok/Qwen | Claude for consistency |
| `src/js/core/*.js` | Cursor | You |
| `src/js/ui.js` | Cursor | You |
| `src/js/i18n.js` | Cursor + Claude | You |

**You are the final reviewer and committer for everything.**

---

## Scaling This Workflow

This workflow is designed for a solo developer with AI assistance.

When the project grows to require:
- multiple contributors,
- automated testing,
- CI/CD pipeline,

update this document first.
The workflow must evolve before the repository does.
