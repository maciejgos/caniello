# Requirement: Back Office MVP

## Status

Accepted

## Problem

Caniello needs a back office that lets the founder and authorized beta operators run the early product safely. The owner-facing MVP will handle sensitive pet records, uploaded veterinary documents, AI extraction, reminders, sharing, and support needs. Without controlled operational tooling, the team cannot review AI extraction quality, investigate failed jobs, support users, manage sensitive data actions, or monitor safety risks responsibly.

The back office should support beta operations and AI review, not become a broad enterprise admin system or clinic portal.

## Goals

- Allow only authorized admins to access operational data.
- Separate back-office responsibilities through roles such as Owner, Admin, Reviewer, Support, and Read-only.
- Provide an operational dashboard for users, pets, uploaded documents, pending reviews, failed jobs, AI status, reminders, notifications, and system health.
- Let support users search and inspect users, pets, documents, reminders, household data, sharing state, and account status.
- Let reviewers validate AI extraction results by comparing source documents with extracted fields and confidence scores.
- Allow permitted reviewers or admins to approve, edit, flag, or request reprocessing for documents.
- Surface failed AI/OCR jobs and allow permitted admins to retry or investigate them.
- Support basic user-account actions such as resending email verification, disabling accounts, viewing deletion requests, and supporting data export requests.
- Record sensitive back-office actions in an audit log.
- Provide basic AI safety visibility for medical disclaimer coverage, unsafe outputs, and flagged prompts or answers.

## Non-Goals

- Replacing a customer-support platform, knowledge base, or full helpdesk in the first MVP.
- Building a partner, clinic, groomer, trainer, or petsitter management portal.
- Building billing operations beyond lightweight visibility unless payments are introduced.
- Building advanced experimentation, feature-flag management, anomaly alerts, legal workflow, data-retention tooling, or infrastructure cost dashboards.
- Allowing unrestricted admin edits to user health records without permission controls and auditability.
- Automatically approving all AI extraction results without human or user review rules.
- Making Caniello responsible for veterinary diagnosis or clinical decision-making.

## Stakeholders

- Caniello founder or system owner responsible for beta safety, access, and operational decisions.
- Admins who monitor platform health and coordinate support or review work.
- Reviewers who validate AI-extracted document information.
- Support users who investigate user, pet, document, reminder, sharing, and account issues.
- Read-only observers who need visibility without mutation access.
- Pet owners whose sensitive account, pet, and document data must be handled privately and safely.
- Future implementation agents that need operational boundaries before designing or building admin surfaces.

## Constraints

- Back-office access must require secure authentication, session management, logout, and two-factor authentication for admins.
- Role-based access control must limit who can view, edit, approve, export, delete, retry, disable, or configure data.
- Sensitive data should be exposed only to roles with a valid operational need.
- Every sensitive action should be auditable with actor, action, target, timestamp, and relevant context.
- Review tooling must keep source documents and extracted fields close enough for efficient comparison.
- Admin actions that affect user privacy, account status, document status, extraction approval, sharing, deletion, export, or AI safety must not be silent or untraceable.
- The MVP should prioritize beta safety and operational visibility over advanced configuration.
- Back-office workflows must respect Caniello's medical-safety boundary and help identify unsafe AI behavior.
- The back office should support GDPR/account deletion and data portability workflows without implying that admins can bypass user privacy controls.

## Acceptance Criteria

- Given an admin user, when they log in to the back office, then access is allowed only after secure authentication and the session is managed with timeout and logout.
- Given an admin user with a role, when they access a back-office page or action, then Caniello permits only the capabilities assigned to that role.
- Given the system owner, when they review roles, then Owner, Admin, Reviewer, Support, and Read-only responsibilities are distinguishable through a permission matrix.
- Given an authorized admin, when they open the dashboard, then they can see beta health signals for users, pets, uploaded documents, pending reviews, failed jobs, AI status, reminders, notifications, and system health.
- Given a support admin, when they search by user email, pet data, document ID, or related metadata, then they can find the relevant record quickly.
- Given a support admin opens a user detail page, when they investigate an issue, then they can see account status, household, pets, documents, reminders, sharing state, and relevant support context.
- Given a user has not verified their email, when a permitted support admin resends verification, then the action is completed and recorded in the audit log.
- Given an abuse, fraud, or serious support issue, when a permitted owner or admin disables a user account, then access changes are applied and recorded in the audit log.
- Given a deletion request exists, when a support admin views deletion requests, then the workflow exposes enough information to complete or escalate the request according to policy.
- Given a data portability request, when a permitted admin exports user data, then the export action is permission-gated and audited.
- Given a reviewer opens the document list or review queue, when documents require validation, then they can filter by status, document type, confidence, date, and reviewer assignment.
- Given a reviewer opens a document detail page, when they review extraction, then they can compare the source document preview with extracted fields, confidence scores, status, and related pet context.
- Given extracted information is acceptable, when a permitted reviewer approves it, then the document moves forward and the approval is recorded.
- Given extracted information has obvious mistakes, when a permitted reviewer edits fields, then the corrected values are saved and the edit is recorded.
- Given a document has low quality, unsafe content, suspicious content, or duplicate risk, when a reviewer flags it, then it appears in a flagged-items view for follow-up.
- Given document processing fails, when an admin opens failed jobs, then they can inspect the failure and retry the job if permitted.
- Given reminders or notifications are not working, when an admin opens reminder or notification status, then they can see sent, failed, bounced, or pending states.
- Given a support admin needs team context, when they add internal notes to users, documents, or reviews, then those notes are visible to authorized back-office users and not exposed as user-facing content.
- Given Ask Caniello or AI extraction may produce unsafe output, when a safety flag is created, then authorized admins can review the flagged prompt, answer, or document context.
- Given a sensitive back-office action occurs, when the audit log is reviewed, then the actor, action, target, timestamp, and relevant context are visible to permitted roles.

## Open Questions

- Should the first back office be built before, alongside, or after the owner-facing MVP?
- Which roles are truly required for the first beta team, and can any roles be combined initially?
- Which admin actions require two-person review or owner-only permission?
- Should sensitive data masking and reason-required reveal be part of the first MVP or a P1 hardening item?
- What exact audit-log fields and retention period are required?
- Can reviewers edit extracted health fields directly, or should reviewer edits always require user confirmation before becoming trusted pet history?
- What AI extraction confidence thresholds route documents to review?
- Which AI safety events should be sampled automatically versus manually flagged?
- Which support actions are safe for MVP admins: resend verification, retry processing, revoke share links, disable account, export data, or others?
- What external support-ticket tool, if any, needs to be connected during the beta?
- What system health checks are required for launch: AI/OCR, storage, email, push, API, database, or frontend availability?

## Related Artifacts

- [Repository README](../../README.md)
- [Requirements README](README.md)
- [Owner-Facing MVP Requirement](owner-facing-mvp.md)
- [Back Office Backlog Notes](../notes/back-office/backlog.md)
