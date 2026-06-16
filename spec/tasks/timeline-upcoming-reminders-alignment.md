# Task: Timeline upcoming reminders alignment

## Goal

Align the Timeline page with the MVP mockup by showing historical care events in the main timeline and upcoming reminders/actions in a right-side `Next Upcoming` panel.

## Roadmap Alignment

Phase: Now

Why this belongs here:

Timeline and reminders are both part of the MVP care-record experience. The task clarifies their relationship without adding notification delivery, recurrence, calendar sync, or AI automation.

Related roadmap item:

`spec/roadmap.md` - Now / owner can store key health information and add care reminders.

## Scope

- Use `spec/design/visual-artifacts/mvp/image 10.png` as the 1:1 implementation target for visible Timeline layout, controls, filters, right-rail cards, labels, and panel structure.
- Keep the main Timeline surface focused on chronological historical/completed care events.
- Add or align a right-side `Next Upcoming` panel that shows the next active reminder/action for the selected pet.
- Link the upcoming panel to the Reminders flow.
- Keep the existing manual timeline event form available without adding export, automatic timeline generation, or reminder-completion writes.
- Document that completing a reminder does not create or link a timeline event in this slice.

## Non-Goals

- Notification delivery, recurrence engine, snooze, calendar sync, or email reminders.
- Automatic timeline creation from documents, OCR, AI, or completed reminders unless explicitly approved.
- New provider, clinic, marketplace, booking, or payments behavior.

## Acceptance Criteria

- Timeline layout and copy reflect the mockup relationship between history and upcoming care.
- The implemented Timeline screen matches `spec/design/visual-artifacts/mvp/image 10.png` 1:1 where the mockup defines visible UI, or each deviation is explicitly documented and approved.
- Upcoming reminder/action content comes from existing reminder data where available.
- Empty states clearly explain when no upcoming reminder exists.
- Tests and browser checks cover desktop and mobile behavior.
- Manual timeline event create/edit behavior remains available and covered by focused tests.
- Reminder completion does not create timeline events, and that deferred automation is explicitly stated in UI copy or validation notes.

## Implementation Notes

- Relevant existing tasks: `spec/tasks/care-timeline-foundation.md` and `spec/tasks/care-reminder-foundation.md`.
- Likely files: `CareTimelineSection`, reminder API usage, account content, and `AccountApp` tests.
- Avoid broad cross-feature service layers; use existing API/client patterns.
- Follow ADR 0028 by keeping timeline/reminder coordination in feature-local helpers unless a shared contract or server boundary is genuinely needed.
- If completing a reminder creates or emits a durable timeline/product event, follow ADR 0024 and keep product events separate from audit logs.

## Architecture Decisions

- Existing ADRs: `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`, `spec/architecture-records/0015-use-supabase-data-lifecycle-and-rls.md`, `spec/architecture-records/0028-use-feature-local-vertical-slices-with-explicit-shared-package-graduation.md`.
- Conditional ADR: `spec/architecture-records/0024-separate-audit-logs-from-product-events.md` if implementation creates or emits durable product events from reminder completion.
- New ADR needed: No unless automatic cross-record creation is introduced.
- ADR draft: None.
- Approval state: Not needed for display-only alignment; approval needed for automatic timeline generation.

## Verification

- [x] Focused timeline/reminder tests.
- [x] Browser validation against `image 10.png` at desktop and mobile widths.
- [x] No reminder notification or automation scope expansion.
- [x] Handoff updated.

## Handoff Notes

Implemented on branch `codex/timeline-upcoming-reminders-alignment`.

Validation artifact: `spec/validation/timeline-upcoming-reminders-alignment-evaluation.md`.

Checks passed:

- `pnpm --filter web exec vitest run features/account/AccountApp.test.tsx` outside sandbox after sandbox `fetch failed`.
- `pnpm --filter web test`.
- `pnpm --filter web lint` outside sandbox after sandbox `fetch failed`.
- `pnpm build` outside sandbox after sandbox `fetch failed`.
- `git diff --check`.
- In-app Browser smoke with seeded owner `akowalska@example.com`: Timeline rendered at 1440x900 desktop and 390x900 mobile with mockup-style title, active-pet card, filter/export toolbar, vertical timeline rows, compact summary, `Next Upcoming`, no visible dev issue overlay, and zero horizontal overflow.

Evaluator verdict: Pass. The implementation remains display-only for reminder/timeline coordination: completing reminders still does not create timeline events, and no notifications, recurrence, calendar sync, export, OCR, AI, sharing, provider workflow, booking, payment, marketplace, or official passport behavior was added.
