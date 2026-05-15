# Validation: Landing Legal and Medical Minimum Data

## Status

Accepted

## Scope

Validation of the current landing legal pages for the minimum information needed before public lead capture: Privacy Policy, Terms of Service, and Medical Boundaries.

## Source Artifacts

- `src/content.ts`
- `src/pages/LegalPage.tsx`
- `src/App.tsx`
- `src/App.test.tsx`
- `spec/requirements/landing-page-segmented-validation.md`
- `spec/features/landing-page-segmented-lead-capture.md`
- `spec/stories/landing-page-footer-legal-and-responsive-trust.md`
- `spec/stories/cookie-consent-privacy-and-medical-boundaries.md`
- `spec/plans/caniello-mvp-implementation-roadmap.md`

## Preconditions

- Landing legal routes exist for `/privacy`, `/terms`, and `/medical-boundaries`.
- Legal content is no longer visibly marked as draft on the landing page. Formal legal review remains unavailable and is tracked as a residual risk.

## Acceptance Criteria Mapping

- Criterion: A form that collects personal data links to privacy information before or near submission.
  Evidence status: Supported
  Evidence: Footer links include Privacy Policy, Terms, and Medical Boundaries. Tests cover `/privacy` and `/medical-boundaries` rendering from routes.

- Criterion: Privacy Policy gives a minimal Article 13-style notice for landing lead capture.
  Evidence status: Supported
  Evidence: The policy names the controller, privacy contact, no-DPO state, categories of landing data, purposes, consent basis, recipients, planned providers, EEA/non-EEA transfer mechanism framing, retention framing, voluntary email provision, automated-decision boundary, data-subject rights, and UODO complaint path. Planned providers are Vercel for hosting and MailerLite for the mailing list and surveys. DPA/subprocessor confirmation remains a launch governance check, not a missing policy section.

- Criterion: Terms explain the landing service scope and do not imply production app access.
  Evidence status: Supported
  Evidence: Terms state the landing page purpose, form behavior, lack of guaranteed access, unavailable scope, availability, changes, technical requirements, unlawful-content prohibition, contact email, and complaint/report procedure. Remaining formal legal review is outside Codex validation.

- Criterion: Medical boundary content states that Caniello does not diagnose, does not provide medical advice, does not replace a veterinarian, and does not replace an official pet passport.
  Evidence status: Supported
  Evidence: Medical Boundaries page includes non-diagnosis, emergency/veterinarian redirection, official document/passport limitation, organizational reminders, controlled sharing, and future AI-not-medical-advice copy.

- Criterion: Polish and English policy/safety meanings remain equivalent.
  Evidence status: Supported
  Evidence: Polish and English legal pages cover the same sections and materially equivalent scope boundaries.

## Checks

- Check: Manual content review against landing requirements and public-launch backlog
  Type: Manual
  Status: Passed
  Expected result: Privacy, terms, and medical boundaries provide enough information for human/legal review before public launch.
  Actual result: Content covers the minimal landing data set for limited public validation. Formal legal review remains unavailable.

- Check: `docker compose run --rm web npm run test`
  Type: Automated
  Status: Passed
  Expected result: Legal routes and existing landing behavior remain covered by tests.
  Actual result: 2 test files passed, 12 tests passed.

## Evidence

- `src/content.ts` contains the Polish legal content at the Privacy, Terms, and Medical Boundaries entries.
- `src/content.ts` contains materially equivalent English legal content.
- `src/pages/LegalPage.tsx` renders the updated date, sections, and mailto links without a visible draft notice.
- `src/App.tsx` routes `/privacy`, `/terms`, and `/medical-boundaries` to `LegalPage`.
- `src/App.test.tsx` checks `/privacy`, `/terms`, and `/medical-boundaries` route rendering, privacy contact mailto behavior, no-DPO copy, automated-decision copy, technical requirements, prohibited content, and complaint/report copy.

## Missing, Skipped, or Unavailable Checks

- Check: Final legal review
  Reason: Codex cannot approve legal/compliance content.
  Risk: Public launch could still expose incomplete privacy or consumer-information duties.

- Check: Browser visual verification of legal pages
  Reason: This validation focused on content and unit coverage.
  Risk: Low content confidence risk, moderate UI polish risk if legal pages have responsive layout regressions.

## Future CI/CD or Lifecycle Gates

- Gate: Legal route smoke test
  Trigger: Every landing build.
  Blocks: Release if `/privacy`, `/terms`, or `/medical-boundaries` fails to render.

- Gate: Legal copy checklist
  Trigger: Before public launch and after vendor/data-flow changes.
  Blocks: Public traffic if policy lacks controller, contact, data categories, purposes, legal basis, recipients, provider/transfer mechanism framing, retention, rights, complaint authority, voluntary/required data note, and profiling/automated-decision note.

- Gate: Medical safety copy check
  Trigger: Any landing, assistant, reminders, document, or AI copy change.
  Blocks: Release if Caniello appears to diagnose, recommend treatment, replace a veterinarian, or replace an official pet passport.

## Result

Ready for human review

## Follow-Up

- Before public launch, confirm the current Vercel and MailerLite DPA/subprocessor terms and keep the provider/transfer wording aligned with them.
- Consider adding a phone number and fuller provider identity to Terms before a broader launch, paid service, account creation, or consumer-contract flow.

## Human Decision

Accepted
