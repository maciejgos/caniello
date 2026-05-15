# Validation: First Landing Page

## Status

Accepted

## Scope

This validation reviews the first Caniello landing page implementation against the accepted first landing page requirement, the landing page ExecPlan, and the latest human instruction to match `spec/design/visual-artifacts/caniello-better-care-landing.png` visually. The implemented outcome is a Dockerized React, TypeScript, Vite, and TailwindCSS single-page landing page that follows the English mockup layout and includes a non-persistent waitlist-interest form.

## Source Artifacts

- [First Landing Page Requirement](../requirements/first-landing-page.md)
- [First Landing Page ExecPlan](../plans/first-landing-page.md)
- [Caniello Visual Direction](../design/caniello-visual-direction.md)
- Visual reference: `spec/design/visual-artifacts/caniello-better-care-landing.png`
- Logo reference: `spec/design/visual-artifacts/caniello-dark-wordmark.png`
- [Repository README](../../README.md)
- Implementation paths:
  - `src/App.tsx`
  - `src/content.ts`
  - `src/components/WaitlistForm.tsx`
  - `src/assets/caniello-bruno-app-hero.png`
  - `src/assets/caniello-waitlist-pets.png`
  - `src/assets/caniello-dark-wordmark.png`
  - `src/App.test.tsx`
  - `tests/e2e/landing.spec.ts`
  - `Dockerfile`
  - `docker-compose.yml`

## Preconditions

- Dependencies are installed from `package-lock.json`.
- Docker is available for containerized development and validation.
- The landing page can run locally on `http://localhost:5173`.
- Playwright browser validation can reach the local app through `E2E_BASE_URL=http://host.docker.internal:5173` when running from the Playwright container.

## Acceptance Criteria Mapping

- Criterion: Given a first-time pet owner visitor, when they open the landing page, then they can identify Caniello as a pet health and care organization utility within the first viewport.
  Evidence status: Supported
  Evidence: Playwright desktop and mobile screenshots show the first viewport with Caniello branding, English hero copy, waitlist action, and a phone-and-dog hero visual aligned with `spec/design/visual-artifacts/caniello-better-care-landing.png`.

- Criterion: Given a visitor who fits the early audience, when they read the page, then they can understand the core promise of records, reminders, documents, and shareable care information.
  Evidence status: Supported
  Evidence: `src/App.tsx` renders the English mockup sections for reminders, health records, sharing, and privacy. `npm run build` confirms the content compiles into the page.

- Criterion: Given a visitor who is interested in Caniello, when they decide to act, then they have a clear primary action for joining a waitlist or signaling interest.
  Evidence status: Supported
  Evidence: `src/components/WaitlistForm.tsx` renders the primary waitlist action. Vitest and Playwright both exercise the form behavior.

- Criterion: Given the page is used for validation, when interest actions are submitted or clicked, then the team has a way to measure conversion or collect evidence for the validation cycle.
  Evidence status: Partially Supported
  Evidence: The form confirms interest locally and the tests prove the interaction. Persistent storage and analytics are intentionally deferred, so production conversion measurement still needs a follow-up decision.

- Criterion: Given Caniello's scope constraints, when the page describes the product, then it does not claim to replace an official EU pet passport, provide AI diagnosis, or offer clinic/marketplace functionality.
  Evidence status: Supported
  Evidence: Manual copy review found no AI diagnosis, treatment, booking, payment, clinic software, marketplace, or official passport replacement claims.

- Criterion: Given a developer starts the project from committed files, when they use the documented Docker workflow, then the React and TailwindCSS landing page can run locally in a reproducible container.
  Evidence status: Supported
  Evidence: `docker compose build` completed successfully and `docker compose up` served the Vite app on `http://localhost:5173`.

- Criterion: Given implementation tooling is added, when a future contributor reads the repository instructions, then they can find the exact install, dev, build, and test commands needed for the landing page.
  Evidence status: Supported
  Evidence: `README.md` and `AGENTS.md` now document npm, Docker, and Playwright commands.

- Criterion: Given the landing page is viewed on common mobile and desktop screen sizes, when a user scans the page, then the primary message and action remain visible, readable, and usable.
  Evidence status: Supported
  Evidence: Playwright ran the landing flow on Desktop Chrome and Pixel 7 profiles and captured screenshots for both.

## Checks

- Check: `docker compose run --rm web npm run build`
  Type: Automated
  Status: Passed
  Expected result: TypeScript and Vite production build complete without errors.
  Actual result: Passed. Vite built `dist/index.html`, CSS, and JS assets.

- Check: `docker compose run --rm web npm run test`
  Type: Automated
  Status: Passed
  Expected result: Vitest component tests pass.
  Actual result: Passed. 1 test file and 2 tests passed.

- Check: `docker compose run --rm web npm run lint`
  Type: Automated
  Status: Passed
  Expected result: TypeScript validation passes.
  Actual result: Passed.

- Check: `docker compose build`
  Type: Automated
  Status: Passed
  Expected result: Docker image builds from committed package and source files.
  Actual result: Passed. `caniello-web:latest` built successfully.

- Check: `docker compose up`
  Type: Behavior
  Status: Passed
  Expected result: Vite development server is reachable on `http://localhost:5173`.
  Actual result: Passed. Vite reported `Local: http://localhost:5173/`.

