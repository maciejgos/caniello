# Caniello MVP Flow Governance Audit

Audit date: June 20, 2026

Evidence base:

- authoritative repository documents: `SPEC.md`, `ROADMAP.md`, `BACKLOG.md`, `ARCHITECTURE.md`, and `DESIGN.md`;
- active task contracts and accepted ADRs;
- supplied MVP mockups;
- source inspection of the production account feature and isolated MVP-flow prototype;
- a current Playwright run against `http://localhost:3000/mvp-flow`, `/signup`, `/login`, and `/app`;
- desktop screenshots at 1280px, a mobile pass at 390px, DOM snapshots, route probes, console checks, and reload behavior;
- focused component tests and repository governance gates.

Temporary screenshots were saved under `/tmp/caniello-mvp-flow-audit` and were not added to the repository.

## 1. Executive Summary

| Measure                   | Readiness |
| ------------------------- | --------: |
| Overall MVP readiness     |       58% |
| `/mvp-flow` readiness     |       42% |
| Visual fidelity readiness |       82% |
| Functional readiness      |       57% |
| State/data-flow readiness |       46% |
| Roadmap alignment         |       61% |

The current repository contains two materially different products:

1. `/mvp-flow` is a polished, clickable, English-language visual prototype. It closely follows the supplied mockups, but all state is local React state, all records are hardcoded, no authentication or persistence occurs, and reload returns to signup.
2. `/app` is the production-oriented owner application. It uses real Supabase authentication and owner-scoped APIs for the pet profile, reminders, document metadata, timeline events, settings, and scoped share links. It is less visually complete than the prototype but is substantially more truthful about unavailable behavior.

The largest product-scope risk is that `/mvp-flow` presents Later and Not Now capabilities—AI extraction, grounded Ask answers, generated summaries, PDF/email export, notification delivery, caregiver and clinic access, and emergency-card behavior—with production-like certainty and insufficient prototype labeling.

The largest technical risk is divergence between the 5,598-line isolated prototype surface and the production account feature. The prototype cannot be promoted wholesale because its state model, controls, claims, routes, language, and security boundaries do not match production architecture.

The best implemented area is the production owner foundation: email-first authentication, first-pet ownership, reminder persistence, truthful unavailable states, scoped share-link groundwork, privacy settings, and explicit medical boundaries.

The most urgent next step remains backlog priority 5: implement private document file storage and owner-authorized access. Until that work and its release gates are complete, no screen should imply real upload, OCR, extraction, or secure stored-file access.

## 2. Roadmap Alignment

| Feature / Flow                          | Current Scope in ROADMAP                      | Current Implementation                                                                   | Alignment            | Recommendation                                                          |
| --------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------- |
| Email/password signup and login         | Now                                           | Real production routes and Supabase boundary; simulated in `/mvp-flow`                   | Aligned              | Keep production auth authoritative; label prototype auth as simulated   |
| First-pet onboarding                    | Now                                           | Production first-run form persists; prototype uses prefilled read-only-like values       | Partially aligned    | Use production onboarding as the behavioral source of truth             |
| Pet profile management                  | Now                                           | Database-backed production profile with first-pet honesty                                | Aligned              | Complete human review of the existing task                              |
| Reminder creation and editing           | Now                                           | Database-backed production flow; prototype uses fixed values and session state           | Aligned              | Keep production implementation; do not infer notification delivery      |
| Reminder completion                     | Now                                           | Production API and UI support completion                                                 | Aligned              | Preserve audit and RLS coverage                                         |
| Dashboard “What’s next”                 | Now                                           | Production dashboard renders persisted reminders and documents                           | Aligned              | Continue visual alignment without replacing its data model              |
| Document metadata                       | Now                                           | Production CRUD persists metadata only                                                   | Partially aligned    | Keep the metadata-only label until real storage lands                   |
| Document file upload and private access | Now                                           | Missing in production; prototype immediately advances without choosing a file            | Missing              | Execute backlog priority 5                                              |
| Document scanning                       | Later/Unclear                                 | Prototype button advances to fake processing                                             | Misleading           | Disable or mark concept-only                                            |
| OCR/document extraction                 | Later                                         | Hardcoded prototype processing and extracted values                                      | Prototype acceptable | Add persistent prototype banner and no-real-processing copy             |
| Owner-confirmed extracted intake        | Later                                         | Prototype review screen is interactive-looking but does not persist                      | Prototype acceptable | Preserve as research only; do not merge into production Now             |
| Reminder suggestions from documents     | Later                                         | Prototype suggests and appears to set a reminder                                         | Scope creep          | Mark suggestion and save behavior as concept-only                       |
| Ask Caniello grounded summaries         | Later                                         | Hardcoded answers cite fake verified records; production correctly disables Ask          | Misleading           | Keep production unavailable state; add stronger prototype disclosure    |
| Symptom/allergy advice prompts          | Not Now when diagnostic or treatment-oriented | Prototype suggests “What should I watch for with allergies?”                             | Scope creep          | Remove ambiguous health-advice prompts from the prototype               |
| Care-card preview                       | Now                                           | Production owner-only preview from persisted records                                     | Aligned              | Keep bounded and record-based                                           |
| Scoped share links                      | Now                                           | Production creates/revokes one scoped link; prototype depicts richer access              | Partially aligned    | Execute lifecycle hardening before broader testing                      |
| Caregiver accounts and named recipients | Next/Not Now at current sophistication        | Prototype lists brother and clinic as viewers                                            | Scope creep          | Remove named recipient/account claims or label as future concept        |
| PDF-style export                        | Next                                          | Disabled honestly in production; active-looking prototype action                         | Misleading           | Keep disabled until an approved export task                             |
| Email summary delivery                  | Next/Unclear                                  | Active-looking prototype action only                                                     | Misleading           | Remove or label unavailable                                             |
| Emergency card                          | Next/Unclear; emergency advice is Not Now     | Prototype summary type available-looking                                                 | Scope creep          | Avoid emergency framing until content and legal boundaries are approved |
| Notification delivery                   | Next                                          | Production notification control is disabled; prototype toggles and test action look live | Misleading           | Make all prototype notification controls visibly unavailable            |
| Timeline history                        | Now                                           | Production CRUD persists owner-entered events                                            | Aligned              | Retain manual-history model                                             |
| Automatic timeline events               | Later                                         | Prototype shows extraction and reminder events as automatically generated                | Scope creep          | Label as future automation                                              |
| Timeline export                         | Next                                          | Disabled in production; active-looking in prototype                                      | Partially aligned    | Keep disabled and truthful                                              |
| Settings and consent                    | Now                                           | Database-backed production settings and consent                                          | Aligned              | Fix mobile overflow and preserve request-based data rights              |
| Data export and deletion requests       | Now                                           | Production persists requests; prototype says it sends no requests                        | Aligned              | Preserve production truthfulness and complete runbook                   |
| Multi-pet switcher                      | Next                                          | Production says “one pet”; prototype has switcher-like controls                          | Partially aligned    | Remove prototype chevrons implying real switching                       |
| Clinic access/partner workflow          | Not Now                                       | Prototype lists a veterinary clinic with access                                          | Scope creep          | Remove from the current prototype                                       |

