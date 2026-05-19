# Validation: MailerLite Language Field

## Status

Accepted

## Scope

Validate the landing lead API change that sends the current page language context to MailerLite custom field `language` as `PL` or `EN` when a newsletter or waitlist subscriber is upserted.

## Source Artifacts

- [Landing Page Segmented Validation Requirement](../requirements/landing-page-segmented-validation.md)
- [Landing Page MailerLite Subscriber Upsert Story](../stories/landing-page-mailerlite-subscriber-upsert.md)
- [Caniello MVP Implementation Roadmap](../plans/caniello-mvp-implementation-roadmap.md)
- [Landing lead API](../../api/landing-leads.ts)
- [Landing lead API tests](../../api/landing-leads.test.ts)

## Preconditions

- The frontend sends `language` from the active page context as `pl` or `en` in the `/api/landing-leads` payload.
- MailerLite has a text custom field named `Language` with API/tag key `language`.
- `MAILERLITE_API_KEY` and `MAILERLITE_GROUP_NAME` are configured in the target environment before live submissions.

## Acceptance Criteria Mapping

- Criterion: Given a valid Polish landing lead is submitted, when the server sends the subscriber upsert to MailerLite, then the request includes `fields.language = PL`.
  Evidence status: Supported
  Evidence: `api/landing-leads.test.ts` covers Polish payload mapping and `npm run test -- api/landing-leads.test.ts` passed with 6 tests.

- Criterion: Given a valid English landing lead is submitted, when the server sends the subscriber upsert to MailerLite, then the request includes `fields.language = EN`.
  Evidence status: Supported
  Evidence: `api/landing-leads.test.ts` covers English payload mapping and the targeted test passed.

- Criterion: Given an unsupported language reaches the server, when payload validation runs, then the lead is rejected before MailerLite is called.
  Evidence status: Supported
  Evidence: `api/landing-leads.test.ts` covers rejection of unsupported language context with `Lead language is invalid.`.

- Criterion: Given MailerLite group upsert behavior existed before this change, when language field mapping is added, then group membership and secret handling remain server-side.
  Evidence status: Supported
  Evidence: Existing tests still verify group lookup, subscriber upsert through the server API boundary, missing consent rejection, and missing group failure without exposing secrets.

## Checks

- Check: Run targeted MailerLite API tests.
  Type: Automated
  Status: Passed
  Expected result: Language field mapping, consent rejection, segmentation rejection, group lookup, and missing group behavior pass.
  Actual result: `npm run test -- api/landing-leads.test.ts` passed: 1 test file, 6 tests.

- Check: Run TypeScript validation gate.
  Type: Automated
  Status: Passed
  Expected result: The tightened `language` payload type compiles.
  Actual result: `npm run lint` passed.

- Check: Run full unit test suite.
  Type: Automated
  Status: Passed
  Expected result: Existing app and API tests remain green.
  Actual result: `npm run test` passed: 3 test files, 18 tests.

- Check: Verify live MailerLite subscriber field write.
  Type: Operational
  Status: Skipped
  Expected result: A real test subscriber in MailerLite receives `Language` value `PL` or `EN`.
  Actual result: Not run because it would mutate the external MailerLite account and was not explicitly requested.

## Evidence

- `api/landing-leads.ts` now validates supported language context and includes `fields: { language: "PL" | "EN" }` in the MailerLite subscriber upsert body.
- `api/landing-leads.test.ts` now tests unsupported language rejection plus Polish and English MailerLite field mapping.
- Commands run on 2026-05-19:
  - `npm run test -- api/landing-leads.test.ts`: passed, 1 file, 6 tests.
  - `npm run lint`: passed.
  - `npm run test`: passed, 3 files, 18 tests.

## Missing, Skipped, or Unavailable Checks

- Check: Live MailerLite smoke test.
  Reason: Creating or updating a real subscriber mutates an external service and requires explicit human approval plus safe test data.
  Risk: The request body is verified locally, but the actual MailerLite account field configuration was not confirmed by a live write.

## Future CI/CD or Lifecycle Gates

- Gate: Landing lead API unit tests.
  Trigger: Every pull request touching `api/landing-leads.ts`, MailerLite config, or landing lead client code.
  Blocks: Merge when subscriber payload shape, consent rejection, or language mapping regresses.

- Gate: Live MailerLite smoke test in a controlled environment.
  Trigger: Before public launch or after MailerLite field/schema changes.
  Blocks: Release readiness when a safe test subscriber cannot be upserted with the expected `Language` value.

## Result

Ready for human review

## Follow-Up

- Human may optionally approve a live MailerLite smoke test using a dedicated test email to confirm the custom field displays as expected in the MailerLite dashboard.

## Human Decision

Pending
