---
name: Caniello Design System
status: working-guidance
source: adapted-from-stitch-design-md
colors:
  navy: "#061b45"
  navy-strong: "#07245a"
  blue: "#1e6de8"
  cream: "#fff6eb"
  cream-strong: "#fff0dc"
  gold: "#ff8a00"
  purple: "#8554e8"
  green: "#1f963d"
  red: "#ff3b42"
  surface: "#ffffff"
  surface-warm: "#fff8ef"
  surface-muted: "#f8f9fb"
  border: "#e2e7ef"
  text: "#061b45"
  text-muted: "#64749a"
typography:
  display:
    fontFamily: Georgia, Cambria, Times New Roman, serif
    fontSize: 44px
    fontWeight: "700"
    lineHeight: 1.08
    letterSpacing: "0"
  headline:
    fontFamily: Georgia, Cambria, Times New Roman, serif
    fontSize: 32px
    fontWeight: "700"
    lineHeight: 1.12
    letterSpacing: "0"
  body:
    fontFamily: Inter, Manrope, ui-sans-serif, system-ui, sans-serif
    fontSize: 15px
    fontWeight: "500"
    lineHeight: 1.55
    letterSpacing: "0"
  label:
    fontFamily: Inter, Manrope, ui-sans-serif, system-ui, sans-serif
    fontSize: 12px
    fontWeight: "800"
    lineHeight: 1.35
    letterSpacing: "0"
rounded:
  sm: 6px
  default: 8px
  md: 10px
  lg: 12px
  full: 9999px
spacing:
  base: 8px
  sidebar-width: 236px
  topbar-height: 72px
  container-padding: 48px
  gutter: 18px
  section-gap: 28px
  card-padding: 20px
---

# Caniello Design System

This file is the repo-native visual contract for Caniello. It is adapted from the Stitch-generated `DESIGN.md` direction, but it is made specific to the MVP mockups, product boundaries, and implementation style already present in this repository.

Use this file as the authoritative visual and interaction guide. It does not override `SPEC.md`, `ROADMAP.md`, active tasks, or accepted ADRs.

## Priority Order

When design guidance conflicts, follow this order:

1. Product, medical, privacy, and roadmap constraints in `SPEC.md` and `ROADMAP.md`.
2. This `DESIGN.md`.
3. Local component and CSS patterns.
4. General frontend taste or framework defaults.

Meaningful visual decisions or deviations should be recorded in the active task.

## Brand Position

Caniello is a trusted pet health and care organization utility. The interface should feel warm, careful, and competent: a place for owners to organize sensitive pet information without feeling they are entering a cold clinical system.

The design language is:

- trustworthy, owner-controlled, and privacy-forward;
- warm and pet-centered without becoming childish;
- dense enough for repeated operational use;
- clear about medical boundaries;
- calm around documents, reminders, sharing, and AI-assisted organization.

## Visual Style

Caniello uses a deep navy foundation with warm cream surfaces and amber accents. Screens should feel polished and slightly editorial, but authenticated app surfaces should remain practical and scannable.

Use high-quality pet imagery where it helps the user recognize the pet, understand the flow, or connect emotionally with the product. Do not replace product-relevant imagery with abstract decoration.

Avoid:

- one-note blue or purple interfaces;
- decorative gradient blobs, bokeh, or arbitrary orbs;
- oversized marketing hero layouts inside the authenticated app;
- vague stock imagery when the user needs to inspect records, pets, or document states;
- visual patterns that imply diagnosis, emergency triage, or veterinary replacement.

## Color Usage

- **Navy** is the brand and authority color. Use it for headings, primary navigation, main actions, and trusted record surfaces.
- **Cream and warm white** create the pet-care warmth. Use these for active nav states, tips, onboarding panels, sharing summaries, and assistant-adjacent surfaces.
- **Blue** is for interactive accents, focus, links, document controls, and selected states that need clarity.
- **Gold / amber** is for warmth, next actions, reminders, tips, and attention states. Use it sparingly.
- **Purple** can mark AI extraction, assistant sparkle moments, and selected document-processing affordances. Do not let it dominate the product.
- **Green** communicates verified, completed, safe-to-save, and successful states.
- **Red** is reserved for errors, urgent warnings, destructive actions, and missed/failed states.

