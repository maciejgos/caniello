# Feature: Accepted architecture implementation backlog

## Source Notes

Human accepted the architecture review bundle on 2026-06-14. Accepted ADRs 0024 through 0032 define MVP boundaries for audit/product events, real Supabase Storage document upload, manual data-rights operations, first-pet scope, feature-local layering, share-link lifecycle, disposable live RLS fixtures, release readiness, and email-first auth.

## User Problem

Caniello has a clear architecture direction, but the repo needs task-sized implementation work so the accepted decisions become executable without broad scope creep.

## Outcome

The MVP roadmap has a concise implementation backlog for the accepted architecture decisions. Each task can be implemented and evaluated independently while preserving the owner-side MVP focus.

## Roadmap Alignment

Phase: Now

Why this belongs here:

The work protects the current MVP foundation: owner onboarding, pet records, reminders, document vault, trusted sharing, account/privacy behavior, validation reliability, and safe preparation for public health-record upload. It does not add marketplace, clinic SaaS, payments, broad partner workflows, AI diagnosis, or advanced household roles.

## Scope

- Turn accepted architecture decisions into implementation task files.
- Reuse existing recovery tasks where they already cover the accepted ADR.
- Add missing task files for document upload, audit/events, data-rights operations, share-link lifecycle, live RLS fixtures, release readiness, and dependency guardrails.
- Update the MVP roadmap with the implementation task list.

## Non-Goals

- Implementing product code.
- Creating mobile app behavior.
- Adding OCR, AI extraction, generated medical summaries, notification delivery, calendar sync, marketplace, booking, payments, clinic tooling, or partner uploads.
- Marking release, deployment, merge, public beta, or roadmap phase movement approved.

## Candidate Tasks

- `spec/tasks/document-upload-storage-implementation.md` - implements ADR 0025, constrained by ADRs 0024, 0028, 0030, and 0031.
- `spec/tasks/audit-product-event-foundation.md` - implements ADR 0024, constrained by ADRs 0014, 0019, and 0028.
- `spec/tasks/data-rights-manual-runbook.md` - implements ADR 0026, constrained by ADRs 0015, 0024, 0025, and 0031.
- `spec/tasks/share-link-lifecycle-hardening.md` - implements ADR 0029, constrained by ADRs 0017, 0024, and 0025.
- `spec/tasks/live-rls-fixture-isolation.md` - implements ADR 0030, constrained by ADRs 0015 and 0028.
- `spec/tasks/public-health-upload-release-readiness-playbook.md` - implements ADR 0031, constrained by ADRs 0019, 0024, 0025, 0026, 0029, and 0032.
- `spec/tasks/feature-boundary-dependency-guardrails.md` - implements ADR 0028, constrained by ADR 0011.
- Existing recovery task: `spec/tasks/new-owner-access-validation.md` - implements ADR 0032 for email-first MVP auth and unavailable OAuth affordances.
- Existing recovery task: `spec/tasks/pet-profile-ia-and-controls.md` - implements ADR 0027 for first-pet MVP scope and is constrained by ADR 0028.
- Existing recovery task: `spec/tasks/dashboard-mockup-and-active-pet-alignment.md` - implements ADR 0027 in the dashboard/app shell and is constrained by ADR 0028.
- Existing recovery task: `spec/tasks/account-deletion-persistence-verification.md` - supports ADR 0026 by verifying deletion-request persistence before manual data-rights operations.

## Open Questions

- Should implementation start with document upload, new-owner access, or first-pet/dashboard alignment?
- Should audit/product events be implemented before or during each sensitive feature task?
- Should dependency guardrails start as documentation and tests, or include mechanical lint rules immediately?

## Approval Notes

ADRs 0024 through 0032 were accepted by the human on 2026-06-14. Implementation still requires normal task-by-task validation. Production release, deployment, public health-record upload, and any intentional mockup deviation still require explicit human approval.
