---
status: planned
roadmap: now
risk: high
adrs: [0014, 0015, 0024, 0027, 0028]
---

# Pet history timeline source events

## User story

As a pet owner, I want the timeline to be a trustworthy, chronological history generated from care activity so that it records what happened without becoming a separate manual journal.

## Acceptance criteria

- The production timeline is read-only: its form, edit controls, and direct owner-created event behavior are removed.
- `GET /api/timeline-events` remains owner-authorized, while `POST` and `PUT` are unavailable.
- Immutable history entries are generated for pet-profile creation; changes to weight, microchip number, allergies, medication, or important notes; reminder completion; and document creation.
- Pet name, species, breed, birth date, and sex-or-gender corrections do not create history entries.
- Reminder creation, ordinary reminder edits, dismissal, and future reminders do not create historical entries.
- Completing a reminder records the actual completion date and time while preserving the planned due date and time as snapshot context.
- Upcoming reminders appear only in the explicitly labeled next-upcoming panel and never in the historical event list.
- Every generated entry records its origin, source type, source identifier, source version or idempotency key, exact `occurred_at` timestamp, and an immutable snapshot.
- Repeated or retried source mutations cannot create duplicate history entries.
- Later owner-confirmed document intake can use the same source-event model without bypassing owner confirmation.
- Existing manual timeline rows are linked only when exactly one reminder or document matches the same pet, compatible type, normalized title, and source date.
- Unmatched or ambiguous manual rows remain stored as `legacy` but are excluded from the production timeline.
- Owners can read history for their own pet but cannot directly create, update, or delete generated history rows; another owner cannot read or generate them.
- History rows are removed only through the approved pet or account data lifecycle.

## Dependencies

- Reminder completion, pet-profile, and document mutations must use one approved atomic source-event write pattern.
- Document creation must reflect the real storage-backed document lifecycle before public upload release.
- Migration, database functions, triggers, and RLS changes require explicit human approval before implementation.

## Constraints

- Do not implement a manual journal, medical advice, diagnosis, treatment recommendations, recurring-reminder occurrence generation, or notification delivery.
- History snapshots are immutable; later edits to a reminder, document, or profile do not rewrite past events.
- Keep source-event generation server-side or database-coupled and preserve bounded audit evidence without medical content in audit logs.
- Preserve first-pet behavior unless a separately approved multi-pet task changes the active-pet model.

## Verification

- Pending: contract tests for source metadata and immutable snapshots; migration and idempotency tests; focused server tests for reminder completion, document creation, and relevant profile changes; negative tests for non-history mutations; legacy matching and filtering tests; live RLS owner-isolation checks; timeline component tests proving read-only behavior and separation of upcoming reminders; Playwright desktop/mobile journeys; typecheck; build; and full `pnpm verify`.
