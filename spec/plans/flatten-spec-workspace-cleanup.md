# Flatten spec workspace cleanup

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan follows `spec/plans/PLANS.md`. It is self-contained so a future contributor can understand and recover the cleanup without relying on chat history.

## Purpose / Big Picture

This cleanup turns `spec/` into the single lightweight Caniello workspace for day-to-day Codex work. After the change, a contributor can find durable product context, roadmap priority, task files, optional feature briefs, architecture notes or ADRs, validation evidence, and handoff notes directly under `spec/` without navigating the older Flow Forge PDLC folder chain.

The observable result is structural, not runtime behavior. `spec/product-context.md` will hold durable Caniello product truth, old Flow Forge-era artifacts will remain readable under `spec/archive/flow-forge-history/`, and active guidance in `README.md`, `AGENTS.md`, `ROADMAP.md`, `spec/README.md`, and `.codex/skills/forge-*` will point to the flattened workflow.

No application API, database schema, runtime behavior, or public user-facing product behavior should change.

## Progress

- [x] (2026-05-24 06:46Z) Inspected the current branch and confirmed work is on `codex/caniello-lightweight-harness`.
- [x] (2026-05-24 06:46Z) Read the current README, AGENTS, ROADMAP, spec README, roadmap, handoff, and product requirement sources.
- [x] (2026-05-24 06:46Z) Authored this cleanup ExecPlan before moving files.
- [x] (2026-05-24 06:55Z) Created `spec/product-context.md` from durable product truth in README and existing requirement files.
- [x] (2026-05-24 06:55Z) Archived old Flow Forge-era requirement, story, feature, plan, release-readiness, and lifecycle artifacts under `spec/archive/flow-forge-history/`.
- [x] (2026-05-24 06:55Z) Updated active repository guidance and Forge skills to use the flattened `spec/` workspace.
- [x] (2026-05-24 06:55Z) Updated `spec/handoff.md` with the cleanup state and validation notes.
- [x] (2026-05-24 06:55Z) Ran structure, active-reference, Markdown, lint, and test validation.

## Surprises & Discoveries

- Observation: The active lightweight harness already exists in `.codex/skills/forge-*`, `spec/roadmap.md`, `spec/tasks/TEMPLATE.md`, `spec/features/LIGHTWEIGHT_TEMPLATE.md`, `spec/architecture/NOTE_TEMPLATE.md`, and `spec/handoff.md`.
  Evidence: `find .codex/skills -maxdepth 2 -name SKILL.md -type f | sort` lists only the seven active `forge-*` skills.

- Observation: Some active docs still describe release-readiness and lifecycle folders as active workspace records, which conflicts with the requested flattening.
  Evidence: `rg "spec/(requirements|stories|release-readiness|lifecycle)" README.md AGENTS.md ROADMAP.md spec/README.md .codex/skills` returned active guidance references in README, ROADMAP, and spec README.

- Observation: `pnpm lint` and `pnpm test` could not complete inside the sandbox because the command runner returned `[ERROR] fetch failed`; rerunning outside the sandbox required `pnpm install` first because `node_modules` was missing.
  Evidence: the first escalated `pnpm lint` reported `sh: turbo: command not found`, then `pnpm install` installed the locked dependencies and both validation commands passed outside the sandbox.

## Decision Log

- Decision: Archive old artifacts instead of deleting them.
  Rationale: The user explicitly requested conservative moves so historical evidence remains readable while inactive.
  Date/Author: 2026-05-24 / Codex.

- Decision: Keep `spec/validation/` and `spec/architecture-records/` active.
  Rationale: Validation evidence and ADRs are durable, useful records even in the lightweight harness.
  Date/Author: 2026-05-24 / Codex.

- Decision: Keep `spec/plans/PLANS.md`, `spec/plans/README.md`, and this cleanup ExecPlan active, while archiving older implementation ExecPlans.
  Rationale: `PLANS.md` defines the ExecPlan method, `README.md` orients the folder, and this plan is the evidence for this cleanup.
  Date/Author: 2026-05-24 / Codex.

## Outcomes & Retrospective

The cleanup is in progress. The intended outcome is a smaller active `spec/` surface with historical PDLC material preserved under `spec/archive/flow-forge-history/`.

2026-05-24 outcome: The cleanup completed. Active guidance now points to `spec/product-context.md`, `spec/roadmap.md`, `spec/features/LIGHTWEIGHT_TEMPLATE.md`, `spec/tasks/TEMPLATE.md`, `spec/handoff.md`, `spec/architecture/`, `spec/architecture-records/`, and `spec/validation/`. Old Flow Forge-era artifacts were archived rather than deleted. No app behavior files were intentionally changed. Validation passed after dependency installation and sandbox escalation for lint/test.

## Context and Orientation

The repository root is `/Users/macg/Code/caniello`. Caniello is a pet health and care organization utility. Its MVP promise is one place for pet health records, reminders, documents, and shareable care information.

The active lightweight workflow is:

    roadmap filter -> task -> implementation -> verification -> handoff

`spec/roadmap.md` is the active priority filter. `spec/tasks/` is for executable work. `spec/features/` is for optional lightweight feature briefs when raw notes are too broad for a direct task. `spec/architecture/` is for exploratory architecture notes, and `spec/architecture-records/` is for durable architecture decision records, also called ADRs. An ADR is a written decision that records context, the chosen direction, and consequences so future tasks can follow it. `spec/validation/` holds durable evidence for checks. `spec/handoff.md` holds the continuation state for the next Codex session.

