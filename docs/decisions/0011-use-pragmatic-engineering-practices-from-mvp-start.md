# 0011 — Use pragmatic engineering practices from MVP start

## Status

Accepted

## Date

2026-05-17

## Decision route

- Lead: CTO
- Supporting: COO

## Decision

Caniello MVP will use pragmatic engineering practices from the beginning of implementation.

The default engineering principles are:

- KISS: prefer the simplest design that correctly supports the current behavior.
- SOLID where it protects clear responsibilities, explicit dependencies, and narrow interfaces.
- TypeScript-first correctness with strict types, shared contracts, and runtime validation at trust boundaries.
- Tests for meaningful behavior, especially shared domain logic, data access, and critical user flows.
- Framework-native patterns for React, React Native, Expo, and Next.js.
- Design patterns only when they solve a real problem in the codebase, not as ceremony.

Patterns such as Retry and Factory are approved for MVP, but they must be applied intentionally:

- use Retry for transient external failures, rate limits, network instability, and integration calls that are safe to repeat;
- use Factory for object, client, adapter, fixture, or test-data creation when direct construction starts duplicating setup or hiding intent;
- avoid abstracting simple local code before repetition or complexity exists.

## Context

Caniello MVP needs to move quickly without accumulating avoidable technical debt. The product will handle user accounts, pet records, reminders, documents, and trusted sharing, so implementation quality matters even during validation.

The architecture already chooses a TypeScript-first monorepo, Next.js, React Native / Expo, Supabase, Vercel, pnpm workspaces, Turborepo, and Dev Containers. This decision defines how code should be written inside that architecture.

## Engineering standards

### KISS and scope control

Implementation should:

- solve the current MVP behavior directly;
- prefer readable modules over speculative abstractions;
- keep feature modules small and cohesive;
- avoid introducing queues, workers, service layers, or generic frameworks before the product needs them;
- defer complex infrastructure unless an accepted ADR or approved implementation plan introduces it.

### TypeScript and contracts

Implementation should:

- use TypeScript strict mode;
- keep shared types and schemas in `packages/contracts`;
- validate untrusted input with Zod or an approved schema layer;
- avoid `any` for domain, API, database, and integration boundaries;
- keep domain rules in `packages/domain` when they are shared across web and mobile;
- centralize Supabase access helpers in `packages/db`.

### Retry pattern

Retry should be used for transient failures only.

Good candidates:

- MailerLite requests;
- analytics event delivery when safe;
- idempotent Supabase or API calls where retry cannot duplicate user-visible side effects;
- future background jobs or queues if introduced by a later ADR.

Retry implementation should include:

- bounded attempts;
- exponential backoff or jitter where useful;
- timeout handling;
- clear error reporting after final failure;
- idempotency protection for writes that could be repeated.

Retry should not be used to hide validation errors, permission errors, permanent business-rule failures, or RLS policy failures.

### Factory pattern

Factory helpers should be used when construction logic becomes repeated, conditional, or environment-specific.

Good candidates:

- Supabase client creation;
- MailerLite client creation;
- analytics client creation;
- repository creation;
- test fixtures for pets, reminders, documents, and share links;
- environment-specific adapter setup.

Factories should stay small, typed, and close to the boundary they create. They should not become generic service locators.

### React practices

React implementation should:

- prefer small, focused components with clear props;
- keep data fetching and side effects out of presentational components;
- use controlled composition rather than prop-heavy components;
- keep accessibility requirements visible in component design;
- avoid unnecessary global state;
- use form libraries such as React Hook Form for non-trivial forms;
- keep validation schemas close to form and API contracts;
- add tests for behavior that is easy to regress.

### Next.js practices

Next.js implementation should:

- use App Router conventions in `apps/web/app`;
- keep public marketing routes under `app/(marketing)`;
- keep authenticated product routes under `app/(app)`;
- keep API routes and webhooks under `app/api`;
- keep trusted sharing routes under `app/share/[token]`;
- prefer Server Components by default when client interactivity is not needed;
- mark Client Components intentionally with `"use client"`;
- keep secrets and provider tokens on server-side boundaries only;
- validate route params, search params, request bodies, and webhook payloads;
- keep Vercel deployment assumptions explicit.

### React Native and Expo practices

React Native / Expo implementation should:

- keep mobile-specific UI and platform behavior in `apps/mobile`;
- reuse shared contracts from `packages/contracts`;
- reuse shared domain rules from `packages/domain`;
- avoid importing web-only code from `apps/web`;
- use Expo Router for mobile navigation;
- handle loading, error, offline, and permission states explicitly;
- keep native capability decisions documented when Expo defaults are not enough.

## Consequences

### Positive

- MVP code remains simple enough to change quickly.
- Shared domain and contract boundaries stay useful across web and mobile.
- Retry protects transient integration failures without hiding permanent errors.
- Factory helpers reduce repeated setup at integration and test boundaries.
- React, React Native, and Next.js code follows framework-native patterns from the start.
- Quality expectations are clear before implementation begins.

### Tradeoffs

- Engineers must decide whether a pattern is justified instead of applying patterns mechanically.
- Some abstractions will be delayed until repetition proves they are needed.
- Retry and factory helpers require tests around edge cases and failure behavior.
- Strict TypeScript and validation add upfront discipline during fast MVP work.

## Implementation Standard

Implementation should follow this order of preference:

1. Use the simplest direct implementation that satisfies the approved behavior.
2. Extract shared domain logic only when it is reused or clearly belongs outside a UI/runtime.
3. Add Retry only at transient, repeat-safe boundaries.
4. Add Factory only when construction is repeated, conditional, environment-specific, or test-heavy.
5. Add broader patterns only when an accepted ADR, approved ExecPlan, or clear codebase pressure justifies them.

Validation should include:

- TypeScript checks;
- linting and formatting;
- focused unit tests for domain logic;
- tests for retry behavior when Retry is introduced;
- tests for factories that hide environment-specific construction;
- React component tests where behavior is meaningful;
- Playwright checks later for critical user flows.

## Review triggers

Revisit this decision if:

- the codebase accumulates repeated service setup that needs a stronger dependency pattern;
- retry behavior needs centralized policy across integrations;
- background jobs or queues enter scope;
- React or React Native code starts duplicating domain rules;
- Next.js server/client boundaries become unclear;
- quality gates need to become mandatory CI/CD checks.
