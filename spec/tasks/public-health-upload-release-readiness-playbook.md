---
status: planned
roadmap: now
risk: high
adrs: [0019, 0024, 0025, 0026, 0029, 0031, 0032]
---

# Public health-upload release-readiness playbook

## User story

As a maintainer, I want one production checklist before public health-record uploads so that release approval is based on explicit operational evidence.

## Acceptance criteria

- The playbook covers environment, secrets, deployment, rollback, Storage, RLS, backups, sharing incidents, data rights, audit evidence, privacy copy, and support boundaries.
- It includes pause-traffic and rollback steps.
- Each check has an evidence expectation and owner.
- It clearly separates task completion from explicit human release approval.

## Constraints

- Documentation only: no deployment, public beta, migration, monitoring integration, or release approval.
- Keep the playbook concise and place it at a stable root or operational path approved during implementation.

## Verification

- Pending: tabletop review against document upload, sharing, data-rights, audit, and auth boundaries; link/reference check.
