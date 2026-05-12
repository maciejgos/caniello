# Release Readiness: Landing Page Milestone 0

## Status

Draft

## Release Scope

This advisory review covers the `codex/caniello-mvp-milestone-0` branch as a release candidate for the segmented Caniello landing-page validation slice. The candidate updates the existing React, TypeScript, Vite, TailwindCSS landing page with Polish-first language switching, owner waitlist capture, Wave 2 and Wave 3 research-interest capture, lead-capture consent, analytics consent, server-side MailerLite lead submission, validation-event API routing, UTM preservation, footer/legal placeholders, and refreshed responsive Playwright evidence.

This review does not approve merge, deployment, public launch traffic, production MailerLite configuration, legal copy, analytics sink selection, tags, announcements, or release completion.

## Source Artifacts

- Requirement: [First Landing Page](../requirements/first-landing-page.md)
- Requirement: [Landing Page Segmented Validation](../requirements/landing-page-segmented-validation.md)
- Feature: [Landing Page MVP Value Experience](../features/landing-page-mvp-value-experience.md)
- Feature: [Landing Page Segmented Lead Capture](../features/landing-page-segmented-lead-capture.md)
- Feature: [Landing Page Validation Instrumentation](../features/landing-page-validation-instrumentation.md)
- Stories:
  - [Polish-First Language Switching](../stories/polish-first-language-switching.md)
  - [Landing Page Consent and Analytics Policy Baseline](../stories/landing-page-consent-and-analytics-policy-baseline.md)
  - [Landing Page Hero and MVP Value](../stories/landing-page-hero-and-mvp-value.md)
  - [Landing Page Future Waves Research Framing](../stories/landing-page-future-waves-research-framing.md)
  - [Landing Page Footer Legal and Responsive Trust](../stories/landing-page-footer-legal-and-responsive-trust.md)
  - [Landing Page Owner Waitlist Capture](../stories/landing-page-owner-waitlist-capture.md)
  - [Landing Page Provider and Clinic Interest Capture](../stories/landing-page-provider-and-clinic-interest-capture.md)
  - [Landing Page MailerLite Subscriber Upsert](../stories/landing-page-mailerlite-subscriber-upsert.md)
  - [Landing Page Validation Events and UTM Capture](../stories/landing-page-validation-events-and-utm-capture.md)
- Design: [Caniello Visual Direction](../design/caniello-visual-direction.md)
- ADR: [Caniello MVP Stack](../architecture-records/caniello-mvp-stack.md)
- ExecPlan: [Caniello MVP Implementation Roadmap](../plans/caniello-mvp-implementation-roadmap.md)
- Validation: [Validation: Landing Page Milestone 0](../validation/landing-page-milestone-0-validation.md)
- Repository guidance: [README](../../README.md), [AGENTS](../../AGENTS.md)
- Implementation paths:
  - `README.md`
  - `api/landing-leads.ts`
  - `api/validation-events.ts`
  - `src/App.tsx`
  - `src/components/WaitlistForm.tsx`
  - `src/content.ts`
  - `src/lib/landing-leads.ts`
  - `src/lib/validation-events.ts`
  - `src/App.test.tsx`
  - `tests/e2e/landing.spec.ts`
  - `tsconfig.node.json`
  - `spec/validation/screenshots/`

## Human Checkpoint State

- Landing-page segmented validation requirement status: `Accepted`.
- Landing-page feature and story statuses used for this release scope: `Accepted`.
- Stack ADR status: `Accepted`.
- Visual direction status: `Draft`; the validation record notes human visual feedback was incorporated, but this design artifact itself is not accepted.
- ExecPlan progress records human approval to begin Milestone 0 implementation on 2026-05-12.
- Validation artifact status: `Ready for human review`.
- Human decision on Milestone 0 implementation scope, validation evidence, and whether to proceed: Pending.
- Human release decision: Pending.
- Working tree state at review time: implementation files, validation artifact, screenshot evidence, and this release-readiness artifact are uncommitted; old first-landing-page screenshot files are deleted and replaced by refreshed Milestone 0 screenshot folders.

## Validation and CI/CD Evidence

- Check: `docker compose run --rm web npm run test`
  Status: Passed
  Evidence: Validation record reports Vitest passed with 1 test file and 5 tests passed.

- Check: `docker compose run --rm web npm run lint`
  Status: Passed
  Evidence: Validation record reports `tsc -b --pretty false` completed successfully.

- Check: `docker compose run --rm web npm run build`
  Status: Passed
  Evidence: Validation record reports TypeScript and Vite production build completed and emitted `dist/` assets.

- Check: `docker run --rm -v /Users/macg/Code/caniello:/work -v /private/tmp/caniello-node-modules:/work/node_modules -w /work mcr.microsoft.com/playwright:v1.59.1-noble sh -lc 'npm ci && npm run test:e2e'`
  Status: Passed
  Evidence: Validation record reports 2 Playwright tests passed across desktop Chromium and mobile Chromium, with screenshots saved under `spec/validation/screenshots/`.

- Check: `docker compose run --rm web npm run test:e2e`
  Status: Unavailable
  Evidence: The Alpine app container could not launch the downloaded Playwright fallback browser. Official Playwright container validation was used instead.

