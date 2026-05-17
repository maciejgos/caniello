# 0007 — Use React Native and Expo for mobile

## Status

Accepted

## Date

2026-05-17

## Decision route

- Lead: CTO
- Supporting: COO

## Decision

Caniello mobile will be built with:

- React Native
- Expo
- TypeScript
- Expo Router

The mobile application will live under `apps/mobile`.

## Context

Caniello needs a future mobile experience that can share TypeScript types, validation schemas, domain rules, and API contracts with the web application. React Native and Expo align with the TypeScript-first monorepo direction while reducing native mobile setup overhead for the MVP path.

## Consequences

### Positive

- Shared TypeScript contracts and domain logic can be reused from `packages/*`.
- Expo reduces mobile setup and deployment complexity.
- Expo Router gives mobile routing a familiar file-based structure.
- The team can keep one language across web, API routes, shared packages, and mobile.

### Tradeoffs

- Native capabilities must stay within what Expo supports or be handled through config plugins / native modules later.
- Mobile UX and offline behavior may require app-specific logic that should not leak into shared packages.
- Mobile implementation must avoid duplicating domain rules already available in `packages/domain` or `packages/contracts`.

## Implementation Standard

Mobile implementation should:

- live in `apps/mobile`;
- consume shared contracts from `packages/contracts`;
- consume shared domain rules from `packages/domain`;
- keep mobile-only UI and platform behavior inside `apps/mobile`;
- avoid web-only dependencies from `apps/web`.

## Review triggers

Revisit this decision if:

- Expo cannot support required native capabilities;
- mobile scope changes from MVP companion app to a deeply native product;
- app-store deployment or offline-first requirements introduce a different architecture need;
- shared package boundaries become unsuitable for mobile.
