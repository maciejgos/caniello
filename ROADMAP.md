# Caniello Roadmap

This roadmap is the lightweight navigation layer for current Caniello work. The governed source of truth remains the PDLC artifact set under `spec/`, especially the active ExecPlan at `spec/plans/caniello-mvp-implementation-roadmap.md`.

Status values:

- `Done`: implemented, validated, or accepted according to linked evidence.
- `InProgress`: active or next implementation/review focus.
- `Todo`: planned but not started, or intentionally deferred.

## Milestones

### Milestone 0: Landing Page - `InProgress`

Source:

- `spec/plans/caniello-mvp-implementation-roadmap.md`
- `spec/design/visual-artifacts/landing/`
- `spec/validation/landing-page-validation-history.md`
- `spec/release-readiness/landing-page-release-readiness-history.md`
- `spec/lifecycle/landing-page-lifecycle-history.md`

#### Feature: Landing Page MVP Value Experience - `Done`

- Story: `polish-first-language-switching` - `Done`
- Story: `landing-page-hero-and-mvp-value` - `Done`
- Story: `landing-page-future-waves-research-framing` - `Done`
- Story: `landing-page-footer-legal-and-responsive-trust` - `Done`

#### Feature: Landing Page Segmented Lead Capture - `Done`

- Story: `landing-page-owner-waitlist-capture` - `Done`
- Story: `landing-page-provider-and-clinic-interest-capture` - `Done`
- Story: `landing-page-mailerlite-subscriber-upsert` - `Done`
- Story: `landing-page-consent-and-analytics-policy-baseline` - `Done`

#### Feature: Landing Page Validation Instrumentation - `Done`

- Story: `landing-page-validation-events-and-utm-capture` - `Done`

#### Feature: Public-Launch Legal and Medical Boundaries - `Done`

- Story: Privacy Policy content and route - `Done`
- Story: Terms of Service content and route - `Done`
- Story: Medical-boundary copy for no diagnosis, no medical advice, no veterinarian replacement, and no official passport replacement - `Done`
- Story: Working footer links before public traffic - `Done`

### Milestone 1: Architecture and Platform Readiness - `Done`

Source:

- `spec/architecture-records/0001-use-typescript-nextjs-monorepo.md`
- `spec/architecture-records/0013-use-vercel-nextjs-platform-topology.md`
- `spec/architecture-records/0014-use-supabase-auth-minimal-rbac-and-audit.md`
- `spec/architecture-records/0015-use-supabase-data-lifecycle-and-rls.md`
- `spec/architecture-records/0016-use-staged-ai-document-intake-pipeline.md`
- `spec/architecture-records/0017-use-scoped-share-tokens-and-deferred-pdf-export.md`
- `spec/architecture-records/0018-use-mailerlite-for-marketing-and-defer-transactional-email.md`
- `spec/architecture-records/0019-use-vercel-supabase-observability-and-mvp-recovery.md`
- `spec/architecture-records/0020-defer-stripe-payments-until-paid-plan-stories.md`
- `spec/architecture-records/0021-use-vercel-ai-gateway-for-ai-provider-routing.md`

#### Feature: Platform Topology and Deployment Boundary - `Done`

- Story: One Next.js App Router web app on Vercel - `Done`
- Story: pnpm workspaces and Turborepo monorepo standard - `Done`
- Story: Dev Container local-development baseline - `Done`

#### Feature: Identity, Data, AI, Sharing, Messaging, and Operations Decisions - `Done`

- Story: Supabase Auth, minimal RBAC, MFA expectation, and audit behavior - `Done`
- Story: Supabase data lifecycle, migrations, RLS, export/deletion, and recovery expectations - `Done`
- Story: Staged AI document intake pipeline - `Done`
- Story: Vercel AI Gateway provider-routing boundary - `Done`
- Story: Scoped share tokens and deferred PDF export - `Done`
- Story: MailerLite marketing/waitlist scope with transactional email deferred - `Done`
- Story: Vercel/Supabase observability and MVP recovery posture - `Done`
- Story: Stripe deferred until paid-plan stories are approved - `Done`

### Milestone 2: Local Platform Foundation - `Done`

Source:

- `spec/validation/milestone-2-platform-foundation-validation.md`
- `spec/plans/caniello-mvp-implementation-roadmap.md`

#### Feature: Owner Account Privacy Foundation - `Done`

- Story: `account-signup-login-and-session` platform prerequisites - `Done`
- Story: Health/version API contracts and routes - `Done`
- Story: Supabase environment helpers and non-secret configuration placeholders - `Done`

#### Feature: Pet Onboarding and Workspace Platform Prerequisites - `Done`

- Story: First migration skeleton for owner data tables and RLS boundaries - `Done`
- Story: Platform-foundation validation gate in CI workflow - `Done`
- Story: Tests for health/version routes, contracts, Supabase helpers, and migration/RLS presence - `Done`

