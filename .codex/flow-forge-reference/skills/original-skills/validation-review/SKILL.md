---
name: validation-review
description: Review implemented work against requirements, features, stories, design, ADRs, ExecPlans, tests, UI evidence, and lifecycle gates. Use when Codex is asked to validate completed implementation, create or update spec/validation artifacts, assess acceptance criteria, review Playwright screenshots, summarize test evidence, identify validation gaps, or prepare work for human acceptance before release readiness.
---

# Validation Review

## Overview

Turn implementation evidence into a clear validation record. This skill checks whether completed work satisfies the approved PDLC artifacts and whether the validation evidence is strong enough for a human acceptance decision.

## Operating Principles

- Validate against approved source artifacts, not against the implementation alone.
- Never self-approve validation, acceptance, release, or lifecycle checkpoints.
- Treat missing evidence as a gap, not as a pass.
- Separate what was checked manually, what was checked automatically, and what still needs future tooling.
- Preserve traceability from validation evidence back to requirements, features, stories, design, ADRs, and ExecPlans.
- Include Playwright screenshots and browser evidence for UI behavior when applicable.
- Record failures, skipped checks, risks, and follow-up work plainly.
- Do not release, merge, deploy, or mark acceptance complete unless a human explicitly approves.

## Workflow

1. Inspect context.
   Read `README.md`, `AGENTS.md`, `spec/validation/TEMPLATE.md`, the relevant ExecPlan, and all source artifacts linked by the implementation. Inspect changed files and available test or CI outputs when they exist.

2. Identify validation scope.
   Define exactly what is being validated: a requirement, feature, story, design, ExecPlan milestone, implementation change, UI flow, API behavior, CI/CD gate, or release candidate.

3. Collect evidence.
   Gather validation evidence from available commands, manual checks, screenshots, logs, review comments, or existing CI output. Include command names and concise outcomes. If a check cannot run, record why.

4. Map evidence to acceptance criteria.
   For each relevant acceptance criterion, state whether the evidence supports it, partially supports it, fails it, or is missing. Do not infer acceptance from unrelated passing checks.

5. Validate UI behavior when applicable.
   For browser UI changes, use Playwright evidence from implementation or run Playwright when available and authorized. Include screenshots as reference evidence when they help prove layout, behavior, responsiveness, or regression status. If Playwright is unavailable, record the missing setup and the future check needed.

6. Review continuous gate readiness.
   Identify which checks should become CI/CD or continuous lifecycle gates. Separate checks that can exist now from checks that require future product tooling, infrastructure, secrets, environments, or deployment targets.

7. Draft or update the validation artifact.
   Use `spec/validation/TEMPLATE.md` as the structure. Create or update one focused Markdown file under `spec/validation/` using a kebab-case filename, such as `pdlc-artifact-flow-validation.md` or `implementation-execution-validation.md`.

8. Record result without self-approval.
   Use `Pending`, `Blocked`, `Failed`, or `Ready for human review` as the validation result unless the human explicitly instructs otherwise. Do not mark validation as accepted or complete yourself.

9. Recommend subagent review when risk warrants it.
   If the user explicitly asks for subagents, parallel review, or independent validation, use `validation_gate_reviewer` for validation coverage and CI/CD gate readiness, `implementation_reviewer` for implementation-to-plan alignment, `security_reviewer` for security-sensitive changes, `quality_gate_reviewer` for code quality and test quality, and `architecture_decision_reviewer` for architecture drift.

## Validation Quality Bar

A validation review should answer:

- What exact work or artifact is being validated?
- Which source requirements, features, stories, designs, ADRs, and ExecPlans apply?
- What checks were run or inspected?
- What evidence proves each acceptance criterion?
- What failed, was skipped, or could not be checked?
- Which checks should become CI/CD gates later?
- What risks remain before human acceptance?
- What follow-up work is required?

## Evidence Categories

Use these categories when relevant:

- Artifact evidence: required sections, links, naming, status values, and traceability across PDLC files.
- Behavior evidence: manual flows, API responses, CLI output, screenshots, or user-visible behavior.
- Automated evidence: lint, typecheck, build, unit tests, integration tests, end-to-end tests, and CI results.
- UI evidence: Playwright traces, screenshots, viewport checks, console output, and network observations.
- Security evidence: permission checks, secret handling, data handling, dependency review, and abuse-case checks.
- Operational evidence: deployment checks, rollback notes, observability, alerting, performance, and failure-mode checks.

## Continuous Gate Guidance

For every validation review, identify likely future gates:

- Required artifact structure checks for Markdown specs.
- Link and traceability checks across requirements, features, stories, designs, ADRs, plans, and validation files.
- Status and human approval checks to prevent self-approval.
- Lint, typecheck, build, unit, integration, and end-to-end checks once tooling exists.
- Playwright checks for browser UI flows.
- Security and dependency checks for implementation changes.
- Release-readiness checks for unresolved risks, failed validation, and missing human approval.

## Human Checkpoint

End validation-review work by asking the human to approve or revise:

- Validation scope
- Evidence collected
- Acceptance-criteria mapping
- Failed, skipped, or missing checks
- Recommended CI/CD or continuous lifecycle gates
- Follow-up work
- Whether the work is accepted or should move to release readiness

Codex and subagents may recommend readiness, but must not mark validation accepted, complete, released, or merged without explicit human approval.

When the human accepts validation and asks to prepare release, use the `release-readiness` skill.

## Output Pattern

When completing validation review, provide:

- The validation file path.
- Source requirement, feature, story, design, ADR, ExecPlan, and implementation paths used.
- Checks run or inspected.
- Evidence summary.
- Missing or failed validation.
- Recommended future CI/CD gates.
- The human approval checkpoint and recommended next action.
