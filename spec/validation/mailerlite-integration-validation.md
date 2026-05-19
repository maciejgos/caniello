# Validation: MailerLite Integration

## Status

Accepted

## Scope

Validate the Next.js monorepo MailerLite landing-lead integration: shared payload contracts, consent gating, role/wave rejection, group lookup, subscriber upsert payload shape, custom `language` field mapping, sanitized error handling, and type safety.

## Source Artifacts

- [Landing Page Segmented Validation Requirement](../requirements/landing-page-segmented-validation.md)
- [Landing Page MailerLite Subscriber Upsert Story](../stories/landing-page-mailerlite-subscriber-upsert.md)
- [Caniello MVP Implementation Roadmap](../plans/caniello-mvp-implementation-roadmap.md)
- [Marketing language options](../../apps/web/features/marketing/language.ts)
- [Language toggle](../../apps/web/features/marketing/components/LanguageToggle.tsx)
- [Landing lead API route](../../apps/web/app/api/landing-leads/route.ts)
- [Landing lead server integration](../../apps/web/features/marketing/server/landing-leads.ts)
- [Landing lead server tests](../../apps/web/features/marketing/server/landing-leads.test.ts)
- [Shared API contracts](../../packages/contracts/src/index.ts)
- [MailerLite integration gate script](../../scripts/mailerlite-integration-gate.mjs)
- [CI workflow](../../.github/workflows/ci.yml)

## Preconditions

- The marketing UI sends `language` from the active page context as `pl` or `en` in the `/api/landing-leads` payload.
- MailerLite has a text custom field named `Language` with API/tag key `language`.
- `MAILERLITE_API_KEY` and `MAILERLITE_GROUP_NAME` are configured in the target environment before live submissions.

## Acceptance Criteria Mapping

- Criterion: Given a valid Polish landing lead is submitted, when the server sends the subscriber upsert to MailerLite, then the request includes the email, configured waitlist group, and `fields.language = PL`.
  Evidence status: Supported
  Evidence: `apps/web/features/marketing/server/landing-leads.test.ts` covers Polish payload mapping and the targeted server test passed.

- Criterion: Given a valid English landing lead is submitted, when the server sends the subscriber upsert to MailerLite, then the request includes the email, configured waitlist group, and `fields.language = EN`.
  Evidence status: Supported
  Evidence: `apps/web/features/marketing/server/landing-leads.test.ts` covers English payload mapping and the targeted server test passed.

- Criterion: Given an unsupported language reaches the server, when payload validation runs, then the lead is rejected before MailerLite is called.
  Evidence status: Supported
  Evidence: `packages/contracts/src/index.ts` restricts landing lead `language` to `pl` or `en`; contract and server tests cover rejection of unsupported values.

- Criterion: Given required lead consent is missing, when payload validation runs, then the lead is rejected before MailerLite is called.
  Evidence status: Supported
  Evidence: `apps/web/features/marketing/server/landing-leads.test.ts` covers missing consent rejection.

- Criterion: Given role or interest-wave segmentation fields are submitted, when payload validation runs, then the lead is rejected because segmentation is deferred to the MailerLite survey.
  Evidence status: Supported
  Evidence: `apps/web/features/marketing/server/landing-leads.test.ts` covers role and wave rejection.

- Criterion: Given MailerLite rejects a subscriber because the address is inactive, when the API maps the failure, then the response is a controlled `409 Conflict` instead of a generic infrastructure `502`.
  Evidence status: Supported
  Evidence: `apps/web/features/marketing/server/landing-leads.test.ts` covers the inactive-subscriber 422 response from MailerLite and maps it to status 409.

- Criterion: Given the language labels are shown in the toggle, when MailerLite mapping is performed, then the same `PL` and `EN` labels are used for the MailerLite field.
  Evidence status: Supported
  Evidence: `apps/web/features/marketing/language.ts` centralizes `languageOptions`; `LanguageToggle.tsx` renders those options and `landing-leads.ts` uses `getLanguageLabel` from the same module for MailerLite field values.

- Criterion: Given MailerLite group upsert behavior existed before this change, when integration mapping is added, then group membership and secret handling remain server-side.
  Evidence status: Supported
  Evidence: Existing tests still verify group lookup, subscriber upsert through the server API boundary, missing consent rejection, segmentation rejection, and missing group failure without exposing secrets.

## Checks