- Check: Live MailerLite subscriber create/update against Caniello groups
  Status: Unavailable
  Evidence: `MAILERLITE_API_KEY` and MailerLite group IDs were not available in the implementation environment.

- Check: Durable analytics or validation-event storage
  Status: Future Gate
  Evidence: `/api/validation-events` accepts sanitized event payloads, but durable storage or analytics sink selection remains undecided.

- Check: CI/CD
  Status: Unavailable
  Evidence: No remote CI/CD or deployment-pipeline result was available in local repository context.

- Check: Legal copy approval
  Status: Pending
  Evidence: Validation record states privacy and terms content remain placeholders requiring human/legal approval before public launch.

## Review Notes

- Product: The candidate stays within the accepted landing-page validation scope: Wave 1 owner value is active, while Wave 2 provider and Wave 3 clinic/vet paths are explicitly research-stage.
- Validation: Local automated gates passed for unit tests, typecheck, production build, and Playwright UI flows through the official Playwright runtime.
- Security and privacy: MailerLite secrets are kept behind `api/landing-leads.ts`, lead submissions require explicit lead consent, and non-essential validation events are blocked before analytics consent. Live data-handling behavior still needs deployment-environment verification.
- Architecture: The implementation introduces serverless-style API boundaries for lead capture and validation events without expanding into product-app backend, auth, clinic SaaS, marketplace, payments, AI diagnosis, or official passport-replacement scope.
- Quality: Tests cover Polish default, English switching, consent blocking, segmented payloads, source attribution, UTM preservation, validation events, and responsive screenshots. Automated owner-source coverage is still partial for mid-page and footer forms.
- Review process: No independent review subagents were used because the human did not explicitly request subagents.

## Risks

- Risk: Live MailerLite create/update, group assignment, and custom-field mapping are unverified.
  Release impact: Blocks public lead-capture launch until deployment secrets and group IDs are configured and smoke-tested, unless a human explicitly accepts a no-live-capture release mode.

- Risk: Privacy Policy and Terms of Service are placeholders.
  Release impact: Blocks public launch with lead capture or analytics until approved legal copy exists, or requires explicit human acceptance of a limited private-preview scope.

- Risk: Durable validation-event storage or analytics provider is not selected.
  Release impact: Blocks public validation traffic if conversion measurement is required for the release objective; can become follow-up only for a visual/demo release.

- Risk: Direct Playwright execution in the app's Alpine Docker service is unavailable.
  Release impact: Does not block this candidate because official Playwright container validation passed, but it should be resolved or documented for contributor parity.

- Risk: CI/CD is not configured or evidenced.
  Release impact: Requires human acceptance for a manual gate process before merge/release, or follow-up CI setup before recurring releases.

- Risk: Validation artifact is `Ready for human review`, not human accepted.
  Release impact: Blocks treating validation as accepted release evidence until the human reviews it.

- Risk: The release candidate is uncommitted and includes deleted old screenshots plus new untracked API, helper, validation, screenshot, and readiness files.
  Release impact: Blocks merge/deployment until the candidate scope is reviewed and intentionally staged.

## Rollback or Recovery

No production runtime or public deployment exists in the reviewed evidence, so production rollback is not currently applicable. If the candidate is only reviewed as a branch/local working tree, recovery is to defer merge, revise the branch, or leave the current repository state unreleased.

Before any production deployment, define the hosting target and rollback path. For a Vercel-style landing deployment, acceptable recovery should include redeploying the previous known-good deployment, disabling the lead-capture API route or MailerLite credentials if needed, and reverting to the prior static landing candidate if the segmented release misbehaves.

## Advisory Readiness State

Blocked for public release.

The candidate is ready for human review of the Milestone 0 implementation and validation evidence, but public release is blocked by pending human acceptance, unverified MailerLite production configuration, placeholder legal copy, missing durable analytics/storage decision for validation events, absent CI/CD evidence, and an undefined production rollback path.

For a local branch review or private demo with no public lead capture, the candidate could move to human approval with these risks explicitly scoped and accepted.

## Follow-Up

- Release-blocking for public launch: configure and smoke-test `MAILERLITE_API_KEY` plus all MailerLite group IDs and custom fields.
- Release-blocking for public launch: replace privacy and terms placeholders with approved legal copy.
- Release-blocking for validation traffic: decide and verify durable analytics or validation-event storage, or explicitly approve a non-durable validation phase.
- Release-blocking for deployment: define hosting target, environment variable handling, and rollback/recovery path.
- Release-blocking for governed evidence: human review of `spec/validation/landing-page-milestone-0-validation.md`.
- Release-blocking for merge/deploy: review `git status --short`, deleted old screenshots, new screenshots, untracked API/helper files, and intentionally stage only the candidate scope.
- Follow-up before recurring releases: add CI/CD gates for lint, unit tests, build, and Playwright.
- Follow-up quality improvement: expand automated owner-source payload tests for mid-page and footer forms.
- Follow-up developer experience: resolve or document Playwright execution outside the Alpine app container.

## Human Decision

Pending

Human checkpoint: approve or revise the release scope, validation evidence, manual and CI/CD gate status, security/privacy/legal posture, MailerLite and analytics readiness, rollback plan, accepted risks, and next action. Codex may recommend readiness, but only a human can approve merge, release, deployment, launch traffic, deferral, or return to an earlier PDLC stage.
