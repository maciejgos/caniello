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

- `spec/tasks/document-upload-storage-implementation.md`
- `spec/tasks/audit-product-event-foundation.md`
- `spec/tasks/data-rights-manual-runbook.md`
- `spec/tasks/share-link-lifecycle-hardening.md`
- `spec/tasks/live-rls-fixture-isolation.md`
- `spec/tasks/public-health-upload-release-readiness-playbook.md`
- `spec/tasks/feature-boundary-dependency-guardrails.md`
- Existing: `spec/tasks/new-owner-access-validation.md`
- Existing: `spec/tasks/pet-profile-ia-and-controls.md`
- Existing: `spec/tasks/dashboard-mockup-and-active-pet-alignment.md`

## Open Questions

- Should implementation start with document upload, new-owner access, or first-pet/dashboard alignment?
- Should audit/product events be implemented before or during each sensitive feature task?
- Should dependency guardrails start as documentation and tests, or include mechanical lint rules immediately?

## Approval Notes

ADRs 0024 through 0032 were accepted by the human on 2026-06-14. Implementation still requires normal task-by-task validation. Production release, deployment, public health-record upload, and any intentional mockup deviation still require explicit human approval.
