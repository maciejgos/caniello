# Release Readiness: Landing Public Validation

## Status

Accepted

## Release Scope

This advisory review covers publishing the current Caniello landing page for limited public market validation. The scope includes the Polish-first landing page, English switch, Wave 1 owner value, Wave 2 and Wave 3 research pages, privacy/terms/medical-boundary pages, consent-gated MailerLite lead capture, consent-gated validation events, and Vercel hosting as the intended deployment platform.

This review does not approve deployment, launch traffic, merge, tag, announcement, or legal acceptance. Only the human can accept the documented risks and decide to publish.

## Source Artifacts

- Requirement: `spec/requirements/landing-page-segmented-validation.md`
- Feature: `spec/features/landing-page-segmented-lead-capture.md`
- Story: `spec/stories/landing-page-footer-legal-and-responsive-trust.md`
- Story: `spec/stories/cookie-consent-privacy-and-medical-boundaries.md`
- ExecPlan: `spec/plans/caniello-mvp-implementation-roadmap.md`
- Validation: `spec/validation/landing-page-milestone-0-validation.md`
- Validation: `spec/validation/landing-legal-medical-minimum-data-validation.md`
- Prior release readiness: `spec/release-readiness/landing-page-milestone-0-release-readiness.md`
- Implementation:
  - `api/landing-leads.ts`
  - `api/validation-events.ts`
  - `src/content.ts`
  - `src/pages/LegalPage.tsx`
  - `src/App.tsx`
  - `src/App.test.tsx`
  - `tests/e2e/landing.spec.ts`

## Human Checkpoint State

- Prior Milestone 0 implementation, validation, and advisory release-readiness records were accepted by the human on 2026-05-14.
- The human supplied the data-controller identity and selected Vercel for hosting plus MailerLite for mailing list and surveys.
- The visible legal draft notice has been removed for publication readiness.
- The human reports Vercel environment setup, deployed MailerLite smoke testing, and rollback/recovery setup are complete.
- No external legal department review is available. If publishing now, the human must explicitly accept the residual legal/compliance risk.

## Validation and CI/CD Evidence

- Check: `docker compose run --rm web npm run test`
  Status: Passed
  Evidence: 2 test files passed, 12 tests passed on 2026-05-15.

- Check: `docker compose run --rm web npm run lint`
  Status: Passed
  Evidence: TypeScript build validation completed on 2026-05-15.

- Check: `docker compose run --rm web npm run build`
  Status: Passed
  Evidence: TypeScript and Vite production build completed on 2026-05-15.

- Check: `docker compose run --rm web npm run test:e2e`
  Status: Passed
  Evidence: 8 Playwright tests passed across desktop Chromium and mobile Chromium on 2026-05-15.

- Check: Legal/privacy/medical minimum-data validation
  Status: Passed
  Evidence: `spec/validation/landing-legal-medical-minimum-data-validation.md` records supported medical-boundary, Privacy Policy, and Terms coverage for limited public validation.

- Check: Live deployed Vercel environment
  Status: Manual
  Evidence: Human reports Vercel setup is complete. No deployed URL was inspected by Codex in this review.

- Check: Live MailerLite subscriber upsert from deployed Vercel
  Status: Manual
  Evidence: Human reports the deployed MailerLite smoke test is complete. Codex did not inspect the MailerLite account or deployed URL in this review.

- Check: Remote CI/CD
  Status: Unavailable
  Evidence: No hosted CI/CD result was available from local context.

## Review Notes

- Product: The landing page is appropriate for market validation. It clearly frames Wave 1 as the current owner value and Wave 2/Wave 3 as research.
- Medical safety: The visible medical-boundary copy is strong enough for a validation landing page. It says Caniello does not diagnose, does not recommend treatment, does not replace a veterinarian, and does not replace an official pet passport.
- Privacy: The Privacy Policy includes controller identity, contact, no-DPO state, data categories, purposes, consent basis, planned providers, EEA/non-EEA transfer mechanism framing, retention, voluntary email provision, automated-decision boundary, rights, and UODO complaint path.
- Terms: The Terms explain landing scope, unavailable product scope, technical requirements, unlawful-content prohibition, and complaint/report handling.
- Data minimization: Landing lead capture sends only the email to MailerLite for group membership; role and wave segmentation are deferred to a later MailerLite survey.
- Security: MailerLite API access stays server-side. The human reports Vercel/MailerLite setup and rollback are complete; account MFA and secret handling remain human-operated controls not inspected by Codex.
- Analytics: Validation events are consent-gated but are not yet backed by a durable analytics sink. Market validation can still proceed through MailerLite signups and UTM/source attribution if the human accepts weaker behavioral analytics.

## Risks

- Risk: No formal legal review.
  Release impact: Does not have to block a limited soft launch if the human accepts the risk, but it should block broad paid launch, medical-data collection, or claims beyond the current landing scope.

- Risk: Vercel and MailerLite DPA/subprocessor terms were checked at a high level but not formally recorded as accepted by the human.
  Release impact: Requires human acceptance for limited public validation; should be revisited before broader launch or sensitive-data collection.

- Risk: No durable analytics sink.
  Release impact: Does not block validation if the primary metric is MailerLite signups and survey responses; blocks richer funnel analytics.

- Risk: No remote CI/CD evidence.
  Release impact: Does not block a manual soft launch, but must be accepted as an operational risk.

- Risk: Vercel account/security setup and MailerLite smoke test were reported by the human but not independently inspected by Codex.
  Release impact: Does not block if the human accepts manual verification as sufficient for this soft launch.

- Risk: Current working tree has uncommitted changes, including screenshot updates from Playwright.
  Release impact: Requires intentional staging/commit before a clean source-controlled release.

## Rollback or Recovery

For a Vercel-hosted landing page, the recovery path should be:

- redeploy the previous known-good Vercel deployment if the new page breaks;
- remove or rotate `MAILERLITE_API_KEY` to disable live lead capture if the integration misbehaves;
- keep MailerLite export available for any leads collected during the test window;
- pause public traffic or remove campaign links if legal/privacy copy needs correction;
- keep the current source branch available so the exact published version can be traced.

## Advisory Readiness State

Ready with accepted risks.

The current state is not a clean, compliance-perfect public launch. It is ready for a limited market-validation soft launch if the human accepts the named legal, vendor, deployment, analytics, and operational risks. The remaining preflight work is source-control hygiene for a traceable release.

## Follow-Up

Release-blocking before soft launch unless explicitly accepted:

- Human acceptance of no-formal-legal-review risk for limited public validation.
- Intentional source-control staging/commit of the release scope.

Follow-up after launch:

- Add `.env.example` with non-secret env names.
- Add remote CI/CD gates for test, lint, build, and Playwright.
- Decide whether MailerLite signups are sufficient for validation analytics or whether a durable analytics sink is needed.
- Consider a lightweight legal review before paid features, health-record upload, account creation, or any medical-document processing.

## Human Decision

Accepted

Record the explicit human decision when provided. Do not mark release approved, deployed, announced, or complete without explicit human approval.
