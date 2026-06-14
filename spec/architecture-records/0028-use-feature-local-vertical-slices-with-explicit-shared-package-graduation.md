# 0028 - Use feature-local vertical slices with explicit shared-package graduation

## Status

Accepted

## Date

2026-06-14

## Context

The accepted monorepo architecture defines shared packages for contracts, domain, application, db, ui, and config. The current implementation is intentionally vertical-slice oriented: route handlers and server helpers live mostly under `apps/web/features/account/server`, while shared packages are still thin.

This is pragmatic for MVP delivery, but without an explicit rule the package boundaries can become ceremonial or code can be moved too early into generic shared layers.

A strict layered-domain pattern such as `Types -> Config -> Repo -> Service -> Runtime -> UI`, with cross-cutting concerns entering through explicit providers, is useful as a quality guardrail. It is especially valuable where Caniello handles sensitive boundaries such as Auth, Supabase Storage, RLS, audit logs, product events, data-rights requests, and share tokens. It should not be applied mechanically to every MVP feature while behavior is still small.

## Decision

Caniello will keep MVP behavior feature-local by default and graduate code to shared packages only when there is a concrete reason.

Use this lightweight dependency rule for current MVP slices:

```text
contracts/types -> feature server helpers -> route/runtime -> UI
                         ^
                         |
                    providers
```

The goal is directional dependency control, not a mandatory folder for every layer. UI code should call route/runtime boundaries or feature-local client adapters, not Supabase directly. Runtime and server helpers should receive Auth, Supabase, Storage, audit, telemetry, and external connectors through explicit provider/helper boundaries rather than ad hoc imports scattered through UI components.

Default placement:

- browser/API payload schemas and response types: `packages/contracts`;
- feature-local server orchestration: `apps/web/features/<feature>/server`;
- feature-local UI and copy: `apps/web/features/<feature>/components` and feature content modules;
- Supabase client/config construction: `packages/db`;
- migrations, RLS, seed data: `infra/supabase`;
- shared domain rules only after reuse is real: `packages/domain`;
- shared use-case orchestration only after reuse is real: `packages/application`;
- reusable design primitives only after repeated use: `packages/ui`.

Apply stricter layered/provider boundaries immediately for sensitive areas:

- document upload and Supabase Storage;
- share-link creation, revocation, public resolution, and access logging;
- account settings, consent, data export, and account deletion requests;
- auth and local/OAuth provider handling;
- audit logs and product-event emission;
- any server-side helper that uses the Supabase service role key.

For those areas, implementation should make the dependency direction clear:

- types/contracts are imported by server/runtime/UI;
- config is read at the boundary, not inside random UI components;
- repository or data-access code owns Supabase table/storage calls;
- service/server helpers own validation, authorization, quota, and audit decisions;
- route/runtime code adapts HTTP/session/cookie details;
- UI renders state and submits commands without owning persistence or provider logic.

Graduate code from feature-local helpers to shared packages when at least one condition is true:

- used by both web and mobile;
- used by two or more independent web features;
- required by a background job, CLI, or operations script;
- centralizes a security-sensitive rule such as ownership, quota, audit, or storage path construction;
- reduces meaningful duplication in owner/pet lookup or mapping;
- needs package-level tests independent of a single UI feature.

Do not create broad service layers, empty `repo/service/runtime` folders, or provider abstractions only to satisfy architecture diagrams. Simple UI sections, static dashboard composition, and small CRUD surfaces can remain direct vertical slices until reuse or risk earns more structure.

## Consequences

This preserves the speed of vertical slices while giving maintainers a clear moment to extract shared code.

The tradeoff is that some short-term duplication is acceptable. Review should focus on whether duplication hides security or lifecycle rules, not whether every helper has already been generalized.

Implementation tasks should document when they intentionally keep logic feature-local or graduate it to a package.

This also gives Caniello a practical mechanical-enforcement target later. If dependency linting is added, it should enforce the sensitive-boundary rules first: no direct Supabase calls from client UI, no service-role secrets outside server/provider helpers, no audit/telemetry writes from UI, and no cross-feature imports that bypass contracts or feature-owned runtime boundaries.

## Related Artifacts

- [0002 - Use Caniello monorepo directory standard](./0002-use-caniello-monorepo-directory-standard.md)
- [0011 - Use pragmatic engineering practices from MVP start](./0011-use-pragmatic-engineering-practices-from-mvp-start.md)
- [Caniello MVP Target Architecture](../architecture/mvp-target-architecture.md)
- `apps/web/features/account/server/`
- `packages/contracts/src/index.ts`
- `packages/db/src/index.ts`
- `packages/domain/src/index.ts`
- `packages/application/src/index.ts`