### Milestone 3: Web MVP Owner Foundation - `Todo`

Source:

- `spec/features/owner-account-privacy-foundation.md`
- `spec/features/pet-onboarding-and-workspace.md`
- `spec/design/visual-artifacts/mvp/backlog.md`
- `spec/design/visual-artifacts/mvp/`

#### Feature: Owner Account Privacy Foundation - `Todo`

- Story: `account-signup-login-and-session` - `Todo`
- Story: `cookie-consent-privacy-and-medical-boundaries` - `Todo`
- Story: `polish-first-language-switching` in authenticated owner flows - `Todo`
- Story: `data-export-and-account-deletion` - `Todo`

#### Feature: Pet Onboarding and Workspace - `Todo`

- Story: `create-first-pet-profile` - `Todo`
- Story: `onboarding-first-document-choice` - `Todo`
- Story: `home-whats-next-workspace` - `Todo`

### Milestone 4: Web MVP Document Memory Loop - `Todo`

Source:

- `spec/features/ai-document-intake-and-review.md`
- `spec/features/care-timeline-and-reminders.md`

#### Feature: AI Document Intake and Review - `Todo`

- Story: `upload-or-scan-document` - `Todo`
- Story: `document-processing-status` - `Todo`
- Story: `review-edit-confirm-extraction` - `Todo`
- Story: `documents-library-and-detail` - `Todo`

#### Feature: Care Timeline and Reminders - `Todo`

- Story: `timeline-from-confirmed-records` - `Todo`
- Story: `reminder-suggestions-and-management` - `Todo`
- Story: `reminder-notification-preferences` - `Todo`

### Milestone 5: Web MVP Assistant and Sharing - `Todo`

Source:

- `spec/features/ask-caniello-sourced-assistant.md`
- `spec/features/care-summary-sharing.md`

#### Feature: Ask Caniello Sourced Assistant - `Todo`

- Story: `ask-caniello-chat-with-sources` - `Todo`
- Story: `ask-caniello-medical-safety` - `Todo`

#### Feature: Care Summary Sharing - `Todo`

- Story: `care-summary-preview` - `Todo`
- Story: `share-link-pdf-export-and-revocation` - `Todo`

### Milestone 6: Mobile MVP - `Todo`

Source:

- `spec/architecture-records/0007-use-react-native-expo-for-mobile.md`
- `apps/mobile`

#### Feature: Mobile Owner Core Loop - `Todo`

- Story: Reuse account signup, language switching, pet profile, onboarding, document upload/scan, review, home, timeline, reminders, Ask Caniello, and sharing stories with mobile-specific acceptance criteria - `Todo`
- Story: Mobile camera-first document capture and permission handling - `Todo`
- Story: Mobile E2E strategy after the Expo scaffold is ready - `Todo`

### Milestone 7: Back Office MVP - `Todo`

Source:

- `spec/requirements/back-office-mvp.md`
- `spec/features/back-office-access-control.md`
- `spec/features/back-office-support-console.md`
- `spec/features/back-office-ai-review-queue.md`
- `spec/features/back-office-health-audit-and-ai-safety.md`
- `spec/design/visual-artifacts/back-office/backlog.md`
- `spec/design/visual-artifacts/back-office/`

#### Feature: Back Office Access Control - `Todo`

- Story: `back-office-admin-auth-and-rbac` - `Todo`

#### Feature: Back Office Support Console - `Todo`

- Story: `back-office-dashboard-and-system-health` - `Todo`
- Story: `back-office-global-search-and-user-detail` - `Todo`
- Story: `back-office-support-actions-and-notes` - `Todo`

#### Feature: Back Office AI Review Queue - `Todo`

- Story: `back-office-review-queue-triage` - `Todo`
- Story: `back-office-review-detail-actions` - `Todo`

#### Feature: Back Office Health, Audit, and AI Safety - `Todo`

- Story: `back-office-audit-log-and-ai-safety` - `Todo`

### Milestone 8: Hardening, CI/CD, Release Readiness - `Todo`

Source:

- `spec/validation/`
- `spec/release-readiness/`
- `spec/lifecycle/`

#### Feature: Validation and CI/CD Gates - `Todo`

- Story: Full web build, lint, test, migration, and E2E gates - `Todo`
- Story: Seeded owner and admin E2E fixtures - `Todo`
- Story: Validation evidence for each release slice - `Todo`

#### Feature: Release Readiness and Lifecycle Learning - `Todo`

- Story: Release-readiness records before human release decisions - `Todo`
- Story: Rollback, recovery, observability, backup, and restore evidence - `Todo`
- Story: Lifecycle retrospective notes after release, incident, or sustained beta usage - `Todo`
