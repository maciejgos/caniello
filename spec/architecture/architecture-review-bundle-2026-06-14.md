# Architecture Note: Review bundle for MVP architecture gaps

## Question

Which missing Caniello MVP architecture decisions should be reviewed together before implementing the next recovery tasks?

## Context

The current accepted architecture covers the core stack and platform decisions. The remaining gaps are mostly operational, lifecycle, security, validation, and scope-boundary decisions needed before broader owner validation and before public health-record upload.

This bundle is intentionally limited to MVP-relevant architecture. It does not approve implementation, release, deployment, roadmap movement, mobile build-out, AI extraction, marketplace, clinic tooling, or broad partner workflows.

## Options

- Review each architecture gap only when a task reaches it.
- Review one bundle of draft ADRs now, then let future tasks depend only on the approved decisions.

## Recommendation

Accepted by the human on 2026-06-14:

- `spec/architecture-records/0024-separate-audit-logs-from-product-events.md`
- `spec/architecture-records/0025-use-supabase-storage-for-mvp-document-upload.md`
- `spec/architecture-records/0026-use-manual-data-rights-runbook-before-automated-account-lifecycle.md`
- `spec/architecture-records/0027-use-first-pet-mvp-scope-and-defer-multi-pet-management.md`
- `spec/architecture-records/0028-use-feature-local-vertical-slices-with-explicit-shared-package-graduation.md`
- `spec/architecture-records/0029-strengthen-scoped-share-link-lifecycle-before-caregiver-accounts.md`
- `spec/architecture-records/0030-use-disposable-validation-fixtures-for-live-rls-tests.md`
- `spec/architecture-records/0031-require-release-readiness-playbook-before-public-health-record-upload.md`
- `spec/architecture-records/0032-use-email-first-owner-auth-and-defer-oauth-rollout.md`

Together, these accepted decisions cover the remaining MVP architecture gaps identified in `spec/architecture/current-architecture-gap-assessment-2026-06-13.md`.

## ADR Trigger

This note should not become an ADR. It is a review index for draft decisions.

## Open Questions

- Which accepted ADR should be implemented first?
- Should implementation begin with document upload, new-owner access, or first-pet/dashboard alignment?
- Should audit/product-event work be implemented as a standalone foundation task or alongside each sensitive feature task?

## Related Artifacts

- `spec/architecture/current-architecture-gap-assessment-2026-06-13.md`
- `spec/product-context.md`
- `spec/roadmap.md`
- `spec/features/mvp-validation-readiness-recovery.md`
- `spec/tasks/document-upload-scope-decision.md`
- `spec/tasks/new-owner-access-validation.md`
- `spec/tasks/pet-profile-ia-and-controls.md`
- `spec/tasks/account-deletion-persistence-verification.md`
