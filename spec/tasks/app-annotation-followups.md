# Task: Authenticated app annotation follow-ups

## Goal

Resolve the remaining authenticated-app review annotations so visible controls and statuses communicate only behavior the MVP actually supports.

## Roadmap Alignment

Phase: Now

Why this belongs here:

The review findings affect the existing first-pet profile, timeline, and app-shell validation path. Correcting misleading controls and status language improves MVP usability and trust without adding new capabilities.

Related roadmap item:

`spec/roadmap.md` - Now / owner can create and manage a pet profile and store key health information reliably.

## Scope

- Show the neutral paw icon in authenticated active-pet contexts when no persisted pet-photo field exists.
- Remove the non-functional search and notification controls until those capabilities are implemented.
- Replace the free-text species field with a localized dog/cat/other dropdown while preserving existing saved values.
- Derive timeline status from the record date: future events are upcoming; current/past manual records are recorded rather than falsely completed.
- Add focused UI tests and rendered desktop/mobile verification.

## Non-Goals

- Pet-photo upload, storage, cropping, or schema changes.
- Search indexing, command palette behavior, global search, notification delivery, notification preferences, or unread-count persistence.
- Veterinary species taxonomy, breed database, or contract/database migrations.
- Timeline completion workflow, reminder-to-timeline automation, deletion, or notification delivery.
- Multi-pet switching or active-pet selection.

## Acceptance Criteria

- Authenticated active-pet contexts never display a demo pet photograph for a profile without a real photo field.
- Search and notification affordances do not appear as usable controls while their behavior is unavailable.
- Species is an accessible localized dropdown with dog, cat, and other options; an existing non-standard value remains visible and saveable.
- Future timeline records show an upcoming status, while current/past manual records show recorded/uploaded status rather than completed.
- Existing pet profile save/reload and timeline create/edit behavior remain covered.
- Desktop and mobile checks show no overlap, horizontal overflow, console errors, or framework overlay.

## Implementation Notes

- Likely files: `AppTopBar.tsx`, `PetProfileSection.tsx`, `CareTimelineSection.tsx`, `content.ts`, and `AccountApp.test.tsx`.
- Reuse the localized species values already used by onboarding.
- Keep API payloads and contracts unchanged.
- Use the local calendar date for status comparison so date-only records do not shift because of timezone conversion.

## Architecture Decisions

- Existing ADRs: `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`, `spec/architecture-records/0015-use-supabase-data-lifecycle-and-rls.md`, `spec/architecture-records/0027-use-first-pet-mvp-scope-and-defer-multi-pet-management.md`, `spec/architecture-records/0028-use-feature-local-vertical-slices-with-explicit-shared-package-graduation.md`.
- New ADR needed: No.
- ADR draft: None.
- Approval state: Not needed; this is a review correction within existing accepted boundaries.

## Verification

- [x] Focused account tests: 21 passed.
- [x] Full web tests: 114 passed; 5 existing opt-in tests skipped.
- [x] TypeScript, production build, direct changed-file formatting, and whitespace checks passed.
- [x] In-app Browser desktop/mobile interaction checks passed with no overflow, console warnings/errors, or visible framework overlay.
- [x] No roadmap scope expansion.
- [x] Validation artifact and handoff updated.
- [x] Spec alignment passed after durable task, evaluation, and handoff evidence was added.

Validation artifact: `spec/validation/app-annotation-followups-evaluation.md`.

Unavailable wrapper note: `node scripts/format-check-changed.mjs` could not verify the pinned pnpm release because registry access failed. The equivalent local Prettier check passed against every changed file.

## Handoff Notes

Implementation validation passed on `codex/app-annotation-followups`; evaluator verdict: Pass.

The authenticated shell and Timeline active-pet card now use a neutral paw icon instead of demo pet photography. Non-functional search and notification controls were removed. Species is a localized select that preserves existing unknown values. Timeline records derive `Upcoming`, `Recorded`, or `Uploaded` from local calendar date and event type.

Validation artifact: `spec/validation/app-annotation-followups-evaluation.md`.

Checks passed:

- Focused `AccountApp.test.tsx`: 21 tests.
- Full web suite: 114 passed; 5 existing opt-in live tests skipped.
- Web TypeScript validation and production build.
- Direct changed-file Prettier check and `git diff --check`.
- Spec-alignment gate after evidence updates.
- In-app Browser desktop and 390x900 checks with no horizontal overflow, console warnings/errors, or visible framework overlay.

Unavailable check: the format-wrapper script could not verify pnpm while registry access was unavailable; the equivalent repository-local Prettier command passed.

Evaluator verdict: Pass. Next action: publish a stacked draft PR against `codex/live-dashboard-data` and await maintainer review.
