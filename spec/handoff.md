# Caniello Handoff

## Current State

- Active task: none.
- Active branch: `codex/caniello-lightweight-harness`.
- Current workflow: flattened `spec/` workspace cleanup implemented for review.

## Latest Notes

- The active harness is being simplified around `spec/roadmap.md`, `spec/features/`, `spec/tasks/`, and the Forge skills.
- Historical Flow Forge material is archived under `.codex/flow-forge-reference/` and remains available as reference.
- Durable product context now lives in `spec/product-context.md`.
- Old Flow Forge-era spec artifacts were archived under `spec/archive/flow-forge-history/` instead of deleted.
- Active guidance now points normal work to `spec/product-context.md`, `spec/roadmap.md`, lightweight feature briefs, task files, architecture notes or ADRs, validation, and handoff.

## Validation Status

- `find spec -maxdepth 3 -type f | sort` completed and showed the flattened active workspace plus archived history.
- Confirmed no top-level `docs/` directory exists.
- `find spec/archive/flow-forge-history -maxdepth 3 -type f | sort` completed and showed archived requirements, stories, detailed features, old plans, release-readiness records, and lifecycle records.
- `rg "spec/(requirements|stories|release-readiness|lifecycle)" README.md AGENTS.md ROADMAP.md spec/README.md .codex/skills` returned no matches.
- `git diff --check` passed.
- `pnpm install` was run outside the sandbox because dependencies were missing and validation needed `turbo`.
- `pnpm lint` passed outside the sandbox after sandboxed attempts failed with `[ERROR] fetch failed`.
- `pnpm test` passed outside the sandbox after sandboxed attempts failed with `[ERROR] fetch failed`.

## Known Gaps

- No product code change is expected from the harness migration.
- No product code change is expected from the spec flattening cleanup.
- No Playwright validation is expected unless implementation touches app UI.
- `pnpm test` emitted existing Vitest localStorage experimental warnings and Turbo output warnings; tests still passed.
- `node_modules/` was installed locally for validation and should remain ignored.

## Next Recommended Action

- Review the flattened `spec/` workspace and continue with `forge-shaper`, `forge-planner`, or `forge-architect` depending on the next task.
