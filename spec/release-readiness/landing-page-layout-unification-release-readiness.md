# Release Readiness: Landing Page Layout Unification

## Status

Draft

## Release Scope

This advisory review covers the `codex/caniello-mvp-milestone-0` branch as a release candidate for the landing-page layout unification work. The candidate shares the main landing page, Wave 2 Marketplace exploration page, and Wave 3 Clinic research page structure through common page sections while preserving research-specific copy, source attribution, waitlist capture behavior, responsive browser coverage, and removal of the redundant `Wroc do etapu Dzisiaj` research-page hero link.

This review does not approve merge, deployment, public launch traffic, production MailerLite use, legal copy, tags, announcements, or release completion.

## Source Artifacts

- Requirement: [Landing Page Segmented Validation](../requirements/landing-page-segmented-validation.md)
- Feature: [Landing Page Segmented Lead Capture](../features/landing-page-segmented-lead-capture.md)
- Story: [Landing Page Provider and Clinic Interest Capture](../stories/landing-page-provider-and-clinic-interest-capture.md)
- Story: [Landing Page Footer Legal and Responsive Trust](../stories/landing-page-footer-legal-and-responsive-trust.md)
- Design: [Caniello Visual Direction](../design/caniello-visual-direction.md)
- ADR: [Caniello MVP Stack](../architecture-records/caniello-mvp-stack.md)
- ExecPlan: [Caniello MVP Implementation Roadmap](../plans/caniello-mvp-implementation-roadmap.md)
- Validation: [Validation: Landing Page Layout Unification](../validation/landing-page-layout-unification-validation.md)
- Prior release-readiness context: [Landing Page Milestone 0](landing-page-milestone-0-release-readiness.md)
- Repository guidance: [README](../../README.md), [AGENTS](../../AGENTS.md)
- Implementation paths:
  - `src/components/CareStorySections.tsx`
  - `src/components/ResearchWavePage.tsx`
  - `src/pages/LandingPage.tsx`
  - `src/pages/MarketplacePage.tsx`
  - `src/pages/ClinicPage.tsx`
  - `src/App.test.tsx`
  - `tests/e2e/landing.spec.ts`
  - `spec/validation/screenshots/`

## Human Checkpoint State

- Landing Page Segmented Validation requirement status: `Accepted`.
- Landing Page Segmented Lead Capture feature status: `Accepted`.
- Landing Page Provider and Clinic Interest Capture story status: `Accepted`.
- Related footer/legal story is referenced by validation, but final legal copy remains outside this layout-unification release scope and still needs human/legal approval before public launch.
- Visual direction remains governed by human review; validation notes that Codex cannot accept the final visual direction.
- Validation artifact status: `Draft`; result says `Ready for human review`.
- Human decision on layout-unification validation evidence: Pending.
- Human release decision: Pending.
- Working tree state at review time: `git status --short --branch` showed the branch `codex/caniello-mvp-milestone-0...origin/codex/caniello-mvp-milestone-0` with no local modified, deleted, or untracked files before this release-readiness artifact was added.

## Validation and CI/CD Evidence

- Check: `docker compose run --rm web npm run lint`
  Status: Passed
  Evidence: Validation record reports `tsc -b --pretty false` completed successfully.

- Check: `docker compose run --rm web npm run test`
  Status: Passed
  Evidence: Validation record reports 12 Vitest tests passed, including absence checks for the removed research-page back link.

- Check: `docker compose run --rm web npm run build`
  Status: Passed
  Evidence: Validation record reports TypeScript project build and Vite production build completed successfully.

- Check: `docker compose run --rm web npm run test:e2e`
  Status: Passed
  Evidence: Validation record reports 8 Playwright tests passed on desktop Chromium and mobile Chromium for main landing, Wave 2, and Wave 3 flows.

