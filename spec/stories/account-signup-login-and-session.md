# Story: Account Signup, Login, and Session

## Status

Accepted

## User Story

As a pet owner, I want to create an account, log in, recover access, and end my session, so that my pet-care data is protected and available only to me.

## Background

This story provides the owner account foundation needed before beta users upload sensitive pet-care records.

## Source Artifacts

- [Owner Account and Privacy Foundation](../features/owner-account-privacy-foundation.md)
- [Owner-Facing MVP Requirement](../requirements/owner-facing-mvp.md)

## Scope

- Sign up, login, email verification state, password reset entry point, logout, and session handling.
- User-facing account access states for authenticated, unauthenticated, unverified, and recovered users.

## Out of Scope

- Social login, magic links, subscription state, and advanced household invitations.

## Acceptance Criteria

- Given a visitor, when they submit valid signup details, then Caniello creates an account and shows the email verification state.
- Given a returning verified user, when they submit valid login credentials, then Caniello starts an authenticated session.
- Given a user forgets their password, when they request reset, then Caniello starts a password reset flow.
- Given an authenticated user, when they log out, then protected app screens require login again.

## Implementation Notes

- Use mockups [web image 11](../notes/web/image%2011.png) and [web image 18](../notes/web/image%2018.png) for signup/login visual intent.
- Keep medical and privacy trust messaging visible as shown in the auth mockups.

## Validation

- Validate signup, login, logout, protected route access, unverified state, and password reset entry behavior.

## Related Artifacts

None yet.