## 3. Backlog Alignment

The implementation has not replaced the authoritative backlog. Several polished prototype concepts visually leap ahead of higher-priority foundation work, but they live in the isolated `features/mvp-flow` slice and are not wired into production. That isolation is important and should remain.

| Backlog Priority | Task                                            | Current Status            | Evidence                                                                  | Recommendation                                                |
| ---------------: | ----------------------------------------------- | ------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------- |
|                1 | Codex harness readiness                         | Review                    | Architecture map, staged verification, and governance checks exist        | Human review; retain                                          |
|                2 | Simplify spec workflow                          | Review                    | Lean task/ADR model and gates exist                                       | Human review; retain                                          |
|                3 | Pet profile IA and controls                     | Review                    | Production communicates one-pet scope and persists profile                | Human review; retain                                          |
|                4 | Reminder creation mockup alignment              | Review                    | Production create/edit/reminder preview is persisted and tested           | Human review; repeat visual capture when practical            |
|                5 | Document upload storage implementation          | Planned                   | Production explicitly says metadata only; prototype claims upload         | Start next after review work is accepted                      |
|                6 | Audit and product-event foundation              | Planned                   | Audit coverage is incomplete across documents and sharing                 | Implement after storage boundaries are known                  |
|                7 | Data-rights manual runbook                      | Planned                   | Production queues requests but operations remain manual                   | Complete before public upload                                 |
|                8 | Share-link lifecycle hardening                  | Planned                   | Basic create/revoke exists; access evidence and revoke-all need hardening | Complete before broader sharing validation                    |
|                9 | Live RLS fixture isolation                      | Planned                   | Existing live tests are opt-in; fixture isolation remains required        | Complete before expanding live checks                         |
|               10 | Public health-upload release-readiness playbook | Planned                   | ADR 0031 blocks public record upload without it                           | Complete before release approval                              |
|               11 | Feature-boundary dependency guardrails          | Planned                   | Current hygiene gate covers some sensitive imports                        | Extend without broad refactor                                 |
|               12 | Task-based Codex handoff                        | Review                    | Task status helper and validation exist                                   | Human review; fix documented `--` command mismatch separately |
|               13 | Caniello MVP flow governance audit              | In progress at audit time | This report and temporary browser evidence                                | Move to review after verification                             |

Higher-priority work has not been silently reordered, but `/mvp-flow` visually suggests that Later capabilities are further along than backlog priorities 5–10. The next production work should continue from priority 5, not from the most visually impressive prototype screen.

## 4. `/mvp-flow` Journey Validation

| Step | Expected User Action               | Actual Result                                                                            | State Carries Forward? | Scope         | Status         | Priority |
| ---: | ---------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------- | ------------- | -------------- | -------- |
|    1 | Register                           | Blank form submits without validation or API call and advances to login                  | Session only           | Now           | Prototype only | P1       |
|    2 | Log in                             | Blank form advances directly to onboarding                                               | Session only           | Now           | Prototype only | P1       |
|    3 | Land in first-run onboarding       | Welcome screen renders                                                                   | Yes, until reload      | Now           | Done           | P2       |
|    4 | Add first pet                      | Prefilled Bruno card advances directly to Documents                                      | Boolean flag only      | Now           | Partial        | P1       |
|    5 | Create first reminder              | Not offered after pet creation; user is sent to Documents                                | No                     | Now           | Broken         | P0       |
|    6 | Return to dashboard                | No returning-owner dashboard exists in `/mvp-flow`; Home remains onboarding              | No                     | Now           | Missing        | P0       |
|    7 | Dashboard shows reminder           | Cannot be demonstrated because reminder save routes to Timeline                          | No                     | Now           | Missing        | P0       |
|    8 | Upload first document              | Clicking Upload PDF advances without selecting or transmitting a file                    | Session flag only      | Now           | Prototype only | P0       |
|    9 | Privately access uploaded document | Preloaded fake document preview is shown; no uploaded file exists                        | No                     | Now           | Missing        | P0       |
|   10 | Return after a few days            | Reload resets the whole experience to signup                                             | No                     | Now           | Broken         | P0       |
|   11 | Open Timeline                      | Timeline is reachable from navigation or after reminder save                             | Yes, until reload      | Now           | Done           | P2       |
|   12 | See history and upcoming panel     | Hardcoded history plus session-created reminder appear                                   | Session only           | Now           | Partial        | P1       |
|   13 | Change Settings preferences        | Controls toggle visually and Save shows a session-only confirmation                      | Session only           | Now           | Prototype only | P1       |
|   14 | See document processing            | Hardcoded processing state appears immediately                                           | No persisted job       | Later         | Prototype only | P3       |
|   15 | See AI extraction                  | Fixed fields and progress states are displayed                                           | No                     | Later         | Prototype only | P3       |
|   16 | Review extracted information       | Review screen is reachable; fields appear editable                                       | No                     | Later         | Prototype only | P3       |
|   17 | Confirm extracted information      | Advances to Reminders but does not add a document, timeline event, or suggested reminder | No                     | Later         | Broken         | P3       |
|   18 | Open Ask Caniello                  | Hardcoded grounded-looking answers and fake verified sources appear                      | Draft only             | Later         | Prototype only | P3       |
|   19 | Preview sharing summary            | Hardcoded full summary and access list appear                                            | No                     | Later/Not Now | Prototype only | P3       |

The flow is clickable end to end, but it does not demonstrate the required Now-scope activation loop faithfully. Its actual order is:

`signup → login → onboarding → documents → fake upload → fake processing → fake review → reminders → create reminder → timeline → Ask → sharing → settings`

The required order is reminder-first after pet creation, followed by dashboard confirmation, then real document upload and private access.

## 5. Screen-by-Screen Audit

