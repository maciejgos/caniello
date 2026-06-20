---
status: planned
roadmap: next
risk: high
adrs: [0018, 0019, 0024]
---

# Reminder delivery

## User story

As an owner, I want reminders delivered according to my consent and preferences so that scheduled care creates repeat value.

## Acceptance criteria

- A promoted task selects approved delivery channels and records explicit owner consent and opt-out behavior.
- Delivery respects the owner's timezone, schedule, language, and notification preferences.
- Attempts are idempotent, use bounded retries for transient failures, and expose terminal failure without duplicate delivery.
- Provider credentials and calls remain server-side; logs exclude reminder medical content and recipient secrets.
- UI copy distinguishes a saved schedule from confirmed delivery.

## Dependencies

- Explicit provider and operational decision, audit foundation, and promotion to `Now`.

## Constraints

- No SMS, push, email, calendar sync, or background platform is implied until explicitly approved.
- MailerLite remains marketing-only unless ADR 0018 is revised or superseded.

## Verification

- Pending after promotion: consent and preference tests, timezone/DST cases, idempotency/retry/failure tests, provider-boundary checks, opt-out browser journey, typecheck, build, and full verification.
