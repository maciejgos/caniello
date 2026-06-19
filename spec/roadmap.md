# Caniello Roadmap

This roadmap is the active lightweight prioritization filter for Caniello. It answers whether a task should exist now. It does not replace human approval for scope changes, release decisions, or durable product direction.

## Now - MVP Foundation

Goal: build a focused pet health organization utility that is useful before Caniello becomes a platform.

Outcomes:

- Owner can create and manage a pet profile.
- Owner can store key health information.
- Owner can add care reminders.
- Owner can upload or store important documents.
- Owner can share a care card, share link, or PDF-style summary when approved for implementation.
- Owner-facing account, privacy, consent, and language behavior are reliable enough for MVP validation.

Success signals:

- User can onboard without help.
- User creates at least one pet profile.
- User creates at least one reminder or document.
- Thin MVP activation is above 50%.
- Landing or acquisition funnel evidence remains above the validation threshold for relevant traffic.

Allowed scope:

- pet profile;
- health records;
- reminders;
- document vault;
- trusted sharing or export;
- owner account, privacy, consent, and localization foundations;
- local development, CI, validation, and platform reliability needed to build and verify the MVP.

Current MVP validation recovery evidence:

The 2026-06-13 readiness pass supports seeded-owner internal validation, but manual validation narrowed broader readiness until the following `Now` tasks are resolved or explicitly waived. These tasks do not approve release, deployment, merge, or scope expansion; they make the next validation pass executable.

Implementation for visible MVP surfaces should follow `spec/design/visual-artifacts/mvp/*.png` 1:1. Intentional deviations require an explicit note and human approval before the affected task can count as readiness evidence.

Resolved readiness checkpoints:

- Readiness baseline and next-pass script are preserved in `spec/tasks/mvp-readiness-baseline-and-script.md`.
- Document upload scope decision is resolved by accepted ADR 0025 and recorded in `spec/tasks/document-upload-scope-decision.md`; remaining work is the real upload implementation task below.
- New-owner local email/password validation and honest unavailable OAuth states are implemented and merged through `spec/tasks/new-owner-access-validation.md` (ADRs 0014, 0023 draft boundary, 0032).
- Dashboard/app-shell active-pet alignment and live saved-data rendering are implemented and merged through `spec/tasks/dashboard-mockup-and-active-pet-alignment.md`, `spec/tasks/live-dashboard-data.md`, and `spec/tasks/app-annotation-followups.md` (ADRs 0011, 0012, 0027, 0028).
- Timeline history and upcoming-reminder layout alignment is implemented and merged through `spec/tasks/timeline-upcoming-reminders-alignment.md` (ADRs 0011, 0015, 0028).
- Account deletion request persistence and audit evidence are verified and merged through `spec/tasks/account-deletion-persistence-verification.md` (ADRs 0014, 0015, 0024, 0026, 0031).

Remaining MVP readiness implementation tasks:

- Refine the remaining pet/profile IA and sex-or-gender control gaps after removing scope already delivered by the active-pet and species-dropdown work: `spec/tasks/pet-profile-ia-and-controls.md` (ADRs 0014, 0015, 0027, 0028).
- Align Settings with the accepted MVP flow while preserving real consent and account deletion API/database behavior: `spec/tasks/settings-consent-and-account-deletion-alignment.md` (ADRs 0014, 0015, 0024, 0026, 0031).

Accepted architecture implementation backlog:

The 2026-06-14 architecture review accepted ADRs 0024 through 0032. The following `Now` tasks implement those decisions without approving release, deployment, public health-record upload, or scope expansion:

- Implement real Supabase Storage document upload within MVP limits: `spec/tasks/document-upload-storage-implementation.md` (ADRs 0024, 0025, 0028, 0030, 0031).
- Add the audit-log and product-event foundation for sensitive MVP actions: `spec/tasks/audit-product-event-foundation.md` (ADRs 0014, 0019, 0024, 0028).
- Create the manual data-rights operations runbook for export and deletion requests: `spec/tasks/data-rights-manual-runbook.md` (ADRs 0015, 0024, 0025, 0026, 0031).
- Harden share-link lifecycle with access logging and operational revocation notes: `spec/tasks/share-link-lifecycle-hardening.md` (ADRs 0017, 0024, 0025, 0029).
- Make live RLS tests use disposable validation fixtures instead of seeded demo rows: `spec/tasks/live-rls-fixture-isolation.md` (ADRs 0015, 0028, 0030).
- Create the release-readiness playbook required before public health-record upload: `spec/tasks/public-health-upload-release-readiness-playbook.md` (ADRs 0019, 0024, 0025, 0026, 0029, 0031, 0032).
- Add lightweight dependency guardrails for sensitive feature boundaries: `spec/tasks/feature-boundary-dependency-guardrails.md` (ADRs 0011, 0028).

## Next - Retention and Sharing

Goal: prove repeat usage and trusted sharing after the owner-side foundation works.

Outcomes:

- Owner returns to update records.
- Family or caregiver can access shared information.
- Reminders create repeat value.
- Sharing behavior can be observed without expanding into provider workflow ownership.

Success signals:

- D30 retention above 25%.
- Weekly active owners above 20% among activated users.
- Shared care information is viewed or used by at least one trusted recipient segment.

## Later - AI-Assisted Context and Partner Learning

Goal: add AI and partner-facing capabilities only after enough trustworthy pet context and owner behavior exist.

Allowed scope:

- document extraction;
- care summaries grounded in user-owned records;
- reminder suggestions;
- owner-facing organization assistance;
- lightweight partner interest learning.

AI and partner work must preserve medical-safety, privacy, and owner-control boundaries.

## Not Now

Do not implement without explicit human approval and a roadmap update:

- marketplace mechanics;
- full booking and payments;
- payments-first monetization flows;
- clinic SaaS, PIMS, or EHR integrations;
- broad clinic portals or partner workflow ownership;
- AI symptom checking, AI diagnosis, treatment recommendations, or veterinary decision-making;
- veterinary replacement claims, including claims that Caniello replaces an authorized veterinarian;
- official EU pet passport replacement claims;
- complex partner integrations;
- advanced multi-role care teams, family plans, or complex household permissions beyond private owner data and controlled sharing;
- advanced analytics, referral mechanics, duplicate detection, calendar sync, or partner document-upload flows unless approved for a specific validation task;
- broad back-office systems beyond approved MVP support needs.

## Governance

Codex may suggest roadmap updates, identify drift, and record recommendations in `spec/handoff.md`.

Codex must not silently move work into `Now`, remove non-goals, expand MVP scope, or mark roadmap changes approved.
