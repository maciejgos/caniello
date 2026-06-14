# Task: Public health upload release-readiness playbook

## Goal

Create the production release-readiness playbook required before Caniello collects public health-record uploads.

## Roadmap Alignment

Phase: Now

Why this belongs here:

Real document upload and trusted sharing need a release safety gate before public beta health-record collection.

Related roadmap item:

`spec/roadmap.md` - Now / local development, CI, validation, and platform reliability needed to build and verify the MVP.

## Scope

- Document production environment inventory, secrets, deployment, rollback, Supabase project expectations, Storage bucket checks, RLS checks, backup expectations, share-link incident response, data-rights handling, audit evidence, support boundaries, and release approval checklist.
- Reference accepted ADRs and current validation artifacts.
- Clearly separate local task acceptance from public release approval.

## Non-Goals

- Deploying to production.
- Creating a public beta release.
- Implementing code, migrations, or monitoring integrations.
- Approving public health-record upload.

## Acceptance Criteria

- The playbook is discoverable under `spec/validation/`, `spec/operations/`, or another clear spec path.
- A fresh maintainer can use it as a release checklist before public uploads.
- It includes rollback and pause-traffic steps.
- It names what must be verified for document upload, sharing, data rights, audit, and privacy copy.
- It states that human release approval is still required.

## Implementation Notes

- Follow ADR 0031.
- Link ADRs 0024, 0025, 0026, 0029, and 0032.
- This is documentation-only unless it identifies a blocker requiring a separate implementation task.

## Architecture Decisions

- Existing ADRs: `0019`, `0024`, `0025`, `0026`, `0029`, `0031`, `0032`.
- New ADR needed: No.
- ADR draft: None.
- Approval state: ADRs accepted by human on 2026-06-14.

## Verification

- [ ] Tests run or explicitly recorded as unavailable.
- [ ] Manual validation completed when relevant.
- [ ] UI validated with Playwright/browser checks when relevant.
- [ ] No roadmap scope expansion.
- [ ] Handoff updated.

## Handoff Notes

Update after implementation or evaluation.
