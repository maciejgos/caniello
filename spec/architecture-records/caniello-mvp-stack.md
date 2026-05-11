# Caniello MVP Stack

## Status

Accepted

## Context

Caniello's MVP must support a focused pet health and care organization product: owner-facing web and mobile experiences, pet profiles, reminders, document vault, AI-assisted document intake and review, trusted sharing, waitlist and marketing email, payments, and back-office beta operations.

The stack needs to be practical for a small MVP team while leaving room for secure handling of pet records, uploaded documents, authentication, storage, operational audit trails, and future paid plans. The current product artifacts define Caniello as a focused owner utility, not a clinic system, marketplace, AI diagnosis tool, or official pet passport replacement.

## Decision

Caniello's MVP stack is:

- React for the web application.
- React Native for the mobile MVP.
- Python with FastAPI for the backend.
- Vercel for deployment.
- Supabase for Postgres, Auth, and Storage.
- Stripe for payments.
- MailerLite for marketing and waitlist email.

This stack is accepted for the MVP because it fits the current scope: pet health records, reminders, document vault, trusted sharing, waitlist acquisition, and beta operations.

## Consequences

React and React Native let the web and mobile products share product patterns while still respecting platform differences such as camera-first document scanning and mobile notifications.

FastAPI gives Caniello a Python backend suited to AI/OCR orchestration, document-processing workflows, integrations, validation logic, and server-side safety boundaries. Backend responsibilities should remain server-side; AI provider secrets, file-processing logic, audit behavior, and sensitive integrations should not live in frontend code.

Vercel becomes the deployment target for the web experience and related deployment workflow. Because normal Python FastAPI applications do not run as Vercel Edge Functions, implementation planning must define whether FastAPI is deployed as Vercel-hosted serverless/serverful Python functions, a separate backend service, or another Vercel-compatible runtime pattern.

Supabase owns core persistence, authentication, and object storage for the MVP. Future design work must define schema ownership, migrations, row-level security, storage bucket policies, backup/recovery expectations, retention, local development setup, and CI/CD validation checks.

Stripe is the accepted payment provider for Caniello when payments enter scope, but payment implementation remains deferred from the earliest owner-facing MVP stories unless the human explicitly prioritizes subscription or paid-plan work.

MailerLite owns marketing and waitlist email workflows. Product transactional email such as auth, verification, reminders, exports, and operational notifications must be assigned clearly during design; they should not be assumed to belong to MailerLite unless that decision is made explicitly.

Open architecture decisions remain for AI/OCR provider choice, background job execution, mobile push notifications, observability, audit-log retention, share-link security, and the exact boundary between Vercel, FastAPI, Supabase, Stripe, and MailerLite.

This ADR accepts the stack direction, not the full implementation architecture. The system is not ready for implementation planning until the follow-up architecture decisions below are resolved or explicitly deferred by a human.

Follow-up ADRs should capture:

- Platform topology and deployment boundaries for React, React Native, FastAPI, Vercel, environments, preview deployments, rollback, and backend hosting.
- Identity and access model for owner auth, admin auth, MFA, RBAC, privileged sessions, and audit behavior.
- AI document intake pipeline for signed uploads, queue/worker execution, OCR/AI provider boundary, retry behavior, status tracking, and human review handoff.
- Data ownership and GDPR lifecycle for raw uploads, extracted fields, confirmed records, audit logs, share artifacts, exports, deletion, retention, and backups.
- Sharing and export model for share-link token scope, revocation, optional expiry, access logging, PDF generation, and storage.
- Messaging strategy for separating MailerLite marketing/waitlist email from transactional auth, reminder, export, and operational email.
- Payments strategy for when Stripe is introduced, what remains free, and how billing state affects owner-facing and back-office behavior.
- Observability and operations for job monitoring, failure handling, alerting, support visibility, incident response, and recovery expectations.

## Related Artifacts

- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)
- [Back Office MVP Requirement](../requirements/back-office-mvp.md)
- [Owner Account and Privacy Foundation](../features/owner-account-privacy-foundation.md)
- [Pet Onboarding and Owner Workspace](../features/pet-onboarding-and-workspace.md)
- [AI Document Intake and Review](../features/ai-document-intake-and-review.md)
- [Care Timeline and Reminders](../features/care-timeline-and-reminders.md)
- [Ask Caniello Sourced Assistant](../features/ask-caniello-sourced-assistant.md)
- [Care Summary Sharing](../features/care-summary-sharing.md)
- [Back Office Access Control](../features/back-office-access-control.md)
- [Back Office AI Review Queue](../features/back-office-ai-review-queue.md)
- [Back Office Health, Audit, and AI Safety](../features/back-office-health-audit-and-ai-safety.md)