| Screen                 | Present                                     | Reachable      | Interactive                                   | Production-Ready   | Scope                    | Visual Fidelity 0–5 | DESIGN.md Alignment           | Notes                                                                         |
| ---------------------- | ------------------------------------------- | -------------- | --------------------------------------------- | ------------------ | ------------------------ | ------------------: | ----------------------------- | ----------------------------------------------------------------------------- |
| Register               | Yes, prototype and production               | Yes            | Prototype simulated; production real          | Production only    | Now                      |                   4 | Strong                        | Production correctly disables OAuth and defaults to Polish                    |
| Login                  | Yes, prototype and production               | Yes            | Prototype simulated; production real          | Production only    | Now                      |                   4 | Strong                        | Production login reached `/app` with the local demo owner                     |
| First Run              | Yes in both                                 | Yes            | Prototype prefilled; production persists      | Production mostly  | Now                      |                   4 | Strong visually               | Prototype overclaims AI and reminder delivery                                 |
| Home Dashboard         | Production only                             | `/app` section | Yes                                           | Partial            | Now                      |                   4 | Strong                        | Persisted reminders/documents; Ask is honestly unavailable                    |
| Pets / Pet Profile     | Production only; prototype nav aliases Home | `/app` section | Yes                                           | Partial            | Now                      |                   3 | Good                          | Prototype “Pets” does not show a pet profile                                  |
| Reminders              | Yes in both                                 | Yes            | Prototype session; production persisted       | Production mostly  | Now                      |                   4 | Strong                        | Prototype notification controls look live                                     |
| Documents Library      | Yes in both                                 | Yes            | Prototype hardcoded; production metadata CRUD | No file readiness  | Now                      |                   4 | Strong                        | Production labels metadata-only behavior truthfully                           |
| Upload / Scan Document | Prototype only                              | Yes            | Buttons merely advance                        | No                 | Now upload; scan unclear |                   4 | Strong appearance             | Limits conflict with ADR 0025 and no file input exists                        |
| Processing Document    | Prototype only                              | Yes            | Navigation only                               | No                 | Later                    |                   5 | Strong                        | Needs an unmistakable concept/prototype banner                                |
| Review & Confirm       | Prototype only                              | Yes            | Fields and actions are mostly cosmetic        | No                 | Later                    |                   5 | Strong                        | Confirm does not create the promised records                                  |
| Timeline               | Yes in both                                 | Yes            | Prototype session; production persisted CRUD  | Production partial | Now                      |                   4 | Strong                        | Production correctly separates upcoming reminders                             |
| Ask Caniello           | Yes in both                                 | Yes            | Prototype hardcoded; production disabled      | No                 | Later                    |                   4 | Visually strong, safety mixed | “Ask anything” and allergy prompts are too broad                              |
| Sharing / Care Summary | Yes in both                                 | Yes            | Prototype cosmetic; production scoped links   | Production partial | Now/Next/Later mix       |                   4 | Strong appearance             | Prototype implies named recipients, clinic access, email, PDF, and revoke-all |
| Settings               | Yes in both                                 | Yes            | Prototype session; production persisted       | Production mostly  | Now                      |                   4 | Strong                        | Production mobile width is 416px in a 390px viewport                          |

## 6. Normal Routes vs `/mvp-flow`

| Route               | Exists         | Matches MVP Flow                                 | Reuses Components           | Risk                     | Recommendation                                                   |
| ------------------- | -------------- | ------------------------------------------------ | --------------------------- | ------------------------ | ---------------------------------------------------------------- |
| `/`                 | Yes            | Marketing only                                   | No                          | Low                      | Keep separate                                                    |
| `/login`            | Yes            | Similar visual shell, real behavior              | Shares account feature only | Low                      | Production is authoritative                                      |
| `/register`         | No, 404        | No                                               | No                          | Medium                   | Redirect to `/signup` only if legacy links require it            |
| `/signup`           | Yes            | Similar visual shell, real behavior              | Shares account feature only | Low                      | Production is authoritative                                      |
| `/dashboard`        | No, 404        | Dashboard exists under `/app`                    | No route                    | Medium                   | Decide deep-link route strategy after current backlog work       |
| `/app`              | Yes, protected | Contains production versions of most sections    | No prototype reuse          | Medium                   | Keep as the production boundary                                  |
| `/pets`             | No, 404        | Production section exists under `/app`           | No route                    | Medium                   | Add section deep links or route redirects in a dedicated IA task |
| `/reminders`        | No, 404        | Production section exists under `/app`           | No route                    | Medium                   | Same as above                                                    |
| `/documents`        | No, 404        | Production metadata section exists under `/app`  | No route                    | Medium                   | Same as above                                                    |
| `/documents/upload` | No, 404        | Only fake prototype screen exists                | No                          | High                     | Do not add until storage task defines the real flow              |
| `/timeline`         | No, 404        | Production section exists under `/app`           | No route                    | Medium                   | Add after route-state approach is chosen                         |
| `/ask`              | No, 404        | Production unavailable state exists under `/app` | No route                    | Low                      | Do not create a production Ask route yet                         |
| `/sharing`          | No, 404        | Production sharing section exists under `/app`   | No route                    | Medium                   | Add deep linking after lifecycle hardening                       |
| `/settings`         | No, 404        | Production settings section exists under `/app`  | No route                    | Medium                   | Add section deep linking; settings itself is real                |
| `/mvp-flow`         | Yes            | Dedicated visual prototype                       | Isolated by architecture    | High if mistaken for MVP | Keep prototype-only and add persistent disclosure                |

Recommendation: keep `/mvp-flow` isolated as a prototype. Do not promote its components or state model wholesale. Consolidate visual tokens and small presentational patterns only when production tasks need them. Add production section deep linking as a separate route/IA task after the current security and storage backlog, rather than building parallel top-level pages now.

## 7. Data Flow Findings

| Data flow                                     | Result                | Evidence                                                                       | Suggested fix                                                             |
| --------------------------------------------- | --------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| Prototype registration → login                | Hardcoded only        | Blank submit advances locally                                                  | Add simulated/prototype disclosure; production auth already exists        |
| Production registration/login                 | Working               | Real API routes, protected `/app`, local demo login succeeded                  | Retain and complete live new-owner validation as needed                   |
| Prototype pet creation → next screen          | Partial               | Sets `petAdded` and jumps to Documents                                         | Match the intended reminder-first flow or label the flow as a visual tour |
| Production pet creation → dashboard           | Working               | API-backed profile and first-run/returning dashboard code and tests            | Preserve                                                                  |
| Prototype pet creation → pet switcher         | Hardcoded only        | Bruno appears before creation and remains fixed                                | Remove switcher implication                                               |
| Production pet → header/dashboard             | Working               | `/api/pets/profile` populates first-pet context                                | Preserve first-pet honesty                                                |
| Prototype reminder creation → dashboard       | Missing               | Save routes directly to Timeline                                               | Add dashboard step only in a prototype-fidelity task                      |
| Production reminder creation → reminders list | Working               | API-backed create/edit and tests                                               | Preserve                                                                  |
| Production reminder creation → dashboard      | Working               | Dashboard reads `/api/reminders`                                               | Preserve                                                                  |
| Reminder completion → timeline                | Partial               | Production completion persists, but timeline automation is explicitly disabled | Keep reminders and manual history separate until approved automation      |
| Prototype upload → document library           | Broken                | No file is selected; preloaded library does not change                         | Add concept labeling; do not fake persistence                             |
| Production upload → storage                   | Missing               | Production says metadata only                                                  | Implement backlog priority 5                                              |
| Production document metadata → library        | Working               | API-backed metadata CRUD                                                       | Preserve until real upload extends it                                     |
| Private file access                           | Missing               | No stored file or signed URL                                                   | Implement server-mediated signed access                                   |
| Processing → review                           | Prototype only        | Button changes component state                                                 | Keep Later                                                                |
| Review confirmation → document library        | Missing               | Confirm routes to Reminders                                                    | Later task must define persisted state                                    |
| Review confirmation → timeline                | Missing               | No event created                                                               | Later task                                                                |
| Review confirmation → reminders               | Broken                | Existing hardcoded reminders show; suggestion is not added                     | Later task                                                                |
| Verified records → Ask                        | Hardcoded only        | Fake citations and “Verified” chips                                            | Production correctly disables Ask                                         |
| Pet records → sharing preview                 | Working in production | Production loads pet, reminders, and documents from APIs                       | Preserve                                                                  |
| Share link create/revoke                      | Partial               | Production basic link lifecycle exists                                         | Complete backlog priority 8                                               |
| Settings changes → persistence                | Working in production | Settings API and database-backed profile/consent                               | Preserve                                                                  |
| Prototype settings → persistence              | Hardcoded only        | “Saved for this prototype session”; reload resets                              | Disclosure is accurate but should be globally visible                     |

