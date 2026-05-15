# Validation: Landing Page Milestone 0

## Status

Accepted

## Scope

Validate the Milestone 0 landing-page implementation from `spec/plans/caniello-mvp-implementation-roadmap.md`: Polish-first language switching, owner waitlist capture, Wave 2 and Wave 3 research-interest capture, consent gating, MailerLite server boundary, validation events, UTM preservation, footer/legal placeholders, and responsive UI evidence.

## Source Artifacts

- `spec/plans/caniello-mvp-implementation-roadmap.md`
- `spec/requirements/first-landing-page.md`
- `spec/requirements/landing-page-segmented-validation.md`
- `spec/features/landing-page-mvp-value-experience.md`
- `spec/features/landing-page-segmented-lead-capture.md`
- `spec/features/landing-page-validation-instrumentation.md`
- `spec/stories/polish-first-language-switching.md`
- `spec/stories/landing-page-consent-and-analytics-policy-baseline.md`
- `spec/stories/landing-page-hero-and-mvp-value.md`
- `spec/stories/landing-page-future-waves-research-framing.md`
- `spec/stories/landing-page-footer-legal-and-responsive-trust.md`
- `spec/stories/landing-page-owner-waitlist-capture.md`
- `spec/stories/landing-page-provider-and-clinic-interest-capture.md`
- `spec/stories/landing-page-mailerlite-subscriber-upsert.md`
- `spec/stories/landing-page-validation-events-and-utm-capture.md`
- `spec/design/caniello-visual-direction.md`
- `src/App.tsx`
- `src/components/WaitlistForm.tsx`
- `src/content.ts`
- `src/lib/landing-leads.ts`
- `src/lib/validation-events.ts`
- `api/landing-leads.ts`
- `api/landing-leads.test.ts`
- `api/validation-events.ts`
- `src/App.test.tsx`
- `tests/e2e/landing.spec.ts`

## Preconditions

- Human approved beginning Milestone 0 implementation on 2026-05-12.
- Work occurred on branch `codex/caniello-mvp-milestone-0`.
- MailerLite API token was provided locally in `/Users/macg/Downloads/api_token.txt` and copied into ignored `.env.local` as `MAILERLITE_API_KEY`; the configured group name is `Caniello Waitlist`.

## Acceptance Criteria Mapping

- Criterion: Landing page opens in Polish by default and switches to English with core promise, CTA, privacy cues, and scope-safe language.
  Evidence status: Supported
  Evidence: `src/App.test.tsx` covers Polish default, English switching, and persisted preference; Playwright E2E verifies Polish default and English hero copy.

- Criterion: Owner waitlist forms require valid email and lead-capture consent, then submit `role=pet_owner`, `interest_wave=wave_1`, and source values for hero, mid-page, and footer contexts.
  Evidence status: Partially Supported
  Evidence: Unit and E2E tests verify invalid email, missing consent blocking, and hero payload. Footer and mid-page forms use distinct source props in `src/App.tsx`; automated payload coverage should be expanded for all owner sources.

- Criterion: Wave 2 provider and Wave 3 clinic/vet paths are labeled as research and submit segmented payloads without implying active marketplace or clinic products.
  Evidence status: Supported
  Evidence: Unit and E2E tests verify provider and clinic/vet payloads with `landing_page_wave2` and `landing_page_wave3`; screenshots show compact research cards, scope-safe notes, and full research forms opened from card CTAs.

- Criterion: MailerLite lead capture uses a server-side boundary, rejects missing consent, maps groups/fields, and avoids exposing secrets to browser code.
  Evidence status: Supported with live-mutation gap
  Evidence: `api/landing-leads.ts` reads `MAILERLITE_API_KEY` server-side, resolves `MAILERLITE_GROUP_NAME` or the default `Caniello Waitlist`, rejects absent consent, validates the landing role/wave/source payload server-side, upserts the subscriber email into the waitlist group only, and returns sanitized errors. `api/landing-leads.test.ts` verifies consent rejection, group-name lookup, email-and-group-only subscriber upsert request shape, and missing-group failure. A read-only live MailerLite lookup verified that `Caniello Waitlist` exists as group id `187371486947837507`; no live subscriber was created without explicit human approval.

- Criterion: Non-essential validation events are blocked before analytics consent and available after consent with UTM/source attribution.
  Evidence status: Supported
  Evidence: `src/lib/validation-events.ts` gates event API calls on saved analytics consent; `/api/validation-events` accepts sanitized validation payloads; unit and E2E tests verify no event API call before consent, `analytics_consent` and `page_view` calls after consent, and UTM preservation.

- Criterion: Footer, legal placeholders, final signup, privacy cues, and responsive desktop/mobile layouts are present.
  Evidence status: Supported
  Evidence: Playwright screenshots show desktop and mobile page states with footer links, legal placeholders, final signup, privacy cues, and the revised mockup-aligned process/CTA/What's next/final signup composition.

## Checks

- Check: `docker compose run --rm web npm run test`
  Type: Automated
  Status: Passed
  Expected result: Vitest suite passes.
  Actual result: 2 test files passed, 11 tests passed, including 3 API tests for simple MailerLite payload behavior.

- Check: `docker compose run --rm web npm run lint`
  Type: Automated
  Status: Passed
  Expected result: TypeScript validation succeeds.
  Actual result: `tsc -b --pretty false` completed with exit code 0.

