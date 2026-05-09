# Validation: Governance Template Updates

## Status

Draft

## Scope

Validate the documentation-only updates that strengthen validation artifacts, add traceability fields across PDLC templates, and add lightweight governance checks.

## Source Artifacts

- `README.md`
- `AGENTS.md`
- `.codex/rules/default.rules`
- `.codex/skills/release-readiness/SKILL.md`
- `spec/requirements/TEMPLATE.md`
- `spec/features/TEMPLATE.md`
- `spec/stories/TEMPLATE.md`
- `spec/design/TEMPLATE.md`
- `spec/architecture-records/TEMPLATE.md`
- `spec/validation/TEMPLATE.md`
- `spec/release-readiness/TEMPLATE.md`
- `spec/lifecycle/TEMPLATE.md`

## Preconditions

The repository has no committed product runtime, package manager, lint command, or test command. Validation is limited to artifact structure, text inspection, and repository search.

## Acceptance Criteria Mapping

- Criterion: Validation artifacts distinguish passed, failed, skipped, unavailable, manual, and future-gate checks.
  Evidence status: Supported
  Evidence: `spec/validation/TEMPLATE.md` includes check `Status` values for `Passed`, `Failed`, `Skipped`, `Unavailable`, `Manual`, and `Future Gate`.

- Criterion: PDLC templates include explicit traceability fields.
  Evidence status: Supported
  Evidence: Requirements, features, stories, designs, ADRs, validation, release-readiness, and lifecycle templates include `Source Artifacts`, `Related Artifacts`, or equivalent source-link sections.

- Criterion: Lightweight governance checks exist and preserve the no-self-approval policy.
  Evidence status: Supported
  Evidence: `.codex/rules/default.rules` includes Draft status, explicit human approval, traceability, validation-state, release-readiness, and `spec/plans/PLANS.md` exception guidance.

## Checks

- Check: Inspect changed files with `git diff --stat`.
  Type: Artifact
  Status: Passed
  Expected result: Only documentation, template, skill guidance, rule, and validation files changed.
  Actual result: Diff shows Markdown/rules changes only; no `src/`, `tests/`, runtime, or CI files changed.

- Check: Search for traceability, release-readiness, validation gate, human decision, and `PLANS.md` guidance.
  Type: Artifact
  Status: Passed
  Expected result: Repository references point to the intended artifact homes and preserve the `spec/plans/PLANS.md` exception.
  Actual result: `rg "Source Artifacts|Related Artifacts|release-readiness|Future CI/CD|Human Decision|explicit human approval|PLANS.md" spec .codex README.md AGENTS.md` returned matching guidance in the updated files.

- Check: Inspect validation result and human decision wording.
  Type: Manual
  Status: Passed
  Expected result: Validation remains advisory and does not mark work accepted or complete.
  Actual result: `spec/validation/TEMPLATE.md` uses `Pending`, `Blocked`, `Failed`, or `Ready for human review`; `Human Decision` remains `Pending` until explicit human approval.

## Evidence

- `git diff --stat` showed 11 files changed with documentation-only updates before this validation artifact was added.
- Repository search confirmed release-readiness artifacts point to `spec/release-readiness/` and validation artifacts distinguish unavailable, skipped, manual, and future-gate checks.

## Missing, Skipped, or Unavailable Checks

- Check: Product build, lint, unit, integration, and end-to-end tests.
  Reason: No package manager, product runtime, or executable test command is committed.
  Risk: Low for this documentation-only change; future product implementation should add executable checks.

## Future CI/CD or Lifecycle Gates

- Gate: Markdown artifact structure check.
  Trigger: Pull requests that change files under `spec/`.
  Blocks: Missing required template sections, missing source links, or invalid status values.

- Gate: Governance policy check.
  Trigger: Pull requests that change PDLC artifacts.
  Blocks: Agent-authored approval, acceptance, release, deployment, merge, or closure language without explicit human approval evidence.

## Result

Ready for human review

Use `Pending`, `Blocked`, `Failed`, or `Ready for human review` unless a human explicitly instructs otherwise. Do not mark validation accepted or complete without explicit human approval.

## Follow-Up

Consider turning the artifact structure and governance policy checks into automated CI/CD gates after a project toolchain exists.

## Human Decision

Pending

Record the explicit human decision when provided. Do not mark validation accepted, complete, released, or merged without explicit human approval.
