# Caniello Product Specification

## Purpose

Caniello helps pet owners keep trusted, shareable pet health records, reminders, documents, and care information in one place. It should be useful as an owner-side utility before becoming a platform.

## MVP Promise

> One place for a pet's health records, reminders, documents, and shareable care information.

The MVP includes:

- pet profile with basic data, microchip, allergies, medication, and important notes;
- reminders for vaccination, medication, deworming, and visits;
- private document vault for medical records and test results;
- owner-controlled care card, scoped share link, or approved export;
- owner account, consent, privacy, data rights, and Polish/English foundations;
- simple caregiver sharing only after the owner-side foundation is trustworthy.

## Audience

Primary users are dog and cat owners, especially owners managing ongoing medication or chronic history and families sharing care responsibilities. Partner and clinic learning follows owner-side validation; it does not lead MVP implementation.

## Validation Goals

- Users can onboard and create a pet without help.
- Users create at least one reminder or document.
- Thin MVP activation exceeds 50%.
- D30 retention exceeds 25%.
- Weekly active owners exceed 20% of activated users.

Weak retention is a reason to improve the owner utility, not expand into a marketplace or clinic platform.

## Owner Control and Privacy

- Owner data is private by default and protected by authorization and RLS.
- Consent must be explicit, revocable, and recorded where required.
- Owners must have truthful export and deletion-request paths.
- Sharing must be scoped, revocable, auditable where appropriate, and must not expose raw tokens or private files accidentally.
- Sensitive actions must preserve bounded audit evidence without placing medical content, secrets, tokens, or signed URLs in logs.
- Public health-record upload requires explicit human release approval after storage, RLS, data-rights, recovery, and operational checks.

## Medical and Legal Boundaries

- Caniello organizes owner-provided information; it does not diagnose, prescribe, recommend treatment, or provide emergency advice.
- AI or automation is assistance only. Material extracted or suggested information must be reviewable and owner-confirmed before becoming trusted history.
- Ask-style responses must be grounded in user-owned records when relevant and make uncertainty visible.
- Caniello must not claim to replace veterinarians or official EU pet passports. Official passports remain veterinarian-issued documents.

## Explicit Non-Goals

Do not build without explicit human approval and a roadmap update:

- marketplace mechanics, booking, or payments-first monetization;
- clinic SaaS, PIMS, EHR integrations, clinic portals, or broad partner workflow ownership;
- AI symptom checking, diagnosis, treatment decisions, or veterinary replacement;
- complex household roles, family plans, or advanced care-team permissions;
- advanced analytics, referrals, duplicate detection, calendar sync, or partner document uploads;
- broad back-office systems beyond approved MVP support needs.

## Technical Boundaries

- Next.js App Router is the web application boundary.
- Supabase provides MVP data, authentication, storage, and RLS.
- Shared browser/API/data contracts belong in `packages/contracts`.
- Supabase and provider access remains server-side; UI components do not use service-role credentials or write audit/product events directly.
- Prefer feature-local vertical slices and graduate code into shared packages only when reuse or boundary pressure is real.
