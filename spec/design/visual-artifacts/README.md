# Caniello Visual Artifacts

## Status

Accepted

## Purpose

This directory stores visual source files, brand references, landing page mockups, and UI direction for Caniello.

Visual artifacts are organized by product area so implementation work can reference the right material without treating mockups or exploratory backlogs as approved scope.

## Placement Rules

- Keep Caniello product and brand visuals in this repository.
- Use this directory for design references before implementation begins.
- Do not treat mockups as approved product scope unless a matching requirement, feature, or validation artifact exists.
- Preserve source files when possible; optimized web assets can be created later under implementation-specific directories.
- Keep backlog documents in `Draft` status unless a human explicitly approves them through the PDLC flow.

## Directory Layout

| Path | Contents | Status |
|---|---|---|
| `landing/` | Landing page mockups, brand references, and existing hero/image assets used as product and marketing direction. | Reference |
| `mvp/` | Web/mobile MVP visual references and a backlog draft for the AI-first owner experience. | Draft reference |
| `back-office/` | Back-office MVP visual references and a backlog draft for beta operations, review, support, and admin workflows. | Draft reference |

## Image Files

| File | Type | Description | Status |
|---|---|---|---|
| `landing/caniello-ai-assistant-landing.png` | Landing page mockup | AI-powered pet care concept with document scanning, extraction, reminders, timeline, ask-Caniello cards, comparison section, and privacy/security positioning. | Available |
| `landing/caniello-better-care-landing.png` | Landing page mockup | Softer waitlist landing page centered on health records, smart reminders, care sharing, secure/private messaging, and early access CTA. | Available |
| `landing/caniello-bruno-app-hero.png` | Implementation hero asset | Composed landing page hero with Bruno's app preview beside a golden retriever. | Available |
| `landing/caniello-product-os-landing.png` | Landing page mockup | More mature pet care operating system concept with product navigation, trust logos, dashboard preview, feature row, and pricing-oriented CTA. | Available |
| `landing/caniello-dark-wordmark.png` | Brand reference | Dark atmospheric Caniello logo/wordmark treatment. Useful as mood reference, not the primary light-background app logo. | Available |
| `landing/logo.png` | Brand reference | Caniello logo reference for implementation and future asset optimization. | Available |
| `landing/puppys.png` | Brand/product reference | Pet imagery reference for landing page tone and asset direction. | Available |
| `landing/puppys_transparent.png` | Brand/product reference | Transparent pet imagery reference for compositing and future implementation experiments. | Available |
| `mvp/*.png` | MVP UI reference set | Descriptively named web/mobile owner-flow visual references; see `mvp/README.md`. | Available |
| `back-office/image 1.png` through `back-office/image 6.png` | Back-office UI reference set | Admin, review, support, and operational workflow visual references. | Available |

## Backlog Drafts

| File | Scope | Status |
|---|---|---|
| `mvp/backlog.md` | Web/mobile MVP backlog draft around Scan, Extract, Review, Timeline, Reminder, Ask, and Share. | Draft |
| `back-office/backlog.md` | Back-office MVP backlog draft for safe beta operations, access control, support, AI review, and system health. | Draft |

## Source Locations

Caniello working location:

- `spec/design/visual-artifacts/`

If implementation needs optimized web assets later, copy or derive them into the relevant implementation directory at that time.

## Design Read

The strongest reusable direction across the Caniello artifacts:

- Brand promise: `Better care. Stronger bond.`
- Product category: pet health and care organization utility.
- Primary value: records, reminders, documents, and shareable care information.
- Trust stance: secure, private, not a replacement for a veterinarian.
- Product constraint: avoid official passport replacement and AI diagnosis claims.

The first two landing variants fit the current validation stage best. The third variant implies a more mature product and partner ecosystem, so it should be treated as later-stage inspiration.

## Related Artifacts

- [Caniello README](../../../README.md)
- [Caniello design workspace](../README.md)
- [Control-plane Caniello strategy](../../../../the-future-thinker-world/ventures/caniello/strategy.md)
- [Control-plane Caniello visual assets](../../../../the-future-thinker-world/artifacts/visual-assets/caniello/README.md)
- [PDF analysis](../../../../the-future-thinker-world/artifacts/the-future-thinker-caniello-pdf-analysis.md)
