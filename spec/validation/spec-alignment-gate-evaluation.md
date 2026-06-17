# Validation: Spec Alignment Gate

## Status

Accepted

## Scope

Validate `spec/tasks/spec-alignment-gate.md`: implementation-bearing changes must carry scoped task and validation evidence so CI protects the lightweight Caniello spec workflow without pretending to perform semantic product review.

## Source Artifacts

- `spec/tasks/spec-alignment-gate.md`
- `scripts/spec-alignment-gate.mjs`
- `package.json`
- `.github/workflows/ci.yml`
- `spec/product-context.md`
- `spec/roadmap.md`

## Preconditions

- Current branch is `feature/spec-alignment-gate`.
- Base branch reference is `origin/mvp-implementation`.
- The repository has the existing lifecycle, hygiene, validation, build, and E2E workflow split.

## Acceptance Criteria Mapping

- Criterion: `pnpm validation:spec-alignment` runs the spec alignment gate.
  Evidence status: Supported
  Evidence: `package.json` exposes `validation:spec-alignment`, and the command passed locally.

- Criterion: GitHub Actions runs the spec alignment gate in the validation job with base/head diff inputs.
  Evidence status: Supported
  Evidence: `.github/workflows/ci.yml` runs `pnpm validation:spec-alignment` with `SPEC_GATE_BASE` and `SPEC_GATE_HEAD`.

- Criterion: The gate passes for this scoped gate implementation when the task and validation artifacts are present.
  Evidence status: Supported
  Evidence: `SPEC_GATE_FILES=.github/workflows/ci.yml,package.json,scripts/spec-alignment-gate.mjs,spec/tasks/spec-alignment-gate.md,spec/validation/spec-alignment-gate-evaluation.md node scripts/spec-alignment-gate.mjs` passed.

- Criterion: The gate fails when project-affecting files change without a task artifact.
  Evidence status: Supported
  Evidence: `SPEC_GATE_FILES=package.json node scripts/spec-alignment-gate.mjs` failed with the expected missing-task and missing-validation messages.

- Criterion: The gate fails when a changed task artifact still contains template placeholders or lacks completed verification evidence.
  Evidence status: Supported
  Evidence: A temporary local fixture `spec/tasks/spec-alignment-placeholder-fixture.md` failed with the expected placeholder, missing completed verification, and missing validation evidence messages, then was removed.

## Checks

- Check: Current branch diff gate
  Type: Automated
  Status: Passed
  Expected result: Gate passes with project files, task artifact, and validation artifact present.
  Actual result: Passed with an explicit `SPEC_GATE_FILES` fixture containing the CI workflow, package script, gate script, task artifact, and validation artifact.

- Check: Original committed gate review
  Type: Automated
  Status: Failed
  Expected result: Mistral's original committed gate should either pass with sufficient evidence or expose missing evidence.
  Actual result: `SPEC_GATE_BASE=origin/mvp-implementation SPEC_GATE_HEAD=HEAD node scripts/spec-alignment-gate.mjs` failed because the committed branch changed project files without a task or validation artifact. This was fixed in the working tree by adding `spec/tasks/spec-alignment-gate.md` and this validation artifact.

- Check: Missing task negative fixture
  Type: Automated
  Status: Passed
  Expected result: Gate fails when only `package.json` is supplied as changed.
  Actual result: Failed as expected and reported that project-affecting changes require a changed `spec/tasks/*.md` file and validation evidence.

- Check: Package script
  Type: Automated
  Status: Passed
  Expected result: `pnpm validation:spec-alignment` executes the gate.
  Actual result: Passed.

- Check: Existing lifecycle and hygiene gates
  Type: Automated
  Status: Passed
  Expected result: New task and validation artifacts do not violate existing governance or hygiene gates.
  Actual result: `node scripts/pdlc-lifecycle-gate.mjs` and `node scripts/repo-hygiene-gate.mjs` passed.

- Check: Formatting and diff hygiene
  Type: Automated
  Status: Passed
  Expected result: Changed files are formatted and contain no whitespace errors.
  Actual result: `pnpm format:check` and `git diff --check` passed.

## Evidence

Automated validation passed:

- `SPEC_GATE_FILES=.github/workflows/ci.yml,package.json,scripts/spec-alignment-gate.mjs,spec/tasks/spec-alignment-gate.md,spec/validation/spec-alignment-gate-evaluation.md node scripts/spec-alignment-gate.mjs`
- `SPEC_GATE_FILES=package.json node scripts/spec-alignment-gate.mjs` failed as expected for the negative fixture.
- Temporary `SPEC_GATE_FILES=package.json,spec/tasks/spec-alignment-placeholder-fixture.md node scripts/spec-alignment-gate.mjs` failed as expected for placeholder and incomplete-verification evidence, then the fixture file was removed.
- `pnpm validation:spec-alignment`
- `node scripts/pdlc-lifecycle-gate.mjs`
- `node scripts/repo-hygiene-gate.mjs`
- `pnpm format:check`
- `git diff --check`

Review finding from Mistral's original committed version:

- `SPEC_GATE_BASE=origin/mvp-implementation SPEC_GATE_HEAD=HEAD node scripts/spec-alignment-gate.mjs` failed before the repair because the branch added `.github/workflows/ci.yml`, `package.json`, and `scripts/spec-alignment-gate.mjs` without a changed task or validation artifact.

## Missing, Skipped, or Unavailable Checks

- Check: UI/browser validation
  Reason: This task changes CI/tooling and spec artifacts only.
  Risk: Low; no visible UI or browser behavior changed.

- Check: Full workspace build/test suite
  Reason: The change is a dependency-free Node gate and CI wiring update. Focused script behavior, existing governance gates, formatting, and diff hygiene were run.
  Risk: Low; no runtime application code changed.

## Future CI/CD or Lifecycle Gates

- Gate: Semantic acceptance review
  Trigger: Human or Forge evaluator review for each implementation task.
  Blocks: Human acceptance or PR readiness recommendations when acceptance evidence is missing.

## Result

Ready for human review

Evaluator verdict: Pass

The implemented gate is deterministic, scoped to task/evidence presence, and avoids brittle keyword scanning as the primary source of truth. It supports, but does not replace, human and Forge evaluator review.

## Follow-Up

- Consider adding dedicated unit tests for gate helper functions if the script grows beyond this small deterministic contract.
- Consider requiring validation artifacts, not only task handoff validation notes, after the team decides that every implementation PR must include an evaluator artifact.

## Human Decision

Accepted by human on 2026-06-17.

The human accepted the spec-alignment gate validation artifacts. This does not approve, merge, release, deploy, mark release checkpoints complete, or move roadmap scope.
