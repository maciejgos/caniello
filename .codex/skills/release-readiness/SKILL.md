---
name: release-readiness
description: Assess whether validated implementation work is ready for human-approved merge, release, or deployment. Use when Codex is asked to prepare release readiness, summarize validation and CI/CD status, check approvals, review unresolved risks, confirm rollback notes, produce release evidence, or decide whether work can move from validation review to human release approval.
---

# Release Readiness

## Overview

Prepare a human release decision from validated implementation work. This skill gathers the final evidence trail, checks that required approvals and gates are present, highlights unresolved risks, and recommends whether the work is ready for human-approved merge, release, or deployment.

## Operating Principles

- Never self-approve release, merge, deployment, validation, or lifecycle checkpoint completion.
- Treat release readiness as advisory; only a human can approve release.
- Start from validation evidence, not implementation claims.
- Preserve traceability back to requirements, features, stories, designs, ADRs, ExecPlans, validation artifacts, and changed files.
- Do not hide failed, skipped, unavailable, flaky, or manually performed checks.
- Require explicit human approval for destructive operations, production deployments, irreversible migrations, customer-visible launches, or external communications.
- Prefer a conservative recommendation when evidence is incomplete.

## Workflow

1. Inspect context.
   Read `README.md`, `AGENTS.md`, relevant validation artifacts under `spec/validation/`, the ExecPlan, and linked requirements, features, stories, designs, and ADRs. Inspect current branch state and changed files with `git status --short`.

2. Confirm release scope.
   Define what is being considered for release: a story, feature, milestone, branch, pull request, deployment candidate, documentation update, or configuration change.

3. Gather readiness evidence.
   Summarize validation results, test commands, CI/CD status when available, Playwright screenshots for UI work, security review notes, quality gate notes, implementation review notes, and unresolved follow-ups.

4. Check approval state.
   Verify which human checkpoints were explicitly approved and which remain pending. Do not treat Codex or subagent readiness judgments as approval.

5. Check release risks.
   Identify unresolved product, architecture, security, privacy, data, migration, operational, rollback, observability, performance, or support risks. State whether each risk blocks release, requires human acceptance, or can become follow-up work.

6. Check rollback and recovery.
   For deployment or customer-visible changes, confirm there is a rollback or recovery path. If no runtime exists yet, record that rollback is not applicable. If rollback is required but missing, mark release readiness as blocked.

7. Draft release readiness summary.
   Use a concise Markdown summary in the response or create/update a focused release-readiness artifact under `spec/release-readiness/` if durable evidence is needed. Do not create release notes, tags, deployments, or PR actions unless the user explicitly asks.

8. Recommend subagent review when risk warrants it.
   If the user explicitly asks for subagents, parallel review, or independent validation, use `release_readiness_reviewer` for final readiness, `validation_gate_reviewer` for validation evidence, `security_reviewer` for security-sensitive releases, `quality_gate_reviewer` for test/build/lint quality, and `implementation_reviewer` for plan-to-implementation alignment.

## Release Quality Bar

A release-readiness review should answer:

- What exactly is being considered for release?
- Which source artifacts justify the release?
- Which human checkpoints are approved and which are pending?
- Which checks passed, failed, were skipped, or could not run?
- What CI/CD status exists, and what gates are still manual or future work?
- What security, privacy, data, architecture, or operational risks remain?
- What rollback or recovery path exists?
- What follow-up work is known?
- Is the work ready for human release approval?

## Readiness States

Use these advisory states:

- `Ready for human release approval`: evidence is complete enough for a human release decision.
- `Ready with accepted risks`: evidence is mostly complete, but named risks require explicit human acceptance.
- `Blocked`: missing approval, failed validation, unresolved release risk, missing rollback, or incomplete evidence prevents release.
- `Not applicable`: release readiness does not apply to the current change, such as early specification-only work.

These states are advisory only and must not be treated as release approval.

## Human Checkpoint

End release-readiness work by asking the human to approve or revise:

- Release scope
- Validation evidence
- CI/CD and manual gate status
- Security, quality, architecture, and implementation review results
- Rollback or recovery plan
- Accepted risks and follow-up work
- Whether to merge, release, deploy, defer, or return to an earlier PDLC stage

Codex and subagents may recommend readiness, but must not merge, release, deploy, tag, announce, or mark release complete without explicit human approval.

When the human approves release and there is post-release evidence, incident data, feedback, metrics, or follow-up learning to capture, use the `lifecycle-retrospective` skill.

## Output Pattern

When completing release-readiness review, provide:

- Release scope.
- Source requirement, feature, story, design, ADR, ExecPlan, validation, and implementation paths used.
- Human checkpoint status.
- Validation and CI/CD summary.
- Security, quality, architecture, and implementation review notes.
- Rollback or recovery notes.
- Blocking issues and accepted-risk candidates.
- Advisory readiness state.
- The human approval checkpoint and recommended next action.