## 8. Design Fidelity Findings

### Authentication

The prototype and production authentication screens closely match the references: split layout, warm pet imagery, navy typography, purple actions, and clear form hierarchy. Production improves truthfulness by disabling OAuth explicitly. Its Polish-first default intentionally differs from the English mockups and correctly follows repository requirements.

Priority: P2 for remaining visual polish only.

### First Run

The prototype captures the reference composition well, including the step strip, two large onboarding panels, pet imagery, and document-extraction story. At 1280px the right-side extracted-details mini-preview is visibly clipped, demonstrating that reference density was compressed without a robust responsive adaptation. Production onboarding should remain the behavioral source while selectively adopting the prototype composition.

Priority: P1 for truthful copy; P2 for layout clipping.

### Dashboard

Production follows the core visual language—serif headings, cream highlights, navy controls, pet identity, “What’s next,” documents, timeline, Ask, sharing, and tip cards. It is less dense and editorial than the supplied mockup but is coherent and much more truthful. Empty and unavailable states are especially good.

Priority: P2.

### Documents

The prototype is visually close to the documents mockups, including table density and right-side preview. The production screen is intentionally simpler and metadata-focused. The visual gap should not be closed until real file upload and preview semantics exist.

Priority: P1 after storage implementation; otherwise P3.

### Reminders

The production reminder editor already follows the mockup composition and has desktop/mobile evidence in its task. The prototype reminder list is visually strong but implies email, push, snooze, timezone processing, and test notification behavior that does not exist.

Priority: P1 for prototype truthfulness; P2 for list polish.

### Timeline

Both surfaces follow the chronology and upcoming-side-panel distinction required by `DESIGN.md`. Production correctly disables export and automatic events. The prototype visually matches the reference but mixes a newly created future reminder into chronological history without explaining that it is a simulated event.

Priority: P2.

### Ask Caniello

The prototype has strong warm assistant styling and record citations. Safety copy appears at the bottom, but the headline “Ask anything,” behavior/health framing, allergy prompt, confident clinical summary, and created-petsitter-PDF claim outweigh the small disclaimer. Production’s unavailable state is safer and should remain authoritative.

Priority: P1 for scope and safety labeling; P3 for actual feature work.

### Sharing

The prototype closely follows the reference and communicates read-only summaries. However, it overflows horizontally at 1280px (`1493px` document width), and active-looking controls imply PDF generation, email, revoke-all, named caregiver access, and clinic access. Production is visually simpler but accurately describes scoped links and disabled PDF/caregiver behavior.

Priority: P1 for truthfulness and overflow; P3 for future capabilities.

### Settings

Production settings are visually polished, owner-controlled, and aligned with privacy and medical boundaries. At 390px the document width is `416px`, creating 26px horizontal overflow. The captured image also shows clipped horizontal navigation and cramped header controls.

Priority: P1.

## 9. Product Safety and Trust Findings

| Area                             | Finding                                                                                                                            | Risk   | Recommendation                                                           |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------ |
| Medical boundaries               | Production repeatedly states it does not diagnose, treat, provide emergency advice, or replace a veterinarian                      | Low    | Preserve                                                                 |
| Veterinarian replacement         | No direct replacement claim found                                                                                                  | Low    | Preserve                                                                 |
| Official passport                | Production explicitly says it is not an official passport; prototype generally omits this                                          | Medium | Add the boundary to prototype document/sharing surfaces                  |
| Ask overclaim                    | “Ask anything,” allergy prompts, confident clinical summaries, and generated-note claims imply more than organizational assistance | High   | Add prominent prototype and non-medical boundaries; remove risky prompts |
| Source trust                     | Prototype uses fake “Verified” records and citations without identifying them as sample data                                       | High   | Label all prototype records as fictional sample data                     |
| Extraction confirmation          | Prototype says nothing saves until confirmation, which is good, but confirmation saves nothing                                     | Medium | Label the interaction as simulated                                       |
| Privacy messaging                | Prototype says data is encrypted and securely stored despite no data being transmitted or stored                                   | High   | Replace with “No files are uploaded in this prototype”                   |
| Production document truthfulness | Production clearly says metadata only and no upload/OCR                                                                            | Low    | Preserve until storage exists                                            |
| Notification claims              | Prototype shows enabled email/push toggles and “Send test notification”                                                            | High   | Disable and label unavailable                                            |
| Sharing claims                   | Prototype suggests named recipients, clinic access, email, PDF, and revoke-all                                                     | High   | Reduce to conceptual examples or remove                                  |
| Production sharing               | Scoped read-only link behavior exists; PDF and caregiver access are disabled                                                       | Medium | Complete lifecycle hardening                                             |
| Data rights                      | Production presents export/deletion as requests and manual fulfillment                                                             | Low    | Complete operational runbook                                             |
| Auth claims                      | Production accurately marks OAuth unavailable                                                                                      | Low    | Preserve                                                                 |
| Emergency behavior               | Prototype “Emergency Card” may imply urgent-care reliability                                                                       | High   | Remove until a separately approved bounded content task                  |

## 10. Code Quality Findings

### Architecture

- `ARCHITECTURE.md` correctly isolates `features/mvp-flow`; production does not depend on its local-state behavior.
- Production follows the intended UI → API route → feature server helper → Supabase flow.
- Sensitive storage, sharing, account, and audit boundaries remain server-side.

### Component structure

- `MvpFlowPrototype.tsx` is 2,691 lines and its CSS module is 2,907 lines. The single component file owns navigation, state, copy, sample records, all screens, and icon rendering.
- This is acceptable for a short-lived prototype but expensive to maintain as a canonical product reference.
- Production uses smaller feature-local components and hooks, which is the healthier long-term structure.

