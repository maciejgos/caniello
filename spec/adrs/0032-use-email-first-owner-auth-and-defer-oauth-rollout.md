# 0032 - Use email-first owner auth and defer OAuth rollout

## Status

Accepted

## Date

2026-06-14

## Context

The current validation gap includes new-owner access and visible Google/Apple buttons that do not work in local validation. ADR 0014 chooses Supabase Auth. ADR 0023 says local Supabase Auth provider configuration belongs in `infra/supabase/config.toml`, not the local Studio provider screen.

The product does not need production OAuth rollout to validate the core MVP promise.

## Decision

Caniello MVP will use email-first owner authentication.

For local and early MVP validation:

- email/password signup and login are the supported owner path;
- local validation must provide a reliable confirmation path through Supabase local email/Inbucket or a documented validation bypass;
- Google and Apple OAuth buttons must be hidden, disabled, or clearly marked unavailable unless the provider is configured and tested in the current environment;
- UI must not imply production OAuth works when it is not configured;
- provider secrets must never be committed;
- provider configuration, when used locally, belongs in `infra/supabase/config.toml` with environment-backed secrets.

Production OAuth rollout is deferred. Enabling Google or Apple in production requires:

- provider account setup;
- callback URL review;
- secret management;
- local and preview validation;
- account-linking decision if an email already exists;
- updated tests and support notes.

## Consequences

This makes new-owner validation reliable without taking on OAuth setup and account-linking risk too early.

The tradeoff is that some users may prefer social login. That is acceptable until the MVP proves activation and retention with the core owner utility.

The new-owner access task should remove misleading OAuth affordances or implement a clearly tested unavailable state.

## Related Artifacts

- [0014 - Use Supabase Auth with minimal RBAC and audit controls](./0014-use-supabase-auth-minimal-rbac-and-audit.md)
- [0023 - Use config.toml for local Supabase Auth providers](./0023-use-config-toml-for-local-supabase-auth-providers.md)
- [New-owner access validation](../tasks/new-owner-access-validation.md)
- `infra/supabase/config.toml`
- `apps/web/app/(account)/login/page.tsx`
- `apps/web/app/(account)/signup/page.tsx`
