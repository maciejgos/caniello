# Release Readiness: Landing SPA Direct URL Routing

## Status

Draft

## Release Scope

This advisory review covers releasing the SPA direct URL routing fix and React routing refactor for the Caniello landing page. The release scope includes React Router route ownership, internal client-side route links, the Vercel rewrite fallback, direct URL Playwright coverage for legal and research pages, and the English Wave 2 wording adjustment from active marketplace language to research-framed trusted services language.

This review does not approve merge, deployment, paid traffic, or launch communications. Only the human can approve release or production deployment.

## Source Artifacts

- Requirement: `spec/requirements/landing-page-segmented-validation.md`
- Story: `spec/stories/landing-page-footer-legal-and-responsive-trust.md`
- Story: `spec/stories/landing-page-future-waves-research-framing.md`
- Validation: `spec/validation/landing-spa-direct-url-validation.md`
- Prior release readiness: `spec/release-readiness/landing-public-validation-readiness.md`
- Implementation:
  - `vercel.json`
  - `package.json`
  - `package-lock.json`
  - `tests/e2e/landing.spec.ts`
  - `src/App.tsx`
  - `src/components/SiteHeader.tsx`
  - `src/components/SiteFooter.tsx`
  - `src/components/WaitlistForm.tsx`
  - `src/components/WaveStorySection.tsx`
  - `src/content.ts`
  - `src/pages/MarketplacePage.tsx`

## Human Checkpoint State

- The human identified the direct production 404 issue and recommended a Vercel SPA rewrite fallback.
- Prior public-validation readiness was accepted, but this new routing fix has not yet received explicit human release approval.
- The validation artifact for this fix is Draft and ready for human review.

## Validation and CI/CD Evidence

- Check: `docker compose run --rm web npm run test`
  Status: Passed
  Evidence: 2 test files passed, 12 tests passed.

- Check: `docker compose run --rm web npm run build`
  Status: Passed
  Evidence: TypeScript and Vite production build completed successfully.

- Check: `docker compose run --rm web npm run test:e2e`
  Status: Passed
  Evidence: 10 Playwright tests passed across desktop Chromium and mobile Chromium, including direct URL checks for `/privacy`, `/terms`, `/medical-boundaries`, `/marketplace`, and `/clinics`.

- Check: Live production caniello.com verification
  Status: Unavailable
  Evidence: The fix has not been deployed in this Codex session, so production URLs still require post-deploy verification.

## Review Notes

- Product: The direct URL fix supports footer links, campaign links, refreshes, and new-tab behavior for legal and research pages.
- Engineering: `src/App.tsx` now uses React Router declarative routes instead of manual `window.location.pathname` branching, internal route links use `Link`, and legacy `/wave-*` paths redirect to canonical `/marketplace` and `/clinics` routes.
- Validation: E2E coverage now explicitly protects the five direct application URLs that were reported as 404.
- Copy: English Wave 2 naming now reads as `Trusted Services Research` and `Explore Services Research`, with page copy describing trusted service discovery research instead of an active marketplace product.
- Security/privacy: No new data collection path or secret handling was introduced.
- Operations: `vercel.json` is the appropriate Vercel-side fallback for a static SPA, but the public domain must be checked after deployment.

## Risks

- Risk: Production has not yet been redeployed with `vercel.json`.
  Release impact: Blocks confirmation that public 404s are fixed; deploy and verify before paid traffic.

- Risk: `react-router-dom` adds a new runtime dependency.
  Release impact: Low risk after passing unit, build, and e2e checks; dependency should remain covered by lockfile and Docker build.

- Risk: Real MailerLite/API production smoke tests were not run in this session.
  Release impact: Requires human/operator verification before paid traffic; does not block releasing the routing config itself.

- Risk: Current working tree includes generated Playwright screenshot updates and an unrelated untracked lifecycle file.
  Release impact: Requires intentional staging so the release includes only desired files.

## Rollback or Recovery

If the rewrite causes unexpected production behavior, revert `vercel.json` or roll back to the previous Vercel deployment. Because the change is configuration-only and does not alter persisted user data, rollback is straightforward. If form behavior fails after deployment, pause traffic and disable or roll back the deployment while preserving any MailerLite leads already collected.

## Advisory Readiness State

Ready for human release approval

The local implementation, build, unit tests, and Playwright checks are complete enough for a human release decision. Production verification remains a required post-deploy check before paid traffic.

## Follow-Up

- Deploy the branch to Vercel.
- Verify `/privacy`, `/terms`, `/medical-boundaries`, `/marketplace`, and `/clinics` on both `caniello.com` and `www.caniello.com`.
- Smoke test hero, footer, Wave 2, and Wave 3 form submissions against production API/provider configuration.
- Stage only intentional source, spec, and screenshot changes before committing.

## Human Decision

Pending