Older Flow Forge-era folders exist under `spec/` from the heavier product development lifecycle. They are useful as historical evidence but should not remain active daily workflow paths after this cleanup.

## Plan of Work

First, create `spec/product-context.md`. It should consolidate durable product truth from `README.md` and current requirement files, including MVP promise, audience, validation goals, explicit non-goals, medical and legal boundary, and the relationship to The Future Thinker World control plane.

Second, create `spec/archive/flow-forge-history/` and move old active PDLC artifacts into it. Move whole historical folders where the entire folder is no longer active, and move only old detailed feature and plan files when the directory still has active README or template files.

The exact move map is:

- Move `spec/requirements/` to `spec/archive/flow-forge-history/requirements/`.
- Move `spec/stories/` to `spec/archive/flow-forge-history/stories/`.
- Move `spec/release-readiness/` to `spec/archive/flow-forge-history/release-readiness/`.
- Move `spec/lifecycle/` to `spec/archive/flow-forge-history/lifecycle/`.
- Move old detailed feature files from `spec/features/` to `spec/archive/flow-forge-history/features/`, excluding `README.md`, `TEMPLATE.md`, and `LIGHTWEIGHT_TEMPLATE.md`.
- Move old ExecPlans from `spec/plans/` to `spec/archive/flow-forge-history/plans/`, excluding `PLANS.md`, `README.md`, and `flatten-spec-workspace-cleanup.md`.

Third, update active guidance in `README.md`, `AGENTS.md`, `ROADMAP.md`, and `spec/README.md` so they describe `spec/` as the flattened active workspace. Active guidance should point to `spec/product-context.md`, `spec/roadmap.md`, `spec/features/LIGHTWEIGHT_TEMPLATE.md`, `spec/tasks/TEMPLATE.md`, `spec/handoff.md`, `spec/architecture/`, `spec/architecture-records/`, and `spec/validation/`.

Fourth, update active Forge skills under `.codex/skills/forge-*` so their inputs and rules use `spec/product-context.md` and no longer direct normal work through archived requirements, stories, release-readiness, or lifecycle directories.

Fifth, update `spec/handoff.md` with the cleanup result and validation status.

Sixth, run validation and record the outcome in this plan and handoff.

## Concrete Steps

Run commands from the repository root:

    cd /Users/macg/Code/caniello
    git status --short
    git branch --show-current

Create or edit docs with `apply_patch`. Move old artifacts with `mkdir -p` and `mv`.

After edits and moves, run:

    find spec -maxdepth 3 -type f | sort
    test ! -d docs
    find spec/archive/flow-forge-history -maxdepth 3 -type f | sort
    rg "spec/(requirements|stories|release-readiness|lifecycle)" README.md AGENTS.md ROADMAP.md spec/README.md .codex/skills
    git diff --check
    pnpm lint
    pnpm test

For the `rg` command, the expected result is no active guidance that requires the archived directories as default workflow paths. If it prints matches from active guidance, update those files.

Actual validation results on 2026-05-24:

    test ! -d docs
    # exited 0

    rg "spec/(requirements|stories|release-readiness|lifecycle)" README.md AGENTS.md ROADMAP.md spec/README.md .codex/skills
    # exited 1 with no matches, which is the expected result

    git diff --check
    # exited 0

    pnpm lint
    # passed outside the sandbox: 7 successful lint tasks

    pnpm test
    # passed outside the sandbox: 10 successful test tasks; web reported 8 test files and 43 tests passed

## Validation and Acceptance

Accept the cleanup when these conditions are true:

- `spec/product-context.md` exists and contains the durable Caniello product context.
- The old requirements, stories, release-readiness, lifecycle, detailed feature files, and old ExecPlans are under `spec/archive/flow-forge-history/`.
- Active guidance points to the flattened workspace and does not require the old PDLC directories as default paths.
- `git diff --check` passes.
- `pnpm lint` passes.
- `pnpm test` passes.

Because this is a documentation and harness structure change, Playwright browser validation is not required unless app or UI code changes unexpectedly.

## Idempotence and Recovery

The cleanup is conservative because it archives files instead of deleting them. If a move is interrupted, inspect `git status --short` and `find spec -maxdepth 3 -type f | sort`, then repeat only the missing move. If active docs accidentally reference archived paths as active defaults, use `rg` to find the references and update the guidance.

Recovery is straightforward because git records moves as deletes plus adds. To inspect any moved file, read it from `spec/archive/flow-forge-history/`. Do not use destructive commands such as `git reset --hard` unless a human maintainer explicitly asks.

## Artifacts and Notes

Initial reference scan:

    rg "spec/(requirements|stories|release-readiness|lifecycle)" README.md AGENTS.md ROADMAP.md spec/README.md .codex/skills

showed active references in README, ROADMAP, and `spec/README.md` that must be updated.

## Interfaces and Dependencies

No application interfaces or runtime dependencies are changed. This plan touches Markdown and repository organization only. The relevant artifacts are `README.md`, `AGENTS.md`, `ROADMAP.md`, `.codex/skills/forge-*`, and files under `spec/`.

Revision note, 2026-05-24: Created the initial self-contained cleanup plan before executing the archive and guidance updates, so the structural work can be resumed from this file alone.

Revision note, 2026-05-24: Updated the plan after execution with completed progress, sandbox/dependency validation observations, and the final validation results.