- Check: `docker compose run --rm web npm run build`
  Type: Automated
  Status: Passed
  Expected result: TypeScript and Vite production build succeed.
  Actual result: Build completed and emitted `dist/` assets.

- Check: `curl -L -sS -H "Authorization: Bearer <redacted>" -H "Accept: application/json" "https://connect.mailerlite.com/api/groups?limit=100&filter%5Bname%5D=Caniello%20Waitlist"`
  Type: External read-only integration
  Status: Passed
  Expected result: MailerLite returns an existing group named `Caniello Waitlist`.
  Actual result: MailerLite returned group id `187371486947837507`, name `Caniello Waitlist`, and zero active subscribers. The token was not printed or committed.

- Check: `curl -L -sS -i -X POST http://localhost:5173/api/landing-leads ... leadConsent=false`
  Type: Local manual
  Status: Passed
  Expected result: Vite local dev server routes `/api/landing-leads` to the API handler and returns sanitized JSON without contacting MailerLite.
  Actual result: Local Vite middleware returned `400` with `{"ok":false,"message":"Lead consent is required."}`.

- Check: `docker run --rm -v /Users/macg/Code/caniello:/work -v /private/tmp/caniello-node-modules:/work/node_modules -w /work mcr.microsoft.com/playwright:v1.59.1-noble sh -lc 'npm ci && npm run test:e2e'`
  Type: UI
  Status: Passed
  Expected result: Playwright desktop and mobile landing flows pass and capture screenshots.
  Actual result: 2 tests passed across desktop Chromium and mobile Chromium.

- Check: `docker compose run --rm web npm run test:e2e`
  Type: UI
  Status: Unavailable
  Expected result: Repo Docker service can run Playwright checks directly.
  Actual result: The Alpine-based app container could not launch the downloaded Playwright fallback browser; official Playwright container validation was used instead.

## Evidence

- `spec/validation/screenshots/landing-landing-page-is-Po-62c15-egmented-leads-with-consent-desktop-chromium/landing-polish-desktop-chromium.png`
- `spec/validation/screenshots/landing-landing-page-is-Po-62c15-egmented-leads-with-consent-desktop-chromium/landing-segmented-success-desktop-chromium.png`
- `spec/validation/screenshots/landing-landing-page-is-Po-62c15-egmented-leads-with-consent-mobile-chromium/landing-polish-mobile-chromium.png`
- `spec/validation/screenshots/landing-landing-page-is-Po-62c15-egmented-leads-with-consent-mobile-chromium/landing-segmented-success-mobile-chromium.png`
- MailerLite implementation reference: official MailerLite subscribers API documents create/upsert through `POST https://connect.mailerlite.com/api/subscribers`, including non-destructive omitted fields and groups behavior.
- Human visual feedback prompted a layout correction after the initial implementation over-expanded the future-wave section. The latest screenshots show Wave 2/Wave 3 as compact research cards with modal capture paths, closer to `spec/notes/landing/image 1.png`.
- A follow-up human visual note required the three mid-page panels to match height like the mockup. The latest desktop screenshot shows the "How Caniello works", owner CTA, and "What's next" panels aligned to the same bottom edge.
- A follow-up human visual note required analytics consent to be a small dismissing popup instead of a full-width page section, with the action handled by API. The latest implementation uses a bottom popup that disappears after selection and posts to `/api/validation-events`.
- A follow-up spacing note identified an oversized gap between the final waitlist strip and trust disclaimer. The latest desktop screenshot uses reduced top padding on the trust section to tighten the layout without overlap.

## Missing, Skipped, or Unavailable Checks

- Check: Live MailerLite create/update against a real subscriber.
  Reason: Creating or updating a live subscriber mutates the external MailerLite account and was not performed without explicit human approval.
  Risk: The final public-launch smoke test still needs to prove that a real or disposable email is added to `Caniello Waitlist`.

- Check: Direct Playwright execution inside the app's Alpine Docker service.
  Reason: Browser installation in that container downloaded an unsupported fallback build that did not expose the expected headless-shell executable path.
  Risk: Contributors may need the official Playwright image, a non-Alpine image, or explicit browser dependency setup for local E2E parity.

- Check: Final legal copy approval.
  Reason: The accepted story allows clearly marked placeholders, and final legal text requires human/legal approval.
  Risk: Page should not be published as final without approved privacy and terms content.

## Future CI/CD or Lifecycle Gates

- Gate: Unit, lint, build, and Playwright E2E checks.
  Trigger: Every pull request affecting `src/`, `api/`, or `tests/`.
  Blocks: Merge or release when failing.

- Gate: MailerLite configuration smoke test.
  Trigger: Preview or production deployment with lead-capture secrets configured.
  Blocks: Public launch when subscriber upsert, group assignment, or field mapping fails.

- Gate: Legal placeholder check.
  Trigger: Public launch readiness.
  Blocks: Release if privacy policy or terms placeholders remain unapproved.

## Result

Ready for human review

## Follow-Up

- Verify live MailerLite subscriber upsert into `Caniello Waitlist` once a human approves a real or disposable test email submission.
- Decide whether to change the app Docker image or document official Playwright-image usage for E2E checks.
- Expand automated owner-source tests to cover mid-page and footer payloads directly.
- Replace legal placeholders with approved Privacy Policy and Terms of Service before public launch.

## Human Decision

Accepted on 2026-05-14 by explicit human instruction to approve the remaining documents.
