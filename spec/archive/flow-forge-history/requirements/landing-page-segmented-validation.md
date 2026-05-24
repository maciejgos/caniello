# Requirement: Landing Page Segmented Validation

## Status

Accepted

## Problem

Caniello needs the landing page to validate Wave 1 owner demand while also measuring early interest from pet service providers and clinics without making Wave 2 or Wave 3 look like active products.

The accepted first landing page requirement establishes a public validation page, but the newer landing notes define a more specific validation model: owner waitlist signup for the MVP, research-stage interest capture for future pet services and clinic collaboration, MailerLite-based lead handling, and basic analytics for conversion and segment demand. The page must communicate the owner-side MVP promise clearly, preserve scope boundaries, and collect enough structured evidence to inform the next PDLC steps.

## Goals

- Explain the Wave 1 MVP promise for pet owners: health records, smart reminders, important documents, and trusted sharing.
- Capture owner waitlist leads without requiring account creation.
- Segment interest from pet owners, pet service providers, and clinics or veterinarians.
- Present Wave 2 pet services and Wave 3 clinic collaboration as research or exploration, not committed product launches.
- Send leads to MailerLite with role, source, interest wave, consent, and relevant optional fields.
- Support conversion and segment-demand measurement for the landing page validation cycle.
- Provide privacy, consent, and legal-access cues appropriate for collecting waitlist and research-interest data.
- Match the visual direction shown in the landing concept images: refined Caniello brand presentation, app mockups, pet imagery, clear CTA placement, and compact sections for features, process, future waves, and footer.

## Non-Goals

- Building the authenticated Caniello product.
- Building pet profiles, reminder management, document upload, document vault, sharing, or PDF export as product functionality.
- Launching a pet services marketplace, booking flow, payment flow, provider portal, or service transaction flow.
- Launching clinic SaaS, clinic integrations, EHR/PIMS functionality, or clinical collaboration workflows.
- Providing AI diagnosis, symptom checking, treatment recommendations, or veterinary decision-making.
- Claiming that Caniello replaces an official EU pet passport.
- Treating Wave 2 or Wave 3 interest capture as product availability, launch commitment, or a promised roadmap date.

## Stakeholders

- Pet owners deciding whether Caniello is useful enough to join the MVP waitlist.
- Pet owners with dogs or cats, recurring medication, chronic health history, vaccinations, visits, documents, or shared care responsibilities.
- Pet service providers who may want to participate in future discovery around trusted pet services.
- Clinics and veterinarians who may want to participate in future discovery around owner-approved health context.
- The Caniello founder or product owner validating message clarity, conversion, role demand, and future-wave interest.
- Future implementation agents that need clear scope, copy boundaries, data fields, and acceptance criteria before feature shaping or implementation.

## Constraints

- The landing page must keep Wave 1 owner-side validation as the primary focus.
- Wave 2 and Wave 3 must be labeled as research, exploration, or future waves dependent on validated demand.
- Navigation must not present `Marketplace`, `For clinics`, or equivalent labels as active MVP products.
- Copy must avoid `coming soon`, `launching next`, `available now`, or similar phrasing for Wave 2 and Wave 3.
- The page must not imply official EU pet passport replacement, medical diagnosis, or veterinary advice.
- Waitlist and interest forms must validate email format and show success or error feedback.
- MailerLite is the target system for waitlist, lead segmentation, and follow-up email workflows.
- Lead capture must include privacy copy and link to a Privacy Policy before public use.
- Marketing or informational consent must be captured where required before sending personal data to MailerLite.
- Analytics must support landing-page conversion measurement and segment-demand reporting while respecting privacy and consent requirements.
- The visual system should use the Caniello identity and the landing note images as direction, but those images are references rather than approved final production assets.

## Acceptance Criteria

