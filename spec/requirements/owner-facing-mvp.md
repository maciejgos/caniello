# Requirement: Owner-Facing MVP

## Status

Accepted

## Problem

Caniello needs a focused owner-facing MVP that proves pet owners will repeatedly trust and use the product as one place for pet health records, reminders, documents, and shareable care information.

The raw backlog describes a broad web and mobile product. The first product requirement should preserve the AI-first workflow of scan, extract, review, timeline, reminder, ask, and share while avoiding a generic CRUD app, a clinic system, a marketplace, an AI diagnosis product, or an official pet passport replacement.

## Goals

- Enable a beta user to create an account, add a pet, upload or scan a veterinary document, and see that document processed.
- Use AI/OCR to classify pet-care documents and extract structured information for human review.
- Require user review and confirmation before extracted information creates health records, timeline events, or reminders.
- Provide a simple home experience that shows what matters next for the pet.
- Let users browse a pet timeline, document library, and reminder list.
- Let users ask Caniello questions grounded in their pet's documents and timeline, with visible source references.
- Help users generate and share a care summary through a controlled share link or PDF export.
- Include privacy, consent, account deletion, data export, authorization, and medical disclaimer foundations needed for an EU-facing beta.
- Provide basic operational visibility for beta support without expanding into a full back-office product.

## Non-Goals

- Building a full clinic PIMS, EHR, or partner portal.
- Building marketplace, booking, payments, or subscription workflows for the first MVP.
- Providing AI diagnosis, symptom checking, treatment recommendations, or veterinary decision-making.
- Claiming that Caniello replaces an official EU pet passport.
- Building advanced multi-role care teams, family plans, or complex household permissions beyond what is needed for private owner data and controlled sharing.
- Building advanced analytics, experimentation, referral mechanics, duplicate detection, calendar sync, or partner document-upload flows.
- Supporting every document type with specialized extraction in the first release.

## Stakeholders

- Dog and cat owners who need a trusted place to organize care history, reminders, and documents.
- Owners of pets with ongoing medication, chronic history, vaccinations, lab results, or recurring visits.
- Families, caregivers, petsitters, groomers, or veterinarians who may receive shared summaries.
- The Caniello founder and product owner validating activation, retention, trust, and AI-first usefulness.
- Support or beta operations users who need enough visibility to help early users safely.
- Codex and future implementation agents that need clear product boundaries before feature shaping, design, and implementation.

## Constraints

- The MVP should be web and mobile aware, with mobile supporting camera-first document capture.
- The primary workflow should be AI-first: scan or upload, extract, review, create timeline/reminder, ask, and share.
- AI output must remain reviewable and user-confirmed before becoming a trusted record.
- Ask Caniello answers must cite source documents or timeline events and must avoid diagnosis or unsafe medical advice.
- Non-essential analytics and marketing cookies should require consent for EU visitors and users.
- Privacy policy, terms, medical disclaimer, cookie controls, account deletion, and data export must be available before collecting sensitive beta data at scale.
- Pet health records, uploaded documents, extracted fields, reminders, share links, account actions, and sensitive operations must be protected by authentication and authorization.
- Documents should be uploaded and stored securely, using signed upload URLs or an equivalent pattern that avoids unnecessary exposure.
- Slow OCR and AI extraction should run asynchronously so users can see processing status instead of waiting on a blocked screen.
- Share links must be limited and revocable so users can control who sees pet-care information.
- The first MVP should stay small enough to validate activation and retention before expanding into marketplace, partner, billing, or clinic tooling.

## Acceptance Criteria

- Given a new beta user, when they sign up or log in and verify their email, then Caniello securely creates or restores access to their account.
- Given an authenticated user, when they add their first pet, then Caniello stores basic pet details and can attach future documents, events, and reminders to that pet.
- Given a mobile user with a veterinary document, when they take a photo or upload a file, then Caniello accepts the document and shows a processing status.
- Given a web user with a PDF or image document, when they upload the file, then Caniello stores it securely and starts asynchronous processing.
- Given an uploaded document, when processing completes, then Caniello classifies the document type and extracts relevant fields such as pet name, date, clinic, veterinarian, vaccine, medication, dosage, and next due dates when present.
- Given extracted fields with different confidence levels, when the user reviews the extraction, then Caniello highlights uncertain fields and allows the user to edit them.
- Given AI-extracted information, when the user confirms it, then Caniello creates the appropriate timeline event, document metadata, and suggested reminder without silently saving unreviewed AI output as trusted history.
- Given a confirmed pet-care date with a next action, when Caniello creates or suggests a reminder, then the user can view and edit that reminder.
- Given a returning user, when they open the home view, then they can see upcoming actions, pending document reviews, and what matters next for their pet.
- Given a pet with confirmed records, when the user opens the timeline, then they can view care history chronologically and inspect source documents for events.
- Given a pet with uploaded files, when the user opens the document library, then they can browse documents and view related extracted data and timeline events.
- Given a user asks Caniello about their pet's care history, when the assistant responds, then the answer is based on the user's pet records and includes visible source references.
- Given a user asks for diagnosis, treatment decisions, emergency advice, or unsafe medical guidance, when Ask Caniello responds, then it avoids diagnosis and directs the user to contact a veterinarian when appropriate.
- Given a user wants to share pet-care information, when they generate a care summary, then Caniello provides a controlled PDF export or share link containing relevant records and notes.
- Given a user no longer wants a shared summary available, when they revoke access, then the shared link no longer exposes the pet-care information.
- Given an EU visitor or user, when non-essential cookies or analytics would be used, then Caniello requests consent and allows consent to be changed later.
- Given a user wants control of their data, when they request export or deletion, then Caniello provides a data export path and an account deletion path.
- Given a sensitive action such as document upload, confirmation, sharing, export, or deletion, when the action occurs, then Caniello records enough audit information to support beta operations and safety review.
- Given a beta operator, when uploads, extraction jobs, or reminders fail, then they can see enough operational status to identify the affected user or document and support the beta safely.

## Open Questions

- Should the first owner-facing MVP be web-first, mobile-first, or built as coordinated web and mobile slices?
- Which auth provider, storage provider, database, email provider, push provider, and AI/OCR provider should be used?
- What document types are required for the first beta: vaccination, prescription, lab result, visit note, invoice, or a smaller subset?
- Which extracted fields are mandatory for each first-beta document type?
- What confidence threshold should require explicit user review, and can any fields be treated as high confidence without extra friction?
- Should Caniello create reminders automatically after confirmation, or only suggest reminders that the user accepts?
- What is the minimum acceptable care summary content for a petsitter, family member, groomer, or veterinarian?
- Should share links expire in the MVP, or is manual revocation sufficient for the first beta?
- Which languages are required for the first MVP: English, Polish, or both?
- What analytics events are allowed under the initial consent and privacy model?
- What exact medical disclaimer language is approved?
- What operational visibility belongs in this owner-facing MVP versus a separate back-office MVP?

## Related Artifacts

- [Repository README](../../README.md)
- [Requirements README](README.md)
- [First Landing Page Requirement](first-landing-page.md)
- [Web and Mobile Backlog Notes](../notes/web/backlog.md)
