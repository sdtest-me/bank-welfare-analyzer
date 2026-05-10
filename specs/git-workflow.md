# Git Workflow — Bank Welfare Analyzer

Version: v1
Status: Active
Repository: `sdtest-me/bank-welfare-analyzer`
Related: `specs/ai-workflow.md`, `specs/overview.md`

---

## Purpose

This document defines the Git workflow for this repository.

It is not a Git tutorial.
It defines how **this specific project** — operated by a solo developer with AI assistance — manages branches, commits, merges, and repository state.

AI tools generate changes faster than a human can manually track state.
Without this workflow, repository history degrades: branch drift, duplicate histories, merge conflicts, rebase confusion.

---

## Repository Structure

```
main                    ← protected, production-ready, merge via PR only
  └── feature/<name>    ← all active work happens here
  └── fix/<name>        ← hotfix branches
  └── docs/<name>       ← documentation-only changes
```

**`main` is always deployable.**
Direct push to `main` is blocked. All changes go through PR.

---

## Branch Naming

| Type | Pattern | Example |
|---|---|---|
| Feature | `feature/<short-description>` | `feature/cta-layer` |
| Fix | `fix/<short-description>` | `fix/mismatch-formula` |
| Docs | `docs/<short-description>` | `docs/sync-specs` |
| Experiment | `exp/<short-description>` | `exp/ranking-v2` |

Rules:
- lowercase, hyphens only, no spaces
- max 3–4 words
- describes **what**, not **who** or **when**

---

## Branch Lifecycle

### Creating a branch

Always branch from up-to-date `main`:

```bash
git checkout main
git pull origin main
git checkout -b feature/<name>
```

Never branch from another feature branch unless explicitly building on top of it.

### Working on a branch

```bash
# make changes
git add <files>
git commit -m "<type>: <description>"
git push origin feature/<name>
```

### Keeping a branch current

If `main` has moved forward while you were working on a branch:

```bash
git checkout feature/<name>
git fetch origin
git rebase origin/main
```

Use rebase (not merge) to keep history linear.
If rebase produces conflicts: resolve, then `git rebase --continue`.

### Finishing a branch

1. Rebase on current `main`
2. Open PR on GitHub
3. Merge via GitHub UI (Squash and Merge preferred for feature branches)
4. Delete the branch after merge:

```bash
git push origin --delete feature/<name>
git branch -d feature/<name>
```

---

## Commit Message Format

```
<type>: <short description>
```

Types:

| Type | When to use |
|---|---|
| `feat` | New feature or capability |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `refactor` | Code restructure without behavior change |
| `chore` | Tooling, config, cleanup |
| `calibrate` | Scoring/weight/formula adjustments |
| `sync` | Spec synchronization across documents |

Examples:

```
feat: add Sponsor Lab CTA to results view
fix: prevent null inflation in calculateImpact
docs: sync architecture.md to v3
calibrate: adjust redSignal weight for extractive banks
sync: align narrative layers with narrative-engine.md
```

Rules:
- present tense, lowercase, no period
- max 72 characters
- no "WIP", "update", "changes" without context
- if AI generated the commit, you still review and own the message

---

## PR Rules

Every PR must:
- have a clear title matching the commit format
- describe **what changed and why** (not how)
- reference the spec file if a formula or architecture changed
- be reviewed by you before merge, even if AI wrote everything

PR title format:
```
feat: <what this PR adds>
fix: <what this PR corrects>
docs: <what this PR documents>
```

**Squash and Merge** is the default merge strategy for feature branches.
This keeps `main` history clean: one commit per feature.

---

## Conflict Resolution Protocol

When a rebase produces conflicts:

1. Open the conflicting file
2. Look for `<<<<<<<`, `=======`, `>>>>>>>`
3. Choose the correct version — or combine manually
4. If the conflict is in a spec file: refer to the authoritative source defined in `specs/overview.md`
5. After resolving all conflicts: `git add <file>` → `git rebase --continue`
6. Never use `git merge` to escape a rebase conflict

If you are unsure which version is correct:
- for code: check the corresponding spec
- for specs: check `specs/overview.md` for which file is authoritative

---

## AI-Generated Changes: Git Rules

When AI (Claude, Cursor, ChatGPT) generates code or docs:

1. **You are the committer.** AI output is a draft, not a commit.
2. **Review before staging.** `git diff` before `git add`.
3. **Never `git add .` blindly** after an AI session. Check what changed.
4. **One logical change per commit.** If AI made 3 separate changes, make 3 commits.
5. **If AI rewrote a spec:** verify it matches the authoritative source in `specs/overview.md` before committing.
6. **Commit message is yours.** AI may suggest it; you confirm it.

---

## Branch Hygiene Rules

- Delete branches after merge — local and remote
- Never leave a branch stale for more than 2 weeks without committing or closing
- If a branch experiment failed: close it with a `chore: abandon <branch>` commit explaining why, then delete
- Do not accumulate branches: max 3 active branches at any time

Check what branches exist:
```bash
git branch -a
```

Clean up merged remote branches:
```bash
git remote prune origin
```

---

## Common Situations

### "I need to update main but I'm on a feature branch"

```bash
git stash              # save uncommitted work
git checkout main
git pull origin main
git checkout feature/<name>
git rebase origin/main
git stash pop          # restore work
```

### "I committed to the wrong branch"

```bash
git log --oneline -3   # find the commit hash
git cherry-pick <hash> # apply it to the correct branch
git checkout <wrong-branch>
git reset --hard HEAD~1  # remove from wrong branch
```

### "I need to undo the last commit (not yet pushed)"

```bash
git reset --soft HEAD~1   # undo commit, keep changes staged
```

### "I accidentally pushed something wrong"

Do not `git push --force` to `main`. Ever.
Create a `fix/` branch, revert the change, open a PR.

---

## Deployment

GitHub Pages deploys automatically from `main`.
Every merge to `main` = live deployment.

Before opening a PR to main, verify:
- the page loads locally (`open index.html`)
- no console errors for the primary analysis flow
- i18n keys exist for any new UI text added

---

## This Workflow With AI Tools

See `specs/ai-workflow.md` for how Claude, Cursor, and ChatGPT integrate with this Git workflow.

The key rule: **AI operates on files; Git records your decisions about those files.**
AI does not own commits. You do.
