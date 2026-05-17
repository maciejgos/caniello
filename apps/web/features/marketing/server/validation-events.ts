import { validationEventPayloadSchema } from "@caniello/contracts";

export function validateValidationEventPayload(payload: unknown) {
  const validation = validationEventPayloadSchema.safeParse(payload);

  if (!validation.success) {
    return { ok: false as const, status: 400, message: "Valid event name is required." };
  }

  return { ok: true as const, payload: validation.data };
}

