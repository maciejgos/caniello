---
name: forge-roadmap-review
description: Review the project roadmap, task files, and root roadmap index for priority drift, stale status, and MVP scope alignment. Use for weekly roadmap checks or before starting a task outside obvious Now scope.
---

# Forge Roadmap Review

## Purpose

Keep the roadmap useful as a lightweight decision filter. This skill reviews priorities and drift; it does not approve strategy changes.

## Inputs

- `spec/roadmap.md`
- `ROADMAP.md`
- `spec/tasks/`
- `spec/handoff.md`
- `README.md`
- Relevant `spec/` reference artifacts and ADRs when needed.

## Workflow

1. Read `spec/roadmap.md` and root `ROADMAP.md`.
2. Inspect active or recent task files.
3. Identify tasks that do not belong in `Now`.
4. Identify stale roadmap statements, missing non-goals, or conflicts with README/product context.
5. Check whether recommendations would require human approval.
6. Update docs only when the requested change is editorial or explicitly approved.
7. Otherwise record proposed changes in `spec/handoff.md`.

## Review Criteria

Check:

- `Now` remains focused on MVP foundation;
- `Next` and `Later` do not leak into active implementation;
- `Not Now` still blocks marketplace, clinic SaaS, booking, payments-first flow, AI diagnosis, official passport replacement claims, and complex partner integrations;
- task files include roadmap alignment and non-goals;
- root `ROADMAP.md` points to the active roadmap without duplicating heavy process detail;
- historical `spec/` references remain available when needed.

## Rules

- Do not silently add features to `Now`.
- Do not remove strategic constraints.
- Do not approve roadmap changes.
- Do not convert review into implementation.

## Output

End with:

- roadmap health summary;
- drift findings;
- stale or missing items;
- recommended updates;
- approval requirements.
