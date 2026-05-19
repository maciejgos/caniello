# Release Readiness

Use this directory for advisory release, merge, or deployment readiness records after validation review and before lifecycle retrospective.

Release-readiness artifacts summarize scope, human checkpoint state, validation and CI/CD evidence, review notes, unresolved risks, rollback or recovery notes, and the recommended next action for a human release decision.

Create one file per active release candidate, merge candidate, deployment candidate, or release-readiness review using `TEMPLATE.md`. Consolidate old per-fix readiness records into a history file once they are no longer the current release decision.

Release readiness is not approval. Codex and subagents may recommend readiness, but only a human can approve, merge, release, deploy, tag, announce, or mark release complete.

Current rollups:

- `landing-page-release-readiness-history.md`: consolidated landing-page release-readiness trail.
