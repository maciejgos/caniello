---
name: forge-handoff
description: Update project handoff notes after planning, implementation, evaluation, or roadmap review so the next Codex session can continue without chat history.
---

# Forge Handoff

## Purpose

Keep `spec/handoff.md` current as the lightweight working memory for the project.

## Inputs

- Current task file, if any.
- `git status --short`
- Recent validation results.
- Known blockers, risks, and next recommended action.
- `spec/roadmap.md`

## Workflow

1. Inspect the current task, branch, and worktree status.
2. Summarize what changed or what was reviewed.
3. Record validation status as passed, failed, skipped, unavailable, or pending.
4. Record known gaps and risks.
5. Record the next recommended action.
6. Preserve human approval state accurately.

## Rules

- Do not mark work accepted, approved, released, merged, or complete unless the human explicitly did so.
- Do not hide failed or skipped validation.
- Do not use handoff notes to move roadmap scope.
- Keep notes concise and useful to a fresh Codex session.

## Output

Update `spec/handoff.md` with:

- active task;
- active branch;
- current state;
- validation status;
- known gaps;
- next recommended action;
- dirty worktree notes when relevant.
