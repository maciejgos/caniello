---
status: review
roadmap: now
risk: high
adrs: [0012, 0014, 0015, 0024, 0027, 0028]
---

# Reminder creation mockup alignment

## User story

As a pet owner, I want a clear, polished reminder creation flow so that I can schedule and review a care task before saving it.

## Acceptance criteria

- The authenticated reminder list opens a distinct create or edit state matching the supplied `Screenshot 2026-06-20 at 08.53.38.png` composition inside the existing app shell.
- The form provides title, type, due date, optional local time, repeat frequency, advance notice, and notes with a live reminder preview and truthful care context.
- Cancel returns without mutation; successful create or edit returns to the reminder list with persisted values available after reload.
- Polish remains the default and equivalent English copy is available.
- Scheduling metadata does not imply notification delivery, timezone processing, generated occurrences, email, push, SMS, or calendar sync.
- Reminder create and update mutations write bounded audit evidence without title, notes, or other medical content.
- Existing completion, first-pet ownership, RLS, validation, loading, and failure behavior remain covered.
- Desktop and mobile layouts are usable without horizontal overflow.

## Constraints

- Keep the authenticated app shell and feature-local reminder slice.
- Do not commit the reference screenshot or introduce notification delivery.
- The approved migration may add only the reminder scheduling fields needed by this task.

## Verification

- `pnpm --filter @caniello/contracts test` — passed, 23 tests.
- `pnpm --filter @caniello/db test` — passed, 15 tests including migration and bounded-audit static coverage.
- `pnpm --filter web test` — passed, 120 tests with 5 opt-in live RLS suites skipped.
- `pnpm --filter web test -- AccountApp.test.tsx` — passed, 22 tests covering create, live preview data, persisted request fields, edit, cancel, completion, missing-pet behavior, and inactive notifications.
- `pnpm --filter web typecheck` — passed.
- `pnpm verify:fast` — passed task contract, formatting, repository hygiene, lint, and typecheck. Lint retained five warnings and no errors.
- `pnpm verify` — passed all 11 stages outside the sandbox: task contract, formatting, repository hygiene, lint, typecheck, MailerLite boundary, platform foundation, unit/contract tests, production build, runtime smoke, and Playwright browser journeys. The suite reported the existing five lint warnings, 120 web tests passed with five opt-in RLS suites skipped, and 18 Playwright journeys passed with six opt-in live journeys skipped.
- Playwright Interactive — passed Polish and English creation-screen semantics, live title/type/repeat/advance/notes preview updates, truthful manual-entry care context, Cancel, localized validation, and zero browser console warnings/errors.
- Playwright Interactive at `2048x1024` — document width matched the 2048px viewport with no horizontal overflow. The content region measured 1775px, with a 1086px form and 390px side panel, matching the reference composition inside the retained 272px app shell.
- Playwright Interactive at `390x844` — document and body widths matched the 390px viewport with no horizontal overflow; the form and supporting panels collapsed into one column.
- Visual screenshot comparison — unavailable. The initial in-app browser screenshot command timed out at desktop and mobile sizes; on the resumed verification run, the browser control service returned a connection-level tool error before capture. The source mockup was opened directly and DOM/layout metrics were compared, but the screenshot comparison gate could not be completed.
- `./scripts/start.sh` — passed outside the sandbox; local Supabase initialized from scratch, applied `20260620110000_extend_reminder_schedule_and_audit.sql`, seeded data, and passed health checks.
- `CANIELLO_RUN_SUPABASE_RLS_TESTS=1 pnpm --filter web test -- features/account/server/reminders.rls.test.ts` — passed outside the sandbox, proving another owner cannot read or mutate the reminder and that owner creation writes bounded `reminder.created` audit evidence without title or notes.
- The documented `pnpm task:status -- <slug> <status>` form passed `--` through to the script and failed without changes; `pnpm task:status reminder-creation-mockup-alignment in-progress` succeeded.
- Residual risk: screenshot-based fidelity and an interactive browser Save/Edit/reload replay remain unavailable because the in-app browser control service failed. Persistence, mapping, create/edit payloads, UI transitions, audit evidence, and RLS have unit, integration, live database, full build, smoke, and Playwright-suite coverage.
- Next action: human review of the reminder creation presentation and scheduling semantics; optionally repeat the screenshot comparison when in-app browser capture is available.
