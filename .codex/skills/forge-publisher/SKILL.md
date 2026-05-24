---
name: forge-publisher
description: Publish one validated Caniello task to GitHub by inspecting the worktree, staging only intentional files, committing, pushing the branch, and opening a draft PR. Use after forge-evaluator reports Pass or Pass with gaps, or when a human explicitly asks to commit, push, open a PR, publish, or prepare review for validated task work.
---

# Forge Publisher

## Purpose

Turn validated task work into a reviewable GitHub draft PR without approving, merging, releasing, or expanding scope.

The publisher is the last workflow step after implementation, evaluation, and handoff. It preserves validation integrity by treating evaluator output as evidence, not approval.

## Inputs

- One `spec/tasks/*` task file when task work exists.
- Latest `forge-evaluator` verdict or explicit human instruction to publish.
- `git status --short`
- Current branch name and upstream state.
- Current diff and staged diff.
- `spec/handoff.md`
- Relevant validation output and known gaps.
- PR title and body context from the task, evaluator result, and handoff notes.

## Workflow

1. Confirm publishing is allowed: require evaluator `Pass`, evaluator `Pass with gaps`, or explicit human instruction to publish despite gaps.
2. Run `git status --short` and identify all changed, untracked, and staged files.
3. Inspect the diff before staging. Preserve user edits and do not stage unrelated files.
4. Confirm the current branch is not `main` unless the human explicitly requested publishing from it.
5. Stage only files that belong to the validated task or requested publishing step.
6. Re-check `git status --short` and `git diff --cached`.
7. Create a clear imperative commit message that names the user outcome.
8. Commit the staged changes.
9. Push the branch to origin, setting upstream when needed.
10. Open a draft PR with:
    - concise summary;
    - task path and roadmap context;
    - evaluator verdict;
    - validation commands and results;
    - known gaps or skipped checks;
    - screenshots or browser evidence when relevant.
11. Update `spec/handoff.md` with branch, commit, PR link, validation state, gaps, and next recommended action when requested or when the publish step changes project state.

## Rules

- Do not publish failed validation unless the human explicitly asks to publish despite failure.
- Do not claim human approval from a passing evaluation.
- Do not mark work accepted, approved, merged, released, or complete.
- Do not merge PRs, create releases, deploy production, or approve checks.
- Do not stage unrelated files, local env files, dependency folders, caches, or generated tool output.
- Do not rewrite history, amend commits, force-push, or delete branches unless the human explicitly asks.
- Do not modify product scope, roadmap state, ADR status, or acceptance state while publishing.
- Prefer draft PRs unless the human explicitly asks for a ready-for-review PR.
- If unexpected dirty files exist, separate intentional task files from unrelated files and call out anything left unstaged.

## GitHub Tooling

Prefer the GitHub app or `gh` CLI when available for PR creation. Use plain `git` for local status, staging, commit, and push.

Before committing:

- inspect `git status --short`;
- inspect the relevant diff;
- inspect `git diff --cached` after staging.

For PR bodies, include enough evidence for a reviewer to understand what changed without relying on chat history.

## Stop Conditions

Stop and ask the human before proceeding when publishing requires:

- committing from `main`;
- including unrelated or ambiguous user edits;
- publishing failed validation without explicit instruction;
- destructive git operations;
- force push, branch deletion, history rewrite, merge, release, or production deploy;
- external service configuration changes;
- secret, credential, or local env file exposure.

## Output

End with:

- commit hash;
- branch and push target;
- draft PR link, if created;
- files included;
- validation summary;
- known gaps;
- files intentionally left unstaged, if any;
- approvals still needed.