- Check: Screenshot evidence
  Status: Manual Review Pending
  Evidence: Desktop and mobile screenshots are recorded under `spec/validation/screenshots/` for the main landing page, Wave 2 Marketplace exploration page, and Wave 3 Clinic research page.

- Check: CI/CD
  Status: Unavailable
  Evidence: No remote CI/CD or deployment-pipeline result was available in local repository context.

## Review Notes

- Product: The candidate keeps Wave 1 owner validation primary while preserving Wave 2 and Wave 3 as research-stage paths.
- Validation: Local automated gates passed for typecheck, unit tests, production build, and Playwright desktop/mobile flows.
- Quality: Shared layout components reduce duplicated page structure across the main, Marketplace, and Clinic pages while maintaining distinct waitlist sources for future-wave research pages.
- UX: Validation evidence says the redundant Polish back link was removed and compact spacing variants reduced excess research-page whitespace.
- Security and privacy: This release scope does not add new data-handling behavior beyond the existing landing lead and validation-event boundaries. Public lead capture still inherits the prior Milestone 0 risks around MailerLite smoke testing, legal copy, analytics storage, and deployment configuration.
- Review process: No independent review subagents were used because the human did not explicitly request subagents.

## Risks

- Risk: Human visual acceptance of the unified layout is still pending.
  Release impact: Blocks release approval until the human reviews the screenshot evidence or explicitly accepts the visual risk.

- Risk: Validation artifact is `Draft` and only `Ready for human review`.
  Release impact: Blocks treating validation as accepted release evidence until the human reviews it.

- Risk: CI/CD is not configured or evidenced.
  Release impact: Requires human acceptance for a manual gate process before merge/release, or follow-up CI setup before recurring releases.

- Risk: Public-launch risks from the broader Milestone 0 candidate remain unresolved, including live MailerLite subscriber mutation, placeholder Privacy Policy and Terms of Service, durable analytics or validation-event storage, deployment target, and production rollback path.
  Release impact: Blocks public launch unless those risks are resolved or explicitly scoped out for a private/local release decision.

## Rollback or Recovery

No production runtime or public deployment exists in the reviewed evidence, so production rollback is not currently applicable. If the candidate is reviewed only as a branch/local working tree, recovery is to defer merge, revise the branch, or leave the current repository state unreleased.

Before any public deployment, define the hosting target and rollback path. For a Vercel-style static landing deployment, acceptable recovery should include redeploying the previous known-good deployment, disabling public traffic if needed, and reverting the shared layout changes if the unified pages regress conversion or clarity.

## Advisory Readiness State

Ready with accepted risks.

The layout-unification candidate is ready for human release consideration for a branch merge or private/demo review, provided the human accepts the pending visual-review, draft-validation, manual CI/CD, and broader Milestone 0 public-launch risks. It is blocked for public launch until the inherited MailerLite, legal, analytics, deployment, and rollback risks are resolved or explicitly accepted within a limited release scope.

## Follow-Up

- Release-blocking for this layout candidate: human review of `spec/validation/landing-page-layout-unification-validation.md` and its desktop/mobile screenshot evidence.
- Release-blocking for governed evidence: decide whether the Draft validation artifact is accepted, needs revision, or should return to implementation.
- Release-blocking for public launch: resolve or explicitly scope out the prior Milestone 0 public-launch risks around MailerLite live mutation, legal placeholders, durable analytics/storage, deployment target, and rollback.
- Follow-up before recurring releases: add CI/CD gates for lint, unit tests, build, and Playwright.
- Follow-up quality improvement: keep screenshot review for main, Wave 2, and Wave 3 page parity as a gate for future shared-section changes.

## Human Decision

Pending

Human checkpoint: approve or revise the release scope, validation evidence, manual and CI/CD gate status, visual acceptance, public-launch risk handling, rollback plan, and next action. Codex may recommend readiness, but only a human can approve merge, release, deployment, launch traffic, deferral, or return to an earlier PDLC stage.
