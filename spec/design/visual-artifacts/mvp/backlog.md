Poniżej masz MVP backlog dla Caniello Web + Mobile. Ułożyłem go pod produkt AI-first, czyli:

Scan → Extract → Review → Timeline → Reminder → Ask → Share

Nie pod klasyczny CRUD.

Uwzględniam też rzeczy „nudne, ale obowiązkowe”: auth, authorization, zgody, cookies/RODO, prywatność, usuwanie konta, bezpieczeństwo danych i podstawy compliance. W Europie cookies techniczne/auth mogą działać bez osobnej zgody, ale analytics/marketing cookies powinny być uruchamiane dopiero po zgodzie użytkownika; EDPB podkreśla też wymagania ważnej zgody pod GDPR.  ￼

⸻

Caniello MVP Backlog — Web & Mobile

P0 — Must Have for MVP

Feature	Platform	User Story
Landing page waitlist	Web	As a visitor, I want to understand what Caniello does and join the waitlist so that I can get early access.
Waitlist email capture	Web	As a visitor, I want to submit my email so that I can be notified when Caniello is available.
Waitlist segmentation survey	Web	As a founder, I want to collect pet count, pet type, biggest pain and interview consent so that I can identify strong beta candidates.
Cookie consent banner	Web	As an EU visitor, I want to accept, reject or manage non-essential cookies so that I control tracking and analytics.
Cookie preferences center	Web	As a visitor, I want to change my cookie choices later so that I can withdraw or update consent.
Privacy policy page	Web	As a visitor, I want to read how Caniello handles my data so that I can decide whether to trust the product.
Terms page	Web	As a visitor, I want to understand the service terms before creating an account.
Medical disclaimer	Web + Mobile	As a user, I want to know that Caniello organizes care information but does not replace a veterinarian.
Sign up / login	Web + Mobile	As a user, I want to create an account or log in so that my pet records are securely saved.
Email verification	Web + Mobile	As a user, I want to verify my email so that my account is protected.
Password reset	Web + Mobile	As a user, I want to reset my password so that I can recover access to my account.
Session management	Web + Mobile	As a user, I want to stay logged in securely so that I can access my pet-care data without friction.
Logout	Web + Mobile	As a user, I want to log out so that others cannot access my data on shared devices.
Authorization model	Backend	As a user, I want only authorized household members to access my pets and documents so that my data remains private.
Household / owner workspace	Backend + Mobile + Web	As a user, I want my pets, documents and reminders grouped under my household so that care can later be shared with family.
Add first pet	Web + Mobile	As a new user, I want to add my pet’s basic details so that Caniello can organize care around the right animal.
Scan first document onboarding	Mobile	As a new user, I want to start by scanning a document instead of filling forms so that onboarding feels fast and AI-first.
Upload document	Web + Mobile	As a user, I want to upload a PDF or image of a vet document so that Caniello can process it.
Camera scan	Mobile	As a mobile user, I want to take a photo of a document so that I can add records directly after a vet visit.
Signed upload URL	Backend	As the app, I want to upload files securely to storage so that documents do not pass through unnecessary services.
Document storage	Backend	As a user, I want my documents stored securely so that I can access them later.
Document processing job	Backend	As the system, I want to process uploaded documents asynchronously so that slow AI/OCR work does not block the user.
Processing status	Web + Mobile	As a user, I want to see that Caniello is reading my document so that I know the upload worked.
Document classification	Backend	As the system, I want to classify documents as vaccination, prescription, lab result, visit note, invoice or other so that extracted data is structured correctly.
AI information extraction	Backend	As a user, I want Caniello to extract pet name, date, clinic, vet, vaccine, medication, dosage and next due dates so that I do not need to type them manually.
Extraction confidence	Backend + Web + Mobile	As a user, I want to see which extracted fields are high or low confidence so that I know what needs review.
Review & confirm	Web + Mobile	As a user, I want to review extracted data before saving so that AI does not silently create incorrect health records.
Edit extracted field	Web + Mobile	As a user, I want to correct extracted data so that my pet’s health history stays accurate.
Confirm extracted data	Web + Mobile	As a user, I want to confirm the extracted information so that Caniello can create records, reminders and timeline events.
Auto-create timeline event	Backend + Web + Mobile	As a user, I want confirmed document data to become a timeline event so that my pet’s history is organized automatically.
Auto-create reminder	Backend + Web + Mobile	As a user, I want Caniello to suggest reminders from confirmed dates so that I do not miss vaccines, medication or rechecks.
Home / What’s next	Web + Mobile	As a user, I want to see what matters next for my pet so that I immediately know upcoming actions.
Pending review card	Web + Mobile	As a user, I want to see documents waiting for confirmation so that I can finish organizing them.
Timeline	Web + Mobile	As a user, I want to view my pet’s care history chronologically so that I can understand what happened and when.
Timeline event detail	Web + Mobile	As a user, I want to open a timeline event and see its source document so that I can trust where the information came from.
Documents library	Web + Mobile	As a user, I want to browse uploaded documents so that I can find vaccination records, lab results and prescriptions later.
Document detail	Web + Mobile	As a user, I want to open a document and see extracted data, source file and related timeline events.
Reminders list	Web + Mobile	As a user, I want to see all upcoming care reminders so that I can stay on top of my pet’s care.
Reminder detail	Web + Mobile	As a user, I want to view and edit a reminder so that dates and notification settings are correct.
Push notification permission	Mobile	As a mobile user, I want to enable reminders so that Caniello can notify me before important dates.
Email reminders	Web + Mobile	As a user, I want to receive email reminders so that I do not rely only on app notifications.
Ask Caniello navigation	Web + Mobile	As a user, I want Ask Caniello visible in the bottom nav/sidebar so that I can easily ask questions about my pet.
Ask Caniello chat	Web + Mobile	As a user, I want to ask questions about my pet’s care history so that I do not have to search manually.
Suggested Ask prompts	Web + Mobile	As a user, I want suggested questions so that I understand what Caniello can answer.
AI answer with sources	Web + Mobile	As a user, I want answers to reference source documents or timeline events so that I can trust the response.
AI safety guardrails	Backend + Web + Mobile	As a user, I want Caniello to avoid diagnosis and tell me to contact a vet when needed so that I do not misuse the assistant.
Share care summary	Web + Mobile	As a user, I want to generate a care summary so that I can share important pet information with family, petsitters or vets.
Share link permissions	Backend + Web + Mobile	As a user, I want share links to be limited and revocable so that I control access to my pet’s data.
Export PDF summary	Web + Mobile	As a user, I want to export a PDF summary so that I can bring it to a vet or send it to a petsitter.
Account settings	Web + Mobile	As a user, I want to manage my profile, email and preferences so that my account stays up to date.
Delete account	Web + Mobile + Backend	As a user, I want to delete my account and data so that I can exercise control over my personal data.
Export my data	Web + Backend	As a user, I want to export my data so that I can keep a copy or move away from Caniello.
Basic audit log	Backend	As the system, I want to record important actions like document upload, confirmation, sharing and deletion so that sensitive actions are traceable.
Error handling	Web + Mobile	As a user, I want clear error messages when upload, extraction or saving fails so that I know what to do next.
Admin beta dashboard	Web Admin	As the founder, I want to see users, documents, extraction status and failed jobs so that I can operate the beta safely.

