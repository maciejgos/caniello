# Validation: Landing Product Area Copy

## Status

Accepted

## Scope

Validate the landing-page product-area copy, naming, and lead-capture update for the owner care page, Marketplace page, Clinic page, and shared "Co dalej" timeline. The pages now use clearer marketing promises for each product area while the timeline keeps a consistent pattern: Polish `Opieka`, `Rynek usług`, and `Kliniki`; English `Care`, `Marketplace`, and `Clinic`. Landing forms now capture a generic waitlist lead only; role and wave segmentation are deferred to a later MailerLite survey.

## Source Artifacts

- Human direction from May 14, 2026: landing-page lead segmentation is deferred to a later MailerLite survey.
- [Landing Page Future Waves Research Framing](../stories/landing-page-future-waves-research-framing.md)
- [Landing Page Segmented Validation Requirement](../requirements/landing-page-segmented-validation.md)
- [Landing Page Segmented Lead Capture](../features/landing-page-segmented-lead-capture.md)
- [Landing lead capture configuration](../../README.md#landing-lead-capture-configuration)
- [Marketplace page implementation](../../src/pages/MarketplacePage.tsx)
- [Clinic page implementation](../../src/pages/ClinicPage.tsx)
- [Shared landing copy](../../src/content.ts)
- [Unit and integration tests](../../src/App.test.tsx)
- [Playwright e2e tests](../../tests/e2e/landing.spec.ts)

## Preconditions

- The landing page implementation exists in React, TypeScript, Vite, and TailwindCSS.
- Dockerized project commands are available through `docker compose run --rm web`.
- Existing routes remain `/wave-2-exploration` and `/wave-3-research`.

## Acceptance Criteria Mapping

- Criterion: Wave 2 and Wave 3 are labeled as research, exploration, or future waves dependent on validated demand.
  Evidence status: Supported
  Evidence: `src/content.ts`, `src/pages/MarketplacePage.tsx`, and `src/pages/ClinicPage.tsx` keep research/exploration eyebrow, note, and body copy around the new names.

- Criterion: Timeline naming is internally consistent across the current owner-facing area and future research areas.
  Evidence status: Supported
  Evidence: The shared timeline now presents `Opieka`, `Rynek usług`, and `Kliniki` with matching Polish CTAs `Poznaj opiekę`, `Poznaj rynek usług`, and `Poznaj kliniki`. English copy mirrors the same pattern with `Care`, `Marketplace`, `Clinic` and `Explore ...` CTAs.

- Criterion: Product-area hero and section copy communicates a distinct marketing promise for each area.
  Evidence status: Supported
  Evidence: Owner care now leads with `Cała opieka nad pupilem. Zawsze pod ręką.`; Marketplace leads with `Zaufana pomoc, gdy opieka potrzebuje wsparcia.`; Clinic leads with `Pełniejszy kontekst pacjenta przed wizytą.`. English copy mirrors those promises with localized phrasing.

- Criterion: Wave 2 says Caniello is researching a curated way for pet owners to discover trusted pet-related services and providers.
  Evidence status: Supported
  Evidence: Wave 2 now uses `Rynek usług` in Polish and `Marketplace` in English, and describes connecting caregivers with trusted support around everyday pet care without adding booking, payments, or marketplace availability.

- Criterion: Wave 3 says Caniello is exploring tools that help clinics and vets work with owner-approved pet health context.
  Evidence status: Supported
  Evidence: Wave 3 now uses `Kliniki` in Polish and `Clinic` in English, and preserves clinic research copy around client-shared information, consent, privacy, and unavailable clinic-product scope.

- Criterion: Future-wave CTAs avoid presenting active product access.
  Evidence status: Supported
  Evidence: Polish timeline CTAs are now `Poznaj rynek usług` and `Poznaj kliniki`, with tests asserting the existing research-page links. English CTAs remain `Explore Marketplace` and `Explore Clinic`.

- Criterion: Landing lead capture does not segment leads before the later MailerLite survey.
  Evidence status: Supported
  Evidence: `WaitlistForm` submits email, consent, language, form source, and UTM context only. `api/landing-leads.ts` no longer requires or accepts role/wave as required fields, and tests assert Marketplace and Clinic page submissions do not include `role` or `interestWave`.

## Checks

- Check: `docker compose run --rm web npm run test`
  Type: Automated
  Status: Passed
  Expected result: Unit and integration tests pass after copy and assertion updates.
  Actual result: Passed. 2 test files passed, 12 tests passed.

- Check: `docker compose run --rm web npm run lint`
  Type: Automated
  Status: Passed
  Expected result: TypeScript validation passes.
  Actual result: Passed. `tsc -b --pretty false` completed successfully.

- Check: `docker compose run --rm web npm run test:e2e`
  Type: UI
  Status: Unavailable
  Expected result: Playwright validates landing, Marketplace, and Clinic flows on desktop and mobile.
  Actual result: Unavailable. Playwright could not launch Chromium because `/root/.cache/ms-playwright/chromium_headless_shell-1217/chrome-linux/headless_shell` was missing in the Docker runtime.

- Check: Review changed copy for launch-commitment language.
  Type: Manual
  Status: Passed
  Expected result: New names do not introduce `coming soon`, `launching next`, `available now`, or equivalent wording.
  Actual result: Passed. The changed copy keeps research, exploration, and unavailable-scope wording.

## Evidence

- Wave 2 visible name changed to `Rynek usług` in Polish and `Marketplace` in English.
- Wave 3 visible name changed to `Kliniki` in Polish and `Clinic` in English.
- The current owner area now uses `Opieka` in Polish and `Care` in English, replacing the inconsistent `moduł opieki` CTA in the timeline.
- The owner, Marketplace, and Clinic pages now use benefit-led hero copy and more specific section headlines instead of repeating product-area labels.
- Lead segmentation is deferred: landing submissions no longer include `role` or `interestWave`; page/form source remains available for technical attribution and analytics context.
- Routes remain unchanged: `/wave-2-exploration` and `/wave-3-research`.

## Missing, Skipped, or Unavailable Checks

- Check: Playwright e2e screenshot validation
  Reason: Browser executable is missing in the Docker runtime.
  Risk: Layout regressions from copy and form simplification were not visually checked in this pass.

## Future CI/CD or Lifecycle Gates

- Gate: Landing copy and route e2e smoke test
  Trigger: Pull requests that change `src/content.ts`, Wave page copy, or `WaveStorySection` CTAs.
  Blocks: Merge when Wave 2 or Wave 3 names lose research framing, route links break, or landing forms reintroduce role/wave segmentation before the MailerLite survey exists.

## Result

Ready for human review

## Follow-Up

- Human should confirm whether `Rynek usług` / `Kliniki` and `Marketplace` / `Clinic` are the preferred localized names for the current solution context.
- Run Playwright visual checks before release if the naming change ships with additional layout or responsive UI changes.

## Human Decision

Accepted on 2026-05-14 by explicit human instruction to approve the remaining documents.
