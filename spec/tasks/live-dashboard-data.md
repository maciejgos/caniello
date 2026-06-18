# Task: Live dashboard data

## Goal

Replace demonstration dashboard content with owner-scoped pet profile, reminder, document, timeline, and sharing data so the signed-in home screen reflects saved records only.

## Roadmap Alignment

Phase: Now

Why this belongs here:

The dashboard is the entry point to the existing MVP profile, reminders, documents, timeline, and controlled-sharing features. Showing saved owner data supports self-guided activation and trust without adding a new product capability.

Related roadmap item:

`spec/roadmap.md` - Now / owner can create and manage a pet profile, reminders, documents, and trusted sharing.

## Scope

- Load reminders, documents, timeline events, and share-link state through the existing authenticated API routes when a saved first pet opens the dashboard.
- Render `What's next` from active or suggested reminders ordered by due date.
- Render recent documents and care timeline panels from saved records ordered by record date.
- Keep the health summary derived from the saved pet profile.
- Derive sharing and tip banners from current saved data.
- Replace the simulated Ask Caniello prompt and suggestions with an honest unavailable state and navigation to the Ask Caniello section.
- Add localized loading, empty, and recoverable error states without falling back to sample records.
- Add focused UI tests and desktop/mobile browser validation.

## Non-Goals

- A new aggregate dashboard API, database migration, contract, service layer, or direct Supabase access from UI components.
- AI answers, symptom checking, diagnosis, treatment guidance, document extraction, or generated summaries.
- Notification delivery, recurrence, calendar sync, automatic timeline generation, or automatic document/reminder creation.
- Multi-pet switching, account-name aggregation, pet photography, analytics, marketplace, clinic, booking, or payment behavior.
- Changes to the underlying reminder, document, timeline, or share-link CRUD behavior.

## Acceptance Criteria

- No dashboard card, row, timeline entry, sharing status, tip, or Ask suggestion presents a fabricated pet record.
- Upcoming cards show saved active/suggested reminders in due-date order and have a clear empty state.
- Recent documents and timeline panels show saved records in descending record-date order and have clear empty states.
- Health values come from the active saved pet profile.
- Sharing status reflects whether an active, unexpired share link exists.
- Ask Caniello clearly states that answers are unavailable and routes owners to its dedicated section instead of simulating answers or unexpectedly opening another feature.
- API loading or failure states remain honest and recoverable; failed requests do not reveal stale demonstration content.
- Focused tests cover populated, empty, loading/failure, ordering, sharing, and navigation behavior.
- Desktop and mobile checks show no overlap, horizontal overflow, console errors, or visible framework error overlay.

## Implementation Notes

- Likely files: `ReturningOwnerDashboard.tsx`, a feature-local dashboard data hook/helper, `AppHomeDashboard.tsx`, `content.ts`, and `AccountApp.test.tsx`.
- Reuse `RemindersApiResponse`, `DocumentsApiResponse`, `TimelineEventsApiResponse`, and `ShareLinksApiResponse`.
- Use parallel client requests after the active pet is known. Keep the implementation feature-local and direct.
- Treat revoked or expired share links as inactive.
- Follow `DESIGN.md` and preserve the region order of `spec/design/visual-artifacts/mvp/image 1.png`.

## Architecture Decisions

- Existing ADRs: `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`, `spec/architecture-records/0015-use-supabase-data-lifecycle-and-rls.md`, `spec/architecture-records/0027-use-first-pet-mvp-scope-and-defer-multi-pet-management.md`, `spec/architecture-records/0028-use-feature-local-vertical-slices-with-explicit-shared-package-graduation.md`.
- New ADR needed: No.
- ADR draft: None.
- Approval state: Not needed; the task reuses accepted boundaries and existing APIs.

## Verification

- [x] Focused dashboard tests.
- [x] Full web tests, TypeScript validation, production build, formatting, and spec-alignment gate.
- [x] Desktop and mobile browser checks with populated and empty regions.
- [x] No roadmap scope expansion.
- [x] Validation artifact and handoff updated.

## Handoff Notes

Implementation validation passed on branch `codex/live-dashboard-data`; evaluator verdict: Pass.

The dashboard now loads existing reminder, document, timeline-event, and share-link APIs in parallel after the active first pet is known. Upcoming reminders, recent documents, timeline history, sharing status, health values, and contextual tips are derived from saved data. Empty and failure states never fall back to sample records. Ask Caniello is explicitly unavailable and links to its dedicated section.

Validation artifact: `spec/validation/live-dashboard-data-evaluation.md`.

Checks passed:

- Focused `AccountApp.test.tsx`: 20 tests.
- Full web suite: 113 passed; 5 existing opt-in live tests skipped.
- Web TypeScript validation.
- Production build.
- Changed-file formatting.
- Spec-alignment gate after evidence updates.
- `git diff --check`.
- In-app Browser at 1440x900 and 390x900 using the seeded owner: saved reminders and document rendered, empty timeline and inactive sharing states rendered, no demonstration strings, no console warnings/errors, no visible framework overlay, and no horizontal overflow.

Evaluator verdict: Pass. No merge, release, deployment, production-readiness state, AI answers, new API, migration, multi-pet expansion, or roadmap movement is approved.