⸻

P1 — Should Have Soon After MVP

Feature	Platform	User Story
Magic link login	Web + Mobile	As a user, I want to log in without a password so that access is simpler.
Social login	Web + Mobile	As a user, I want to sign in with Google or Apple so that onboarding is faster.
Multi-pet support	Web + Mobile	As a user with multiple pets, I want to manage more than one pet so that all care is in one place.
Care team members	Web + Mobile	As a user, I want to invite a family member or caregiver so that care can be shared.
Role-based access	Backend + Web + Mobile	As an owner, I want to assign roles like owner, caregiver and view-only so that each person has appropriate access.
Revocable share links	Web + Mobile	As a user, I want to revoke shared summaries so that old links do not stay active forever.
Expiring share links	Web + Mobile	As a user, I want share links to expire after a selected time so that temporary access stays temporary.
Advanced reminder recurrence	Web + Mobile	As a user, I want recurring reminders for medication, grooming and parasite prevention so that repeated care tasks are automated.
Medication schedule	Web + Mobile	As a user, I want to track medication name, dose, frequency and end date so that treatment is easier to follow.
Lab result summary	Web + Mobile	As a user, I want Caniello to summarize lab results in plain language so that I can prepare questions for my vet.
Ask Caniello from document	Web + Mobile	As a user, I want to ask questions directly from a document so that context is already selected.
Ask Caniello from timeline event	Web + Mobile	As a user, I want to ask about a specific event so that answers are more precise.
Feedback on AI answer	Web + Mobile	As a user, I want to rate AI answers as helpful or not so that Caniello improves.
Extraction feedback loop	Web + Mobile + Backend	As the product team, I want to know which extracted fields users correct so that extraction quality improves.
Document categories	Web + Mobile	As a user, I want documents grouped by vaccination, labs, prescriptions and visits so that browsing is easier.
Search documents	Web + Mobile	As a user, I want to search documents so that I can quickly find specific records.
Search timeline	Web + Mobile	As a user, I want to search my pet’s history so that I can find events quickly.
Tags	Web + Mobile	As a user, I want to tag documents and events so that I can organize them my way.
Basic subscription paywall	Web + Mobile	As a user, I want to understand what is free and what requires premium so that pricing is clear.
Stripe checkout	Web	As a user, I want to subscribe to Premium so that I can unlock unlimited documents and AI features.
RevenueCat / mobile subscription	Mobile	As a mobile user, I want to subscribe through the app store when required so that payment works natively.
Usage limits	Backend + Web + Mobile	As the business, I want to limit documents or AI queries on the free plan so that costs are controlled.
Notification preferences	Web + Mobile	As a user, I want to choose push/email reminder preferences so that notifications match my needs.
Consent log	Backend	As the system, I want to store privacy and marketing consent history so that compliance can be demonstrated.
Regional settings	Web + Mobile	As a user, I want date format, language and timezone to match my region so that reminders are correct.
Polish language version	Web + Mobile	As a Polish user, I want the app in Polish so that it feels local and understandable.
Analytics events	Web + Mobile + Backend	As the product team, I want to track activation, scan, review, reminder and Ask usage so that we know what works.

