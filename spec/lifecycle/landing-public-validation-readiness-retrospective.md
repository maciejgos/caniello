# Lifecycle Retrospective: Landing Public Validation Readiness

## Status

Draft

## Scope

This retrospective covers the preparation loop that moved the Caniello landing page from Milestone 0 validation and release-readiness blockers into a limited public market-validation soft-launch posture.

It does not cover post-launch market results, conversion metrics, user feedback, incidents, or support load because those have not been provided yet.

## Source Artifacts

- `spec/requirements/landing-page-segmented-validation.md`
- `spec/features/landing-page-segmented-lead-capture.md`
- `spec/stories/landing-page-footer-legal-and-responsive-trust.md`
- `spec/stories/cookie-consent-privacy-and-medical-boundaries.md`
- `spec/plans/caniello-mvp-implementation-roadmap.md`
- `spec/validation/landing-page-milestone-0-validation.md`
- `spec/validation/landing-legal-medical-minimum-data-validation.md`
- `spec/release-readiness/landing-page-milestone-0-release-readiness.md`
- `spec/release-readiness/landing-public-validation-readiness.md`
- `api/landing-leads.ts`
- `api/validation-events.ts`
- `src/content.ts`
- `src/pages/LegalPage.tsx`
- `src/App.test.tsx`
- `tests/e2e/landing.spec.ts`

## Expected Outcomes

The preparation loop was expected to make the landing page ready for limited public validation without expanding into the full product. The landing page needed to preserve Polish-first owner positioning, keep Wave 2 and Wave 3 as research-stage surfaces, collect only minimal lead data, keep MailerLite secrets server-side, provide accessible privacy/terms/medical-boundary pages, and document residual release risks without Codex self-approving launch.

## Observed Outcomes

The landing page reached an advisory state of `Ready with accepted risks` for a limited market-validation soft launch. Privacy, terms, and medical-boundary copy now cover the minimum landing data set for lead capture. The visible legal draft notice was removed. The human reported Vercel setup, deployed MailerLite smoke testing, and rollback/recovery setup as complete.

No post-launch evidence exists yet. Conversion, survey completion, traffic source quality, real MailerLite delivery quality, complaint volume, and user trust signals remain unmeasured.

## Evidence

- Evidence: Release readiness records `Ready with accepted risks` and human decision `Accepted`.
  Source: `spec/release-readiness/landing-public-validation-readiness.md`

- Evidence: Legal/privacy/medical validation records supported Privacy Policy, Terms, and Medical Boundaries coverage for limited public validation.
  Source: `spec/validation/landing-legal-medical-minimum-data-validation.md`

- Evidence: Automated checks passed: unit tests, lint, build, and Playwright E2E.
  Source: `spec/release-readiness/landing-public-validation-readiness.md`

- Evidence: Vercel environment setup, deployed MailerLite smoke test, and rollback/recovery setup were reported complete by the human but not independently inspected by Codex.
  Source: conversation and `spec/release-readiness/landing-public-validation-readiness.md`

- Evidence: No formal legal department review is available.
  Source: human statement and `spec/release-readiness/landing-public-validation-readiness.md`

- Evidence: No market metrics, user feedback, support tickets, incidents, or telemetry summaries have been provided.
  Source: current retrospective context

## Confirmed Assumptions

- The first public validation can stay narrow: lead capture, research-safe wave pages, and MailerLite survey follow-up are enough to start learning.
- The landing can remain data-minimal: MailerLite receives only the email and group membership, while role/wave segmentation waits for surveys.
- The medical boundary can be made explicit without weakening the product promise.
- Vercel plus server-side MailerLite API handling is an appropriate deployment shape for this landing slice.
- The PDLC artifacts helped expose release blockers early: legal copy, vendor wording, deployment setup, live smoke testing, rollback, and source-control hygiene.

## Disproven or Risky Assumptions

- Earlier readiness treated legal copy as a generic backlog item; in practice, it needed a concrete minimum-data checklist before publication.
- “Simple landing page” did not mean “no privacy posture needed.” Even a landing page with email capture needs controller, provider, retention, rights, consent, and transfer wording.
- Validation events are useful conceptually, but without a durable analytics sink they are not enough for rich funnel learning.
- Human-reported deployment and MailerLite smoke-test evidence is acceptable for a soft launch, but weaker than inspectable deployment evidence.
- No-formal-legal-review remains a risk that should not carry into paid service, account creation, health-record upload, or medical-document processing.

## Lessons Learned

The landing page is ready to learn from real visitors, but the next loop must be driven by observed behavior rather than more internal polishing. MailerLite signups, survey responses, traffic sources, and qualitative replies should become the primary evidence for whether the Wave 1 promise resonates.

The legal/privacy work should be treated as a product trust surface, not only compliance boilerplate. The medical-boundary page is especially important because Caniello works near health records while intentionally avoiding diagnosis and treatment advice.

Operational readiness can stay lightweight for soft launch, but it needs traceability. The current release should be committed intentionally, and the exact deployed version should be knowable if a privacy question, broken form, or copy issue appears after traffic starts.

Validation gates are strong locally but still manual. The absence of remote CI/CD is acceptable for this first soft launch, but it should not remain true as soon as public iteration begins.

## Follow-Up Recommendations

- Requirements: After the first validation window, update requirements only if user feedback changes the core problem, audience, trust bar, or acceptance criteria for Wave 1 owner value.
- Features: Use MailerLite survey results to decide whether the next feature emphasis is owner document organization, reminders, sharing, or another trust-building slice.
- Stories: Add a post-launch metrics review story covering signup count, source quality, survey completion, reply themes, and unsubscribe/complaint signals.
- Design / ADRs: Revisit analytics/storage ADRs if MailerLite alone is not enough to answer conversion and segmentation questions.
- Plans: Update `spec/plans/caniello-mvp-implementation-roadmap.md` after the first validation window with evidence-based sequencing for the next MVP slice.
- Implementation: Add `.env.example` with non-secret names and keep lead-capture behavior minimal until product scope expands.
- Validation: Add a future gate for deployed URL smoke testing, legal-route smoke testing, MailerLite test-lead verification, and screenshot capture from the actual deployed environment.
- Release Readiness: Before the next public iteration, include deployed URL evidence and remote CI/CD status or explicitly accept manual gates again.
- Process / Operations: Keep a lightweight launch log with date, URL, campaign/source, rollback status, MailerLite test email result, and any incidents or user complaints.

## Human Checkpoint

Pending human review.

Approve or revise this retrospective scope, evidence summary, lessons learned, and follow-up routing. The recommended next PDLC loop after launch is a validation-review loop based on real market evidence, followed by requirements or feature updates only if the evidence changes the problem framing or the next product slice.