- Check: Run targeted MailerLite server test.
  Type: Automated
  Status: Passed
  Expected result: Language field mapping, consent rejection, segmentation rejection, group lookup, and missing group behavior pass.
  Actual result: `pnpm --filter web test -- features/marketing/server/landing-leads.test.ts` passed: 1 test file, 7 tests.

- Check: Run shared contract tests.
  Type: Automated
  Status: Passed
  Expected result: Landing lead payload schema accepts supported language values and rejects unsupported values.
  Actual result: `pnpm --filter @caniello/contracts test` passed: 1 test file, 4 tests.

- Check: Run web typecheck.
  Type: Automated
  Status: Passed
  Expected result: Next.js marketing code and server integration compile with the tightened language contract.
  Actual result: `pnpm --filter web typecheck` passed.

- Check: Run focused MailerLite integration validation gate.
  Type: Automated
  Status: Passed
  Expected result: One command runs shared contract tests, MailerLite landing lead server tests, and web typecheck for the full landing-lead integration.
  Actual result: `pnpm validation:mailerlite-integration` passed.

- Check: Run full workspace test suite.
  Type: Automated
  Status: Passed
  Expected result: Existing app and package tests remain green.
  Actual result: `pnpm test` passed: 9 successful Turbo tasks; web suite passed 4 test files and 23 tests.

- Check: Run full workspace typecheck.
  Type: Automated
  Status: Passed
  Expected result: All workspace packages compile with the tightened contract.
  Actual result: `pnpm typecheck` passed: 7 successful Turbo tasks.

- Check: Verify live MailerLite subscriber field write.
  Type: Operational
  Status: Skipped
  Expected result: A real test subscriber in MailerLite receives `Language` value `PL` or `EN`.
  Actual result: Not run because it would mutate the external MailerLite account and was not explicitly requested.

## Evidence

- `packages/contracts/src/index.ts` now exports supported landing lead languages and validates `language` as `pl` or `en`.
- `apps/web/features/marketing/language.ts` centralizes language options with `PL` and `EN` labels.
- `apps/web/features/marketing/components/LanguageToggle.tsx` renders the centralized language options.
- `apps/web/features/marketing/server/landing-leads.ts` now includes `fields: { language: getLanguageLabel(payload.language) }` in the MailerLite subscriber upsert body.
- `scripts/mailerlite-integration-gate.mjs` implements the focused automated integration gate.
- `.github/workflows/ci.yml` runs the focused gate in CI after unit and contract tests.
- `package.json` exposes the local command as `pnpm validation:mailerlite-integration`.
- Commands run on 2026-05-19:
  - `pnpm --filter @caniello/contracts test`: passed, 1 file, 4 tests.
  - `pnpm --filter web test -- features/marketing/server/landing-leads.test.ts`: passed, 1 file, 6 tests.
  - `pnpm --filter web typecheck`: passed.
  - `pnpm validation:mailerlite-integration`: passed.
  - `pnpm test`: passed, 9 Turbo tasks.
  - `pnpm typecheck`: passed, 7 Turbo tasks.

## Missing, Skipped, or Unavailable Checks

- Check: Live MailerLite smoke test.
  Reason: Creating or updating a real subscriber mutates an external service and requires explicit human approval plus safe test data.
  Risk: The request body is verified locally, but the actual MailerLite account field configuration was not confirmed by a live write.

## Future CI/CD or Lifecycle Gates

- Gate: Landing lead API and contract tests.
  Trigger: Every pull request touching `packages/contracts`, landing lead client code, MailerLite server integration, or language switching.
  Blocks: Merge when subscriber payload shape, consent rejection, or language mapping regresses.
  Implementation: `pnpm validation:mailerlite-integration` runs locally and in `.github/workflows/ci.yml`.

- Gate: Live MailerLite smoke test in a controlled environment.
  Trigger: Before public launch or after MailerLite field/schema changes.
  Blocks: Release readiness when a safe test subscriber cannot be upserted with the expected `Language` value.

## Result

Ready for human review

## Follow-Up

- Human may optionally approve a live MailerLite smoke test using a dedicated test email to confirm the custom field displays as expected in the MailerLite dashboard.

## Human Decision

Accepted for validation-gate implementation by explicit human instruction on 2026-05-19. Scope clarified by human instruction: MailerLite validation should cover the overall integration, not only the language field.
