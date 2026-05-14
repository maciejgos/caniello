# Validation: Wave 2 and Wave 3 Page Naming

## Status

Draft

## Scope

Validate the landing-page naming update for the dedicated Wave 2 and Wave 3 research pages and the shared "Co dalej" timeline. The change replaces generic labels with `Caniello Care Network` and `Caniello Clinic Connect` while preserving research-stage framing, existing routes, and segmented lead capture identifiers.

## Source Artifacts

- [Landing Page Future Waves Research Framing](../stories/landing-page-future-waves-research-framing.md)
- [Landing Page Segmented Validation Requirement](../requirements/landing-page-segmented-validation.md)
- [Landing Page Segmented Lead Capture](../features/landing-page-segmented-lead-capture.md)
- [Wave 2 page implementation](../../src/pages/Wave2Page.tsx)
- [Wave 3 page implementation](../../src/pages/Wave3Page.tsx)
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
  Evidence: `src/content.ts`, `src/pages/Wave2Page.tsx`, and `src/pages/Wave3Page.tsx` keep research/exploration eyebrow, note, and body copy around the new names.

- Criterion: Wave 2 says Caniello is researching a curated way for pet owners to discover trusted pet-related services and providers.
  Evidence status: Supported
  Evidence: Wave 2 now uses `Caniello Care Network` and describes connecting caregivers with trusted support around everyday pet care, without adding booking, payments, or marketplace availability.

- Criterion: Wave 3 says Caniello is exploring tools that help clinics and vets work with owner-approved pet health context.
  Evidence status: Supported
  Evidence: Wave 3 now uses `Caniello Clinic Connect` and preserves clinic research copy around client-shared information, consent, privacy, and unavailable clinic-product scope.

- Criterion: Future-wave CTAs avoid presenting active product access.
  Evidence status: Supported
  Evidence: Timeline CTAs are now `Poznaj Care Network` and `Poznaj Clinic Connect`, with tests asserting the existing research-page links.

## Checks

- Check: `docker compose run --rm web npm run test`
  Type: Automated
  Status: Passed
  Expected result: Unit and integration tests pass after copy and assertion updates.
  Actual result: Passed. 2 test files passed, 11 tests passed.

- Check: `docker compose run --rm web npm run lint`
  Type: Automated
  Status: Passed
  Expected result: TypeScript validation passes.
  Actual result: Passed. `tsc -b --pretty false` completed successfully.

- Check: Review changed copy for launch-commitment language.
  Type: Manual
  Status: Passed
  Expected result: New names do not introduce `coming soon`, `launching next`, `available now`, or equivalent wording.
  Actual result: Passed. The changed copy keeps research, exploration, and unavailable-scope wording.

## Evidence

- Wave 2 visible name changed to `Caniello Care Network` in the shared timeline and dedicated page.
- Wave 3 visible name changed to `Caniello Clinic Connect` in the shared timeline and dedicated page.
- Lead segmentation remains unchanged: `interestWave="wave_2"`, `interestWave="wave_3"`, `source="landing_page_wave2"`, and `source="landing_page_wave3"`.
- Routes remain unchanged: `/wave-2-exploration` and `/wave-3-research`.

## Missing, Skipped, or Unavailable Checks

- Check: Playwright e2e screenshot validation
  Reason: Not run for this copy-only naming change in this pass.
  Risk: Layout regressions from longer labels are unlikely but should be visually checked before release if this change is bundled with other UI updates.

## Future CI/CD or Lifecycle Gates

- Gate: Landing copy and route e2e smoke test
  Trigger: Pull requests that change `src/content.ts`, Wave page copy, or `WaveStorySection` CTAs.
  Blocks: Merge when Wave 2 or Wave 3 names lose research framing, route links break, or lead segmentation changes unintentionally.

## Result

Ready for human review

## Follow-Up

- Human should confirm whether `Caniello Care Network` and `Caniello Clinic Connect` are the preferred product-style names for the current solution context.
- Run Playwright visual checks before release if the naming change ships with additional layout or responsive UI changes.

## Human Decision

Pending

