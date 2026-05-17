# 0008 — Use MVP product tooling baseline

## Status

Accepted

## Date

2026-05-17

## Decision route

- Lead: CTO
- Supporting: COO

## Decision

Caniello MVP should use a focused tooling baseline for UI delivery, validation, market learning, analytics, and code quality.

The recommended baseline is:

- Tailwind CSS for styling
- shadcn/ui for UI composition
- Lucide Icons for iconography
- MailerLite for waitlist, welcome sequence, and lightweight email validation
- Google Forms for very early surveys when a full in-product research flow is unnecessary
- Vercel Analytics for initial web analytics
- simple application events for MVP behavior tracking
- PostHog later if deeper activation and retention analytics are needed
- ESLint for static code checks
- Prettier for formatting
- TypeScript strict mode for type safety
- Vitest for domain logic tests
- Playwright later for critical end-to-end flows

## Context

Caniello MVP needs to move quickly while preserving enough quality, observability, and design consistency to validate the product. The current strategy is to validate health records, reminders, document vault, and trusted sharing before investing in heavier infrastructure, back-office, marketplace, bookings, payments, clinic SaaS, AI diagnosis, or official pet passport replacement.

The tooling baseline should support fast product learning without becoming a custom platform project.

## Consequences

### Positive

- Tailwind CSS, shadcn/ui, and Lucide Icons support fast, clean UI delivery without creating a design system from scratch.
- MailerLite and Google Forms cover early market validation without custom workflows.
- Vercel Analytics gives immediate website analytics with low setup cost.
- PostHog can be introduced later for activation, retention, and product analytics when the MVP has real usage.
- ESLint, Prettier, TypeScript strict mode, and Vitest provide a practical quality floor.
- Playwright can be added for critical flows once the product surface stabilizes.

### Tradeoffs

- shadcn/ui components are copied into the codebase and must be maintained intentionally.
- MailerLite and Google Forms are useful for validation but should not become core product data stores.
- Vercel Analytics may not answer deeper funnel or retention questions.
- PostHog adds another analytics surface and should wait until there are meaningful product events to measure.
- Playwright adds maintenance cost and should focus on critical flows rather than exhaustive coverage.

## Implementation Standard

MVP implementation should start with:

- Tailwind CSS
- shadcn/ui
- Lucide Icons
- MailerLite for landing-page email validation
- Vercel Analytics and simple event tracking
- ESLint
- Prettier
- TypeScript strict mode
- Vitest for shared domain logic

PostHog should be introduced when Caniello is ready to measure deeper activation and retention events, such as:

- account activation;
- adding the first pet;
- adding the first document;
- setting the first reminder;
- using trusted sharing;
- D7 and D30 retention.

Playwright should be introduced for critical flows once those flows are implemented and stable enough to justify browser-level regression coverage.

## Review triggers

Revisit this decision if:

- a stronger analytics need appears before MVP launch;
- MailerLite no longer covers validation and lifecycle email needs;
- UI requirements justify a dedicated design system package;
- form, validation, or data-fetching complexity requires additional standards;
- code quality gates need to become mandatory CI/CD checks.