⸻

P2 — Later / Post-MVP

Feature	Platform	User Story
Petsitter mode	Web + Mobile	As a user, I want to create a temporary petsitter view so that a caregiver sees only what they need.
Emergency card	Web + Mobile	As a user, I want a quick emergency card so that vital info is available in urgent situations.
QR share card	Web + Mobile	As a user, I want a QR code for my pet’s summary so that vets or caregivers can open it quickly.
Vet visit preparation	Web + Mobile	As a user, I want Caniello to help me prepare questions for the next vet visit so that appointments are more useful.
Post-visit follow-up	Web + Mobile	As a user, I want to turn vet instructions into care tasks so that I follow recommendations correctly.
Partner profile	Web	As a groomer, petsitter or trainer, I want a light profile so that pet parents can share relevant care information with me.
Clinic light portal	Web	As a small clinic, I want to receive owner-submitted summaries so that intake before visits is easier.
Partner document upload	Web	As a clinic or caregiver, I want to upload a document to the pet owner’s Caniello account with permission so that records stay current.
Calendar integration	Web + Mobile	As a user, I want to sync reminders with my calendar so that pet care appears alongside my life schedule.
Advanced AI extraction by document type	Backend	As the system, I want specialized extraction for vaccinations, prescriptions and labs so that accuracy improves.
Duplicate document detection	Backend	As a user, I want duplicate uploads detected so that my records stay clean.
Version history	Backend + Web	As a user, I want to see changes to confirmed records so that I know what was edited.
Family plan billing	Web + Mobile	As a household, I want a family plan so that multiple pets and caregivers are covered.
Public referral waitlist	Web	As a user, I want to invite other pet parents so that I can move up the beta list.
In-app support	Web + Mobile	As a user, I want to contact support from the app so that issues are resolved quickly.

⸻

MVP Epics

Epic 1 — Acquisition & Validation

Feature	User Story
Landing page	As a visitor, I want to understand the value proposition quickly so that I can decide whether to join.
Waitlist form	As a visitor, I want to join the waitlist with my email so that I can get early access.
Survey	As the founder, I want to collect pain-point data so that I can validate the target segment.
MailerLite integration	As the founder, I want new leads to enter an email sequence so that they stay warm.
Google Sheets lead database	As the founder, I want waitlist answers stored in a sheet so that I can score leads manually.
Cookie banner	As an EU visitor, I want control over non-essential cookies so that tracking is consent-based.

⸻

Epic 2 — Identity, Privacy & Security

Feature	User Story
Authentication	As a user, I want secure access to my account so that my pet data is protected.
Authorization	As a user, I want only invited people to access my household data so that private information stays private.
Secure file storage	As a user, I want uploaded documents stored securely so that sensitive records are protected.
Privacy policy	As a user, I want to understand data processing so that I can trust the product.
Delete account	As a user, I want to delete my account so that I control my personal data.
Export data	As a user, I want to export my data so that I am not locked in.

⸻

Epic 3 — AI Document Pipeline

Feature	User Story
Upload document	As a user, I want to upload a vet document so that Caniello can organize it.
Scan document	As a mobile user, I want to photograph a document so that adding records is easy.
Async processing	As a user, I want processing to happen in the background so that I can continue using the app.
Classification	As the system, I want to identify document type so that extraction is accurate.
Extraction	As a user, I want important information extracted automatically so that I avoid manual entry.
Confidence scoring	As a user, I want uncertain fields highlighted so that I know what to check.
Review & confirm	As a user, I want to approve AI output before saving so that my records remain reliable.