### Route structure

- Production has one protected `/app` route with client-side section state.
- This avoids duplication but prevents direct links, refresh-safe section URLs, browser history, and the normal route structure expected by the audit prompt.
- A later IA task should add a deliberate route or query-parameter strategy rather than copying prototype pages.

### Duplication

- Authentication imagery and broad visual language are shared conceptually, but prototype and production app shells are separate.
- Dashboard, documents, reminders, timeline, sharing, settings, navigation, copy, and sample data are duplicated.
- Do not consolidate stateful components wholesale. Consolidate only stable tokens, icons, and presentation primitives when production work needs them.

### State management

- Prototype: local `useState`; no URL state, persistence, API, or reload continuity.
- Production: local view state plus API-backed persisted domain data.
- The production pattern is appropriate for the current scale, though section routing should become URL-addressable.

### TypeScript

- Production uses shared contract types at API boundaries.
- Prototype uses internal unions and tuple-like hardcoded arrays; several records rely on positional indices, reducing readability and change safety.
- No TypeScript errors were observed in focused tests.

### Testability

- The prototype has one end-to-end component test that confirms the happy-path sequence but not truthfulness, reload reset, overflow, inactive controls, or route semantics.
- Production has broad component, route, server-helper, RLS, and Playwright coverage.
- Add only targeted prototype governance tests if `/mvp-flow` remains public or user-facing.

### Accessibility

- DOM structure generally exposes headings, controls, navigation, and labels.
- Several prototype controls are buttons with no effect, generic icon-only buttons lack useful names, and disabled semantics are inconsistent.
- Active-looking prototype controls create cognitive and accessibility risk even when keyboard reachable.
- Responsive reflow needs correction on sharing and production mobile settings.
- This audit does not claim WCAG compliance; screen-reader behavior, keyboard order, contrast calculations, zoom, and error announcements need dedicated testing.

### Privacy and security

- Production is aligned with owner isolation and RLS architecture.
- Prototype contains only fictional local data, but its encryption/storage/access claims could mislead users into believing sensitive actions occurred.
- Public use of `/mvp-flow` should be treated as a communication risk rather than a data-security boundary.

## 11. Bugs and Broken Flows

| Bug                                             | Severity | Reproduction Steps                         | Expected Behavior                                     | Actual Behavior                                           | Suggested Fix                                                                                    |
| ----------------------------------------------- | -------- | ------------------------------------------ | ----------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Prototype state resets on reload                | High     | Complete any flow step; reload `/mvp-flow` | Resume or clearly identify a non-persistent prototype | Returns to signup and loses all state                     | Add persistent prototype banner and reset expectation; optional session storage only if approved |
| Pet creation skips reminder-first journey       | High     | Login; click Add Bruno                     | Create first reminder, then dashboard                 | Opens pre-populated Documents Library                     | Reorder prototype journey in a dedicated task                                                    |
| No returning dashboard in `/mvp-flow`           | High     | Complete reminder; click Home              | Dashboard shows saved reminder                        | Home shows onboarding                                     | Add separate prototype dashboard state or stop claiming end-to-end MVP                           |
| Upload control does not select a file           | Critical | Open Upload; click Upload PDF              | File picker/validation or explicit simulation         | Immediately shows fake processing                         | Disable and label simulated until real upload exists                                             |
| Prototype upload limits conflict with ADR       | High     | Open Upload                                | 5 MB; PDF/JPEG/PNG/WebP                               | 25 MB, HEIC, and 50 pages                                 | Align prototype copy with ADR 0025                                                               |
| Confirmation saves nothing                      | High     | Processing → Review → Confirm              | Document/timeline/reminder state updates              | Opens unchanged Reminders screen                          | Label as simulated or implement only in Later scope                                              |
| Ask settings action opens Sharing               | Medium   | Ask screen; click Open settings            | Settings screen                                       | Sharing screen                                            | Fix navigation target                                                                            |
| Prototype notification controls imply delivery  | High     | Open Reminders or Settings                 | Clearly unavailable controls                          | Enabled toggles and test action                           | Disable with explanatory copy                                                                    |
| Sharing controls imply unavailable capabilities | High     | Open Sharing                               | Prototype-only labels                                 | PDF, email, revoke-all, and access management appear live | Add unavailable states and scope labels                                                          |
| Sharing overflows at desktop width              | Medium   | Open Sharing at 1280px                     | No horizontal overflow                                | Document width is 1493px                                  | Rework grid/min-width constraints                                                                |
| First-run extraction mini-preview clips         | Medium   | Open first run at 1280px                   | Complete panel visible                                | Right side is clipped                                     | Collapse or simplify the demo at narrower desktop widths                                         |
| Production Settings overflows on mobile         | Medium   | Open `/app` Settings at 390px              | Width ≤390px                                          | Width is 416px                                            | Fix header/nav/card min-width and wrapping                                                       |
| Requested normal routes return 404              | Medium   | Open `/documents`, `/timeline`, etc.       | Deep link to production sections                      | 404                                                       | Add a deliberate section route/deep-link strategy                                                |
| Prototype Pets nav opens Home                   | Medium   | Click Pets in `/mvp-flow`                  | Pet profile                                           | First-run Home                                            | Add a real prototype pet screen or remove the nav item                                           |
| Prototype active pet controls imply switching   | Low      | Click Bruno/chevron                        | Switch or explain one-pet scope                       | Routes to onboarding                                      | Remove chevron and switcher semantics                                                            |

## 12. Recommended Backlog

This is the complete recommended work inventory from the audit. The application
items now have governance-valid task contracts in `BACKLOG.md`; future-roadmap
contracts remain planning-only until explicitly promoted to `Now`. Existing
priorities 1–13 remain in their original order.

### P0 — Now-scope blockers

| Priority | Epic                   | Task                                                | Acceptance Criteria                                                                                   |
| -------- | ---------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| P0       | Documents              | Implement private document file upload and access   | Approved types/limits persist in private Storage; signed owner access works; cross-owner access fails |
| P0       | Prototype truthfulness | Add persistent `/mvp-flow` prototype disclosure     | Every screen identifies sample data, simulated actions, non-persistence, and unavailable capabilities |
| P0       | Prototype journey      | Correct the Now-scope activation sequence           | Pet → reminder → dashboard → upload is reachable in order; dashboard reflects session reminder        |
| P0       | Documents              | Remove false upload/storage behavior from prototype | Upload buttons do not imply a real file was stored or encrypted                                       |
| P0       | State                  | Make prototype reset behavior explicit              | Reload/reset expectation is visible before users enter the flow                                       |

### P1 — MVP Foundation

