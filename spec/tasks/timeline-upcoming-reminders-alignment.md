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
- Decide and document whether completing a reminder should create/link a timeline event now or remain deferred.

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
- Any deferred automation is explicitly stated in UI copy or validation notes.

## Implementation Notes

- Relevant existing tasks: `spec/tasks/care-timeline-foundation.md` and `spec/tasks/care-reminder-foundation.md`.
- Likely files: `CareTimelineSection`, reminder API usage, account content, and `AccountApp` tests.
- Avoid broad cross-feature service layers; use existing API/client patterns.

## Architecture Decisions

- Existing ADRs: `spec/architecture-records/0011-use-pragmatic-engineering-practices-from-mvp-start.md`, `spec/architecture-records/0015-use-supabase-data-lifecycle-and-rls.md`.
- New ADR needed: No unless automatic cross-record creation is introduced.
- ADR draft: None.
- Approval state: Not needed for display-only alignment; approval needed for automatic timeline generation.

## Verification

- [ ] Focused timeline/reminder tests.
- [ ] Browser validation against `image 10.png` at desktop and mobile widths.
- [ ] No reminder notification or automation scope expansion.
- [ ] Handoff updated.

## Handoff Notes

Update after implementation or evaluation.