⸻

Epic 4 — Pet-Care Memory Layer

Feature	User Story
Pet profile	As a user, I want my pet’s basic details saved so that records attach to the correct pet.
Timeline	As a user, I want a chronological history so that I can understand my pet’s care over time.
Documents	As a user, I want documents organized in one place so that I can find them later.
Reminders	As a user, I want upcoming care tasks tracked so that I do not miss important dates.
Home / What’s next	As a user, I want the app to tell me what matters next so that I can act quickly.

⸻

Epic 5 — Ask Caniello

Feature	User Story
Ask navigation	As a user, I want Ask Caniello to be easy to find so that I know this is an assistant-led product.
Suggested prompts	As a user, I want example questions so that I know what I can ask.
Answer from pet data	As a user, I want answers based on my pet’s documents and timeline so that they are relevant.
Source references	As a user, I want to see where the answer came from so that I can trust it.
Safety guardrails	As a user, I want Caniello to avoid medical diagnosis so that I use it responsibly.

⸻

Epic 6 — Sharing

Feature	User Story
Generate summary	As a user, I want a care summary so that I can share important info with others.
Export PDF	As a user, I want a PDF summary so that I can send or print it.
Share link	As a user, I want a secure link so that others can view the summary.
Revoke link	As a user, I want to revoke shared access so that I stay in control.

⸻

Recommended MVP Release Scope

MVP Web

Web should focus on:

Area	Scope
Landing	waitlist, survey, cookie consent, privacy
App	login, onboarding, upload documents, review & confirm
Core dashboard	Home, timeline, documents, reminders
Assistant	Ask Caniello
Sharing	summary preview + export
Admin	beta operations dashboard

MVP Mobile

Mobile should focus on:

Area	Scope
Onboarding	create account, add pet, scan first document
Scan	camera-first document upload
Review	confirm extracted data
Daily value	Home / What’s next, reminders
Memory	Timeline, documents
Assistant	Ask Caniello
Sharing	summary + share link

⸻

Suggested First Sprint Breakdown

Sprint 0 — Foundation

Feature	User Story
Repo setup	As the team, we want a clean mono-repo so that web, mobile and backend share types and conventions.
Design tokens	As the team, we want shared colors, typography and spacing so that UI stays consistent.
Auth provider setup	As a user, I want secure account creation and login.
Database schema v1	As the product, we need users, households, pets, documents, extracted data, reminders and timeline events.
Storage setup	As a user, I want documents stored safely.
Basic CI/CD	As the team, we want automated build checks so that releases are safer.

Sprint 1 — Landing & Waitlist

Feature	User Story
Hugo landing	As a visitor, I want to understand the product quickly.
MailerLite form	As a visitor, I want to join the waitlist.
Survey	As the founder, I want to collect validation data.
Cookie consent	As an EU visitor, I want control over analytics cookies.
Privacy / Terms	As a visitor, I want to understand legal basics.

Sprint 2 — Onboarding & First Pet

Feature	User Story
Sign up / login	As a user, I want secure access.
Add pet	As a user, I want to create my pet profile.
Scan-first onboarding	As a user, I want to start by uploading a document.
Home skeleton	As a user, I want to see my pet and next steps.

Sprint 3 — Document Upload & Processing

Feature	User Story
Upload document	As a user, I want to upload a vet document.
Camera scan	As a mobile user, I want to photograph a document.
Processing job	As the system, I want to process files in the background.
Classification	As the system, I want to detect document type.
Extraction draft	As a user, I want AI-extracted information prepared for review.

Sprint 4 — Review, Timeline & Reminders

Feature	User Story
Review & confirm	As a user, I want to approve extracted data.
Create timeline event	As a user, I want confirmed information saved to history.
Create reminder	As a user, I want important dates turned into reminders.
Timeline screen	As a user, I want to see care history.
Reminder screen	As a user, I want to manage upcoming care.

Sprint 5 — Ask & Share

Feature	User Story
Ask Caniello	As a user, I want to ask questions about my pet’s records.
Answers with sources	As a user, I want to see where the answer came from.
Safety guardrails	As a user, I want safe non-diagnostic responses.
Generate summary	As a user, I want to share a clear care summary.
Export PDF/share link	As a user, I want to share pet-care information easily.

⸻

Definition of Done for MVP

MVP is done when a beta user can:

1. Create account.
2. Add pet.
3. Upload or scan vet document.
4. See processing status.
5. Review and confirm extracted information.
6. Get a timeline event.
7. Get a reminder.
8. Ask Caniello about the pet’s data.
9. Generate a care summary.
10. Control privacy, sharing and account deletion.

That is the real MVP. Not a big CRUD app.