| Priority | Epic           | Task                                                       | Acceptance Criteria                                                                                    |
| -------- | -------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| P1       | Trust          | Align prototype capabilities and limits with accepted ADRs | File types, limits, auth, sharing, notification, export, and first-pet copy are accurate               |
| P1       | Audit          | Complete bounded audit and product-event foundation        | Covered sensitive actions emit safe server-side evidence; UI cannot write events                       |
| P1       | Data rights    | Complete manual export/deletion runbook                    | A fresh operator can fulfill and evidence a request safely                                             |
| P1       | Sharing        | Harden scoped share-link lifecycle                         | Open evidence, generic failures, expiry, revoke-one/all, and token secrecy are covered                 |
| P1       | Security tests | Isolate live RLS fixtures                                  | Live suites leave seeded demo records unchanged and clean up failures visibly                          |
| P1       | Release        | Complete public-upload readiness playbook                  | Storage, RLS, data rights, recovery, support, and rollback have explicit evidence and owners           |
| P1       | Architecture   | Complete feature-boundary guardrails                       | Sensitive dependencies and cross-feature imports are mechanically checked                              |
| P1       | Responsive     | Fix production Settings mobile overflow                    | No overflow at 320, 375, 390, and 430px; controls remain usable                                        |
| P1       | Responsive     | Fix prototype desktop sharing and onboarding clipping      | No horizontal overflow or clipped panels at 1280, 1440, and 1920px                                     |
| P1       | Navigation     | Correct mislabeled and incorrect prototype navigation      | Ask “Open settings,” Pets, Home, and pet-context actions lead to truthful destinations                 |
| P1       | Notifications  | Disable prototype notification delivery claims             | Email, push, digest, snooze, and test-send controls are visibly nonfunctional                          |
| P1       | Medical safety | Tighten Ask and emergency copy                             | No “ask anything,” symptom-like prompts, diagnosis-adjacent summaries, or emergency reliability claims |

### P2 — UX polish and completeness

| Priority | Epic                      | Task                                               | Acceptance Criteria                                                                             |
| -------- | ------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| P2       | Routing                   | Add URL-addressable production sections            | Refresh, back/forward, bookmarks, and protected redirects preserve the active section           |
| P2       | Dashboard                 | Continue production dashboard mockup alignment     | Persisted data remains authoritative while visual hierarchy approaches the reference            |
| P2       | Documents                 | Redesign production library after storage lands    | Real files, statuses, preview affordances, errors, and empty states are represented accurately  |
| P2       | Accessibility             | Audit keyboard, focus, labels, contrast, and zoom  | Critical flows pass documented keyboard and 200% zoom checks with named residual risks          |
| P2       | Prototype maintainability | Split the monolithic prototype into screen modules | Behavior is unchanged; screen data and navigation are easier to audit                           |
| P2       | Shared presentation       | Graduate stable design primitives only             | Reuse is limited to proven tokens/icons/cards without importing prototype state into production |
| P2       | Route compatibility       | Add `/register` compatibility only if needed       | Legacy links redirect to `/signup` without creating duplicate auth pages                        |
| P2       | Localization              | Decide whether the prototype remains English-only  | Public labeling explains language limits or equivalent Polish copy exists                       |

### P3 — Later, Next, or Not Now

| Priority | Epic                    | Task                                                         | Acceptance Criteria                                                                    |
| -------- | ----------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| P3       | Assisted documents      | Define staged processing states without a provider           | Status persistence, retry/failure, owner review, and no-AI boundary are specified      |
| P3       | Extraction              | Select and approve an OCR/AI provider                        | Data handling, evaluation, retries, consent, cost, and medical boundaries are approved |
| P3       | Intake                  | Implement owner-confirmed extraction                         | Nothing becomes trusted history before explicit owner confirmation                     |
| P3       | Suggestions             | Add reminder suggestions                                     | Suggestions are editable, optional, source-linked, and never auto-saved                |
| P3       | Ask                     | Implement grounded record retrieval                          | Answers cite owner records, expose uncertainty, and reject unsafe medical requests     |
| P3       | Sharing summaries       | Generate summaries from verified owner records               | Summary provenance and read-only scope are visible                                     |
| P3       | Export                  | Implement approved PDF/care-card export                      | Export is scoped, audited, owner-triggered, and securely streamed or stored            |
| P3       | Reminder delivery       | Implement real delivery                                      | Timezone, consent, retries, provider behavior, and opt-out semantics are defined       |
| P3       | Multi-pet               | Add real multi-pet management                                | Active-pet state, CRUD, filtering, sharing, mobile, and RLS are approved               |
| P3       | Caregiver access        | Add caregiver accounts only after link safety is proven      | Invitations, roles, revocation, identity, and audit behavior have an approved ADR      |
| P3       | Email sharing           | Add transactional summary email only after provider approval | Recipient consent, delivery evidence, failure handling, and privacy are defined        |
| P3       | Emergency content       | Evaluate a bounded care-information card                     | It contains owner-entered facts only and does not imply emergency advice               |
| P3       | Clinic/partner learning | Conduct lightweight research without workflow ownership      | No clinic portal, upload path, EHR/PIMS integration, or access role is created         |

## 13. Complete Ordered Task List

The first ten entries are the immediate “Next 10.” The remaining entries are
the complete follow-on queue. Existing backlog items stay ahead of newly
recommended audit work unless a human explicitly changes `ROADMAP.md` or
`BACKLOG.md`.

The 26 production-application items map to these canonical contracts:

| App item | Task contract                                                                                                         | Roadmap |
| -------- | --------------------------------------------------------------------------------------------------------------------- | ------- |
| 1        | [`document-upload-storage-implementation`](../spec/tasks/document-upload-storage-implementation.md)                   | Now     |
| 2        | [`audit-product-event-foundation`](../spec/tasks/audit-product-event-foundation.md)                                   | Now     |
| 3        | [`data-rights-manual-runbook`](../spec/tasks/data-rights-manual-runbook.md)                                           | Now     |
| 4        | [`share-link-lifecycle-hardening`](../spec/tasks/share-link-lifecycle-hardening.md)                                   | Now     |
| 5        | [`live-rls-fixture-isolation`](../spec/tasks/live-rls-fixture-isolation.md)                                           | Now     |
| 6        | [`public-health-upload-release-readiness-playbook`](../spec/tasks/public-health-upload-release-readiness-playbook.md) | Now     |
| 7        | [`feature-boundary-dependency-guardrails`](../spec/tasks/feature-boundary-dependency-guardrails.md)                   | Now     |
| 8        | [`settings-mobile-overflow-fix`](../spec/tasks/settings-mobile-overflow-fix.md)                                       | Now     |
| 9        | [`app-section-deep-link-architecture`](../spec/tasks/app-section-deep-link-architecture.md)                           | Now     |
| 10       | [`dashboard-visual-fidelity`](../spec/tasks/dashboard-visual-fidelity.md)                                             | Now     |
| 11       | [`documents-storage-backed-ui`](../spec/tasks/documents-storage-backed-ui.md)                                         | Now     |
| 12       | [`authenticated-app-accessibility-audit`](../spec/tasks/authenticated-app-accessibility-audit.md)                     | Now     |
| 13       | [`stable-presentation-primitives-review`](../spec/tasks/stable-presentation-primitives-review.md)                     | Now     |
| 14       | [`document-processing-state-foundation`](../spec/tasks/document-processing-state-foundation.md)                       | Later   |
| 15       | [`ocr-ai-provider-evaluation`](../spec/tasks/ocr-ai-provider-evaluation.md)                                           | Later   |
| 16       | [`owner-confirmed-extraction-intake`](../spec/tasks/owner-confirmed-extraction-intake.md)                             | Later   |
| 17       | [`verified-intake-reminder-suggestions`](../spec/tasks/verified-intake-reminder-suggestions.md)                       | Later   |
| 18       | [`grounded-ask-caniello`](../spec/tasks/grounded-ask-caniello.md)                                                     | Later   |
| 19       | [`verified-record-sharing-summaries`](../spec/tasks/verified-record-sharing-summaries.md)                             | Later   |
| 20       | [`secure-care-card-pdf-export`](../spec/tasks/secure-care-card-pdf-export.md)                                         | Next    |
| 21       | [`reminder-delivery`](../spec/tasks/reminder-delivery.md)                                                             | Next    |
| 22       | [`multi-pet-scope-decision`](../spec/tasks/multi-pet-scope-decision.md)                                               | Next    |
| 23       | [`caregiver-access-scope-decision`](../spec/tasks/caregiver-access-scope-decision.md)                                 | Next    |
| 24       | [`email-sharing-scope-decision`](../spec/tasks/email-sharing-scope-decision.md)                                       | Not Now |
| 25       | [`emergency-card-scope-decision`](../spec/tasks/emergency-card-scope-decision.md)                                     | Next    |
| 26       | [`partner-workflow-scope-decision`](../spec/tasks/partner-workflow-scope-decision.md)                                 | Later   |

### Next 10

#### 1. Human review and merge of existing review-ready tasks

- Reason: priorities 1–4 and 12 already contain completed implementation and verification.
- Priority/scope: P1 / Now.
- Affected areas: governance harness, pet profile, reminder creation, task workflow.
- Dependencies: human review.
- Acceptance: accepted review feedback is addressed; tasks are merged and removed through the normal cleanup process.

#### 2. Document upload storage implementation

- Reason: real private documents are a core Now promise and the largest functional gap.
- Priority/scope: P0 / Now.
- Affected areas: `/app` Documents, `/api/documents`, Storage, contracts, RLS.
- Dependencies: explicit migration approval.
- Acceptance: matches the active task and ADR 0025, including signed access and owner isolation.

#### 3. Audit and product-event foundation

- Reason: document and sharing actions require bounded evidence before public use.
- Priority/scope: P1 / Now.
- Affected areas: feature server helpers, audit logs, event contracts and tests.
- Dependencies: storage action shapes from task 2.
- Acceptance: matches active task criteria without storing medical content or secrets.

#### 4. Data-rights manual runbook

- Reason: export and deletion requests exist, but operators need a safe fulfillment process.
- Priority/scope: P1 / Now.
- Affected areas: operational documentation, Auth, database, Storage, audit evidence.
- Dependencies: document lifecycle from task 2 and audit boundaries from task 3.
- Acceptance: a fresh operator can complete a dry run and preserve required evidence.

#### 5. Share-link lifecycle hardening

- Reason: production sharing exists but needs open evidence, safe failure, and revoke-all behavior.
- Priority/scope: P1 / Now.
- Affected areas: sharing server helpers, public share route, audit evidence, tests.
- Dependencies: audit foundation.
- Acceptance: matches active task criteria and does not expose document files.

#### 6. Live RLS fixture isolation

- Reason: security validation must not mutate seeded demo records.
- Priority/scope: P1 / Now.
- Affected areas: live RLS test fixtures and cleanup.
- Dependencies: stable storage and sharing test surfaces.
- Acceptance: before/after seed state is unchanged and cleanup failures are visible.

#### 7. Public health-upload release-readiness playbook

- Reason: ADR 0031 blocks public health-record collection without explicit operational evidence.
- Priority/scope: P1 / Now.
- Affected areas: deployment, Storage, RLS, backups, rollback, data rights, incidents.
- Dependencies: tasks 2–6.
- Acceptance: tabletop review passes; no release is implied.

#### 8. Feature-boundary dependency guardrails

- Reason: sensitive provider and audit boundaries should remain mechanically enforceable as storage grows.
- Priority/scope: P1 / Now.
- Affected areas: repository hygiene checks and boundary fixtures.
- Dependencies: final shapes from storage/audit/sharing work.
- Acceptance: catches real boundary violations without broad architecture layers.

#### 9. `/mvp-flow` prototype disclosure and capability-truthfulness cleanup

- Reason: the public prototype currently looks production-ready and overclaims uploads, AI, notifications, and sharing.
- Priority/scope: P0 / Now communication safety.
- Affected areas: `/mvp-flow`, its copy, controls, and sample-data labels.
- Dependencies: none; documentation from this audit.
- Acceptance: persistent prototype banner; fictional data labels; simulated controls; aligned file limits; no false security claims.

#### 10. `/mvp-flow` core Now-journey correction

- Reason: the flow skips reminder-first activation, dashboard confirmation, and return continuity.
- Priority/scope: P0 / Now prototype validation.
- Affected areas: prototype navigation and local demo state only.
- Dependencies: task 9.
- Acceptance: pet → reminder → dashboard → document tour is demonstrable, with reset behavior explicit.

### Remaining complete queue

#### 11. Production Settings mobile overflow fix

- Reason: measured width is 416px at a 390px viewport.
- Priority/scope: P1 / Now.
- Affected areas: authenticated header, mobile navigation, Settings layout.
- Dependencies: none.
- Acceptance: no overflow at common mobile widths and no clipped controls.

#### 12. Prototype responsive layout fix

- Reason: Sharing overflows at 1280px and first-run extraction content clips.
- Priority/scope: P1 / Now prototype usability.
- Affected areas: prototype grid and min-width CSS.
- Dependencies: tasks 9–10.
- Acceptance: clean layouts at 390, 768, 1280, 1440, and 1920px.

#### 13. Production section deep-link architecture

- Reason: normal feature routes 404 and active section state is not URL-addressable.
- Priority/scope: P2 / Now usability.
- Affected areas: `/app` routing, protected redirects, nav state, Playwright.
- Dependencies: current foundation backlog complete enough to avoid route churn.
- Acceptance: direct links, refresh, back/forward, and authorization work consistently.

#### 14. Dashboard visual-fidelity pass

- Reason: production behavior is sound but less faithful than the reference.
- Priority/scope: P2 / Now.
- Affected areas: dashboard composition and responsive card grid.
- Dependencies: stable routes and data.
- Acceptance: improved hierarchy without introducing unsupported capabilities.