- Given a first-time pet owner visitor, when they open the landing page, then they see the primary promise `Better care. Stronger bond.` or equivalent approved copy above the fold.
- Given a first-time visitor, when they scan the first viewport, then they can identify that Caniello helps with health records, reminders, documents, and sharing care with trusted people or vets.
- Given a first-time visitor, when they view the hero, then they see a primary waitlist CTA with an email input and `Join Waitlist` action without scrolling on common desktop layouts.
- Given a visitor submits an invalid email, when they use any waitlist or interest form, then the page shows an inline validation error and does not submit the lead.
- Given a pet owner submits a valid waitlist email, when the submission succeeds, then the lead is sent to MailerLite with `role=pet_owner`, `interest_wave=wave_1`, `source=landing_page`, and membership in the general waitlist and pet owner segments.
- Given a pet owner waitlist lead is submitted, when the user receives feedback, then the page shows a clear success message without requiring account creation.
- Given the page explains MVP value, when it presents the main feature section, then it includes health records, smart reminders, care sharing, and secure/private positioning.
- Given the page describes health records, when the copy mentions medical history, vaccinations, tests, or documents, then it does not claim to replace an official EU pet passport.
- Given the page describes reminders, when the copy mentions medication, vaccines, appointments, deworming, or visits, then it does not imply AI diagnosis or medical advice.
- Given the page describes care sharing, when the copy mentions family, caregivers, or vets, then it explains that sharing is owner-controlled.
- Given the page describes privacy, when the visitor evaluates trust, then the page states that the user's data is private or belongs to the user and links to a Privacy Policy.
- Given a visitor wants to understand how Caniello works, when they read the process section, then they see three simple steps: add a pet, organize care, and stay on top, or equivalent approved copy.
- Given a visitor has read the core value, when they reach the middle or lower page, then they see another waitlist CTA that uses the same lead handling model as the hero form.
- Given the page presents future vision, when Wave 2 pet services are shown, then the section is labeled research or exploration and says that Caniello is researching a curated way for pet owners to discover trusted pet-related services and providers.
- Given a pet service provider expresses interest, when they click or submit the Wave 2 CTA, then the lead is captured with `role=pet_service_provider`, `interest_wave=wave_2`, and relevant optional fields such as business name, service category, location, or website when collected.
- Given a Wave 2 provider lead is captured, when the submission succeeds, then the lead is added to MailerLite service-provider and Wave 2 interest segments without removing any existing segments for the same email.
- Given the page presents future vision, when Wave 3 clinic collaboration is shown, then the section is labeled research and says that Caniello is exploring tools that help clinics and vets work with owner-approved pet health context.
- Given a clinic or veterinarian expresses interest, when they click or submit the Wave 3 CTA, then the lead is captured with `role=clinic_vet`, `interest_wave=wave_3`, and relevant optional fields such as clinic name, role, country, or website when collected.
- Given a Wave 3 clinic or vet lead is captured, when the submission succeeds, then the lead is added to MailerLite clinic/vet and Wave 3 interest segments without removing any existing segments for the same email.
- Given a repeated email is submitted, when MailerLite already has a subscriber for that email, then the integration updates the existing subscriber and adds relevant groups or fields without creating a duplicate contact.
- Given the founder reviews validation data, when analytics or exports are inspected, then page views, waitlist submissions, waitlist successes, waitlist errors, Wave 2 interest, Wave 3 interest, and UTM parameters are available where consent allows.
- Given the founder calculates landing-page conversion, when validation data is available, then conversion can be computed as `waitlist_success / page_view`.
- Given the founder evaluates segment demand, when MailerLite groups, tags, fields, or exports are reviewed, then leads can be counted by pet owner, pet service provider, and clinic/vet roles.
- Given the footer is displayed, when a visitor looks for trust or legal information, then they can access Privacy Policy and Terms of Service links or clearly marked placeholder pages before publication.
- Given the footer or final CTA is displayed, when a visitor decides to sign up at the end of the page, then they can submit an email through the same MailerLite integration with a distinguishable footer or final-CTA source.
- Given the page is viewed on mobile and desktop, when the visitor scans the hero, feature cards, process section, Wave 2/3 cards, forms, and footer, then text remains readable, controls remain usable, and visual elements do not overlap.

## Open Questions

- Should this refined requirement replace parts of the accepted `first-landing-page.md`, or remain a separate follow-on requirement for the next landing page iteration?
- Should the first public landing page default to Polish, English, or use the accepted Polish-default model with an English switch?
- Which final hero, CTA, Wave 2, Wave 3, privacy, consent, and success/error copy is approved for production?
- Which MailerLite group IDs and custom fields already exist, and which must be created before implementation?
- What consent model is required for the first public traffic source and expected visitor countries?
- Which analytics provider or event collection method is approved for the validation cycle?
- Should role selection be visible in the primary waitlist form, or should owner submissions default to `pet_owner` while providers and clinics use dedicated CTAs?
- Are the concept images approved as design direction only, or should future design work reproduce their layout, colors, imagery, and mockup structure closely?
- Which legal pages must be complete before launch versus allowed to exist as placeholders during internal validation?

## Related Artifacts

- [Repository README](../../README.md)
- [Requirements README](README.md)
- [First Landing Page Requirement](first-landing-page.md)
- [Owner-Facing MVP Requirement](owner-facing-mvp.md)
- [Landing Backlog Notes](../notes/landing/backlog.md)
- [Landing Concept Image 1](../notes/landing/image%201.png)
- [Landing Concept Image 2](../notes/landing/image%202.png)
- [Landing Concept Image 3](../notes/landing/image%203.png)
