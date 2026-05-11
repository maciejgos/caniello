# Story: Back Office Audit Log and AI Safety

## Status

Accepted

## User Story

As the system owner, I want audit and AI safety visibility, so that sensitive actions and unsafe AI behavior can be traced and reviewed.

## Background

Caniello needs durable evidence for sensitive admin actions, document review decisions, sharing, deletion, exports, and AI safety flags.

## Source Artifacts

- [Back Office Health, Audit, and AI Safety](../features/back-office-health-audit-and-ai-safety.md)
- [Back Office AI Review Queue](../features/back-office-ai-review-queue.md)
- [Back Office MVP Requirement](../requirements/back-office-mvp.md)

## Scope

- Audit log entries with actor, action, target, timestamp, and relevant context.
- Activity feed for operational events.
- AI safety items for unsafe prompts, answers, or extraction cases.
- Medical disclaimer visibility check for AI-facing experiences.

## Out of Scope

- Full incident management, legal workflow, retention management, prompt version history, and advanced audit filters.

## Acceptance Criteria

- Given sensitive user, admin, review, sharing, export, or deletion actions occur, when the audit log is reviewed, then actor, action, target, timestamp, and context are visible to permitted roles.
- Given AI safety events are flagged, when a safety reviewer opens safety items, then prompt, answer or extraction context, status, and reviewer path are visible.
- Given recent operational activity exists, when the activity feed loads, then relevant events are visible according to permissions.
- Given AI-facing surfaces require disclaimers, when an admin checks them, then required disclaimer visibility can be verified.

## Implementation Notes

- Use activity and safety patterns from [back-office image 2](../notes/back-office/image%202.png), and [back-office image 4](../notes/back-office/image%204.png).

## Validation

- Validate audit entry creation, permissioned audit viewing, safety flag visibility, activity feed, and disclaimer check evidence.

## Related Artifacts

None yet.