#### 15. Documents production UI after storage

- Reason: real file states should drive preview, errors, and actions.
- Priority/scope: P2 / Now.
- Affected areas: Documents section and upload flow.
- Dependencies: task 2.
- Acceptance: UI reflects actual Storage state and never implies OCR/extraction.

#### 16. Accessibility and zoom audit

- Reason: current evidence is visual/DOM-based and not a compliance audit.
- Priority/scope: P2 / Now quality.
- Affected areas: auth, onboarding, reminders, documents, sharing, settings.
- Dependencies: responsive fixes.
- Acceptance: keyboard, focus, labels, error announcements, contrast, and 200% zoom evidence is recorded.

#### 17. Prototype component modularization

- Reason: the prototype is a 2,691-line component plus 2,907-line stylesheet.
- Priority/scope: P2 / developer quality.
- Affected areas: `features/mvp-flow`.
- Dependencies: truthfulness and journey corrections.
- Acceptance: behavior and screenshots remain stable while screens/data are separated.

#### 18. Stable presentation primitive review

- Reason: selective reuse can reduce drift without coupling production to prototype state.
- Priority/scope: P2 / developer quality.
- Affected areas: icons, badges, cards, app-shell tokens.
- Dependencies: prototype modularization.
- Acceptance: only proven repeated primitives graduate; no cross-feature state imports.

#### 19. Staged document-processing state foundation

- Reason: Later extraction requires observable states before a provider.
- Priority/scope: P3 / Later.
- Affected areas: document status model and server orchestration.
- Dependencies: real storage, release readiness, explicit task selection.
- Acceptance: deterministic queued/processing/review/failed states with no provider claim.

#### 20. OCR/AI provider decision and evaluation

- Reason: no provider or data-handling decision is approved.
- Priority/scope: P3 / Later.
- Affected areas: ADR, privacy review, evaluation fixtures, cost and retry policy.
- Dependencies: task 19.
- Acceptance: explicit human approval before implementation.

#### 21. Owner-confirmed extraction intake

- Reason: Later value depends on reviewed, trustworthy records.
- Priority/scope: P3 / Later.
- Affected areas: processing, review, documents, timeline.
- Dependencies: tasks 19–20.
- Acceptance: confirmation is required before durable history changes.

#### 22. Reminder suggestions from verified intake

- Reason: suggestions can create retention after extraction is trustworthy.
- Priority/scope: P3 / Later.
- Affected areas: review and reminder editor.
- Dependencies: task 21.
- Acceptance: source-linked, editable, optional, and never auto-saved.

#### 23. Grounded Ask Caniello

- Reason: production currently and correctly disables Ask.
- Priority/scope: P3 / Later.
- Affected areas: retrieval, citations, assistant UI, safety filters.
- Dependencies: verified records and provider decision.
- Acceptance: record-grounded answers, visible uncertainty, and safe refusal behavior.

#### 24. Verified-record sharing summaries

- Reason: generated summaries should follow—not precede—trusted records.
- Priority/scope: P3 / Later.
- Affected areas: sharing preview and summary generation.
- Dependencies: tasks 21 and 23 as applicable.
- Acceptance: provenance, owner control, and read-only scope are explicit.

#### 25. Approved PDF/care-card export

- Reason: export is Next and currently disabled.
- Priority/scope: P3 / Next.
- Affected areas: export generation, Storage/streaming, audit.
- Dependencies: verified summary scope and release review.
- Acceptance: secure, auditable, owner-triggered export.

#### 26. Reminder delivery

- Reason: real repeat value requires delivery, but current scheduling intentionally does not imply it.
- Priority/scope: P3 / Next.
- Affected areas: provider integration, timezone, consent, retries, preferences.
- Dependencies: explicit provider and operational decision.
- Acceptance: tested delivery and opt-out semantics with no false promises.

#### 27. Multi-pet scope decision

- Reason: active-pet behavior affects every owner-data surface and requires an explicit product, RLS, and migration decision.
- Priority/scope: P3 / Next.
- Affected areas: Pet, dashboard, reminders, documents, timeline, sharing, RLS.
- Dependencies: validated first-pet experience and owner retention.
- Acceptance: [`multi-pet-scope-decision`](../spec/tasks/multi-pet-scope-decision.md) is approved before implementation tasks are created.

#### 28. Caregiver access scope decision

- Reason: durable recipient accounts introduce identity, permission, and offboarding obligations beyond scoped links.
- Priority/scope: P3 / Next.
- Affected areas: Auth, sharing, permissions, audit, account lifecycle.
- Dependencies: proven safe and useful scoped sharing.
- Acceptance: [`caregiver-access-scope-decision`](../spec/tasks/caregiver-access-scope-decision.md) is approved before implementation tasks are created.

#### 29. Email-sharing scope decision

- Reason: transactional email requires a provider, recipient privacy, consent, and truthful delivery semantics.
- Priority/scope: P3 / Not Now.
- Affected areas: sharing, provider boundary, consent, delivery evidence.
- Dependencies: verified summaries, hardened links, and demonstrated demand.
- Acceptance: [`email-sharing-scope-decision`](../spec/tasks/email-sharing-scope-decision.md) remains planning-only until explicitly promoted.

#### 30. Emergency-card scope decision

- Reason: a factual care card must not drift into emergency advice, triage, or treatment guidance.
- Priority/scope: P3 / Next.
- Affected areas: care-card fields, sharing, export, safety copy.
- Dependencies: approved verified care-card scope.
- Acceptance: [`emergency-card-scope-decision`](../spec/tasks/emergency-card-scope-decision.md) defines the safety boundary before implementation.

#### 31. Partner-workflow scope decision

- Reason: partner learning must remain subordinate to owner utility and cannot silently become clinic software or record exchange.
- Priority/scope: P3 / Later.
- Affected areas: research, roadmap, consent, future ADRs.
- Dependencies: owner activation and retention evidence.
- Acceptance: [`partner-workflow-scope-decision`](../spec/tasks/partner-workflow-scope-decision.md) permits research only and prohibits partner workflow implementation.

## 14. Final Recommendation

**/mvp-flow is only a static demo and should not be treated as MVP yet**

The route succeeds as a high-fidelity visual walkthrough and communicates a compelling future product. It does not succeed as evidence of an MVP because registration and login are simulated, state is in memory, reload resets the journey, file upload and private access do not occur, confirmation does not persist records, and Later/Not Now capabilities are presented with production-like confidence.

The production `/app` is the stronger MVP foundation. It already provides real authentication, owner-scoped persistence, first-pet behavior, reminders, metadata records, timeline events, settings, and basic scoped sharing while clearly disabling unsupported AI, notification, file, and export behavior. Continue the authoritative backlog from document storage and the associated trust/release work. Keep `/mvp-flow` as a labeled research and design reference until its claims and journey are corrected.