- Check: `docker run --rm -v /Users/macg/Code/caniello:/app -v /private/tmp/caniello-node-modules:/app/node_modules -w /app -e E2E_BASE_URL=http://127.0.0.1:5173 mcr.microsoft.com/playwright:v1.59.1-noble sh -lc 'npm ci && npm run test:e2e'`
  Type: UI
  Status: Passed
  Expected result: Playwright verifies the English mockup flow, valid waitlist submission, and screenshots on desktop and mobile.
  Actual result: Passed. 2 tests passed across Desktop Chrome and Pixel 7 profiles.

- Check: Manual scope-safety copy review
  Type: Security
  Status: Passed
  Expected result: The page avoids medical, diagnostic, clinic, marketplace, payment, and official passport replacement claims.
  Actual result: Passed. Copy remains organizational and includes explicit disclaimers.

- Check: Manual design-reference review against `spec/design/visual-artifacts/caniello-better-care-landing.png`
  Type: UI
  Status: Passed
  Expected result: The implementation follows the preferred validation-stage landing page direction from `spec/design/caniello-visual-direction.md`.
  Actual result: Passed after mockup-alignment revision. The page now follows the mockup's English header, hero, feature row, how-it-works section, waitlist card, and footer structure, using `src/assets/caniello-bruno-app-hero.png` and a cropped `src/assets/caniello-waitlist-pets.png` derived from the visual reference.

- Check: Manual logo review against `spec/design/visual-artifacts/caniello-dark-wordmark.png`
  Type: UI
  Status: Passed
  Expected result: The page uses a Caniello wordmark consistent with the provided brand artifact rather than an approximate CSS logo.
  Actual result: Passed after revision. `src/App.tsx` imports `src/assets/caniello-dark-wordmark.png` and renders it in the header and footer.

## Evidence

- Playwright desktop English screenshot: `spec/validation/screenshots/landing-landing-page-match-97a90-d-accepts-waitlist-interest-desktop-chromium/landing-english-desktop-chromium.png`
- Playwright desktop English success screenshot: `spec/validation/screenshots/landing-landing-page-match-97a90-d-accepts-waitlist-interest-desktop-chromium/landing-english-success-desktop-chromium.png`
- Playwright mobile English screenshot: `spec/validation/screenshots/landing-landing-page-match-97a90-d-accepts-waitlist-interest-mobile-chromium/landing-english-mobile-chromium.png`
- Playwright mobile English success screenshot: `spec/validation/screenshots/landing-landing-page-match-97a90-d-accepts-waitlist-interest-mobile-chromium/landing-english-success-mobile-chromium.png`
- Build evidence: `npm run build` passed in the Docker Compose web container.
- Unit test evidence: `npm run test` passed with 1 file and 2 tests.
- E2E evidence: `npm run test:e2e` passed with 2 Playwright project runs in the official Playwright container.
- Docker evidence: `docker compose build` and `docker compose up` both passed.
- Design evidence: desktop and mobile Playwright screenshots were visually checked against `spec/design/visual-artifacts/caniello-better-care-landing.png` after the mockup-alignment revision.
- Logo evidence: desktop Playwright screenshot shows the wordmark image in the header and footer after replacing the approximate CSS logo.

## Missing, Skipped, or Unavailable Checks

- Check: Persistent waitlist storage or analytics conversion tracking
  Reason: The accepted requirement left storage and analytics open, and the ExecPlan intentionally deferred them to avoid premature data collection and vendor decisions.
  Risk: The landing page can validate interaction locally, but production conversion measurement still needs a storage or analytics decision before launch traffic.

- Check: Deployment target validation
  Reason: No deployment target is approved yet.
  Risk: Local and Docker behavior is validated, but hosted production behavior remains untested.

- Check: `docker compose run --rm web npm run test:e2e`
  Reason: The app's Alpine-based container does not include compatible Playwright browser binaries by default.
  Risk: E2E validation should continue to use the official Playwright container, or the app image should explicitly install compatible browser dependencies before this command becomes a CI gate.

## Future CI/CD or Lifecycle Gates

- Gate: `npm run build`
  Trigger: Every pull request or pre-merge validation.
  Blocks: Merge when TypeScript or production build fails.

- Gate: `npm run test`
  Trigger: Every pull request or pre-merge validation.
  Blocks: Merge when landing page behavior tests fail.

- Gate: `npm run test:e2e`
  Trigger: Pull requests that affect UI, routing, language copy, or waitlist behavior.
  Blocks: Merge when Playwright cannot verify the primary landing page flow.

- Gate: Scope-safety copy review
  Trigger: Any change to landing page marketing copy.
  Blocks: Release when copy introduces medical, diagnostic, official passport replacement, clinic software, marketplace, booking, or payment claims without approved requirements.

- Gate: Conversion measurement review
  Trigger: Before sending real validation traffic to the landing page.
  Blocks: Launch when no approved analytics or waitlist storage approach exists.

## Result

Ready for human review

## Follow-Up

- Decide whether the first public validation should use analytics, persistent waitlist email capture, a survey link, or another conversion signal.
- Decide the deployment target for `https://caniello.com`.
- Revisit bilingual support later if Polish launch copy is still required after the mockup-matching pass.

## Human Decision

Accepted on 2026-05-14 by explicit human instruction to approve documents that can be approved as-is.