Status chips should use tinted backgrounds with readable text. Avoid saturated fills for ordinary metadata.

## Typography

The MVP screenshots use a two-font feeling:

- Serif display/headline type for brand warmth and major page titles.
- Sans-serif UI type for controls, labels, dense cards, tables, sidebars, and forms.

Use serif headings for page titles such as Home, Documents Library, Review & confirm extracted data, Timeline, Sharing, and Ask Caniello. Use sans-serif for buttons, inputs, table rows, chips, nav, and metadata.

Do not scale type with viewport width. Keep letter spacing at `0` unless the local file already has a deliberate token for compact labels.

## Layout

Desktop app screens should use:

- left sidebar around `236px`;
- top bar around `72px`;
- wide but restrained search field in the header;
- dense card grids with consistent gutters;
- full-width work surfaces rather than marketing sections;
- right-side panels only when they improve scanning or comparison.

Mobile app screens should collapse into a single column with horizontal section navigation where needed. Mobile should avoid horizontal overflow and should keep controls finger-sized.

Prefer stable dimensions for repeated UI surfaces such as document cards, reminder rows, timeline rows, upload choices, and toolbar buttons so hover/focus states do not shift layout.

## Components

### Navigation

The sidebar is a persistent anchor. Active items use a warm cream highlight with navy icon/text. The app should not show a selected nav item while rendering an unrelated screen.

### Search

Header search should feel generous, pill-like, and quiet. Include an icon and keyboard hint on desktop. On narrow mobile, collapse to an icon-only control.

### Cards

Cards should use white or warm-white surfaces, subtle borders, soft shadows, and 8-12px radius. Do not nest cards inside cards unless the inner card is a true repeated item or document preview.

### Documents

Document flows must preserve the user-confirm-before-save boundary. Extraction, classification, and reminders are suggestions until the owner reviews and confirms.

Document previews should look inspectable and record-like. Generated or code-native previews are acceptable for prototypes, but real upload work must not imply OCR, storage, or AI extraction until those capabilities exist.

### Reminders

Reminder screens should distinguish upcoming actions from historical care timeline events. Upcoming reminders belong in reminder lists or side panels. Completed/historical care belongs in the timeline.

### Timeline

Timeline is chronological care history. Use category icons, date/time anchors, and completion/status chips. Do not blur timeline history with future reminders except in explicitly labeled “Next Upcoming” side panels.

### Sharing

Sharing surfaces should communicate owner control. Shared summaries are read-only and should not imply broad account access.

Do not imply live share links, email sends, caregiver permission changes, PDF generation, access logs, or revocation unless the task implements those behaviors.

### Ask Caniello

Ask Caniello is organization assistance, not veterinary judgment.

Assistant answers should:

- cite user-owned source records when relevant;
- avoid diagnosis, treatment decisions, emergency advice, or symptom checking;
- make uncertainty visible;
- reinforce that owners should follow veterinary advice for medical decisions.

Use a subtly distinct warm/assistant surface, but keep it integrated with the app.

## Imagery

Use real or generated pet imagery intentionally:

- pet avatars should be circular;
- onboarding and document flows may use dog/cat imagery to keep the product warm;
- document previews should show the record/document state, not generic paper decorations;
- sharing summaries should foreground the pet and verified record context.

Do not use decorative imagery that competes with record inspection or controls.

## Accessibility And Responsiveness

Text must fit inside buttons, chips, and cards at desktop and mobile widths. Long labels should wrap or be shortened rather than overflow.

Interactive elements should be visibly focusable and large enough for touch on mobile. Color should not be the only indicator of status.

## Product Safety Boundaries

Visual design must reinforce these product boundaries:

- Caniello does not replace veterinarians.
- Caniello does not replace official EU pet passports.
- AI suggestions are not durable records until owner-reviewed and confirmed.
- Sensitive data belongs to the owner and should be shared only through explicit owner-controlled flows.
- Prototype UI must not pretend to perform real auth, uploads, AI extraction, notification delivery, sharing, or PDF export unless the implementation actually does so.

## Implementation Notes

Use existing project patterns first. Prefer feature-local components and CSS modules for MVP surfaces unless a shared UI primitive already exists and clearly fits.

Run visual validation with Playwright or the in-app browser where practical and record blocked checks in the active task.
