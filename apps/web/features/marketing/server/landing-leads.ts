import { landingLeadPayloadSchema, type LandingLeadPayload } from "@caniello/contracts";
import { getLanguageLabel } from "../language";

type MailerLiteGroup = {
  id: string;
  name: string;
};

type MailerLiteGroupListResponse = {
  data?: MailerLiteGroup[];
};

class MailerLiteRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly responseBody: string
  ) {
    super(message);
    this.name = "MailerLiteRequestError";
  }
}

type MailerLiteClientOptions = {
  apiKey: string;
  groupName: string;
  fetchFn?: typeof fetch;
};

export const defaultMailerLiteGroupName = "Caniello Waitlist";
const mailerLiteApiBaseUrl = "https://connect.mailerlite.com/api";
const inactiveSubscriberErrorText = "This subscriber is not active and cannot be imported";

export function validateLandingLeadPayload(payload: unknown) {
  const validation = landingLeadPayloadSchema.safeParse(payload);

  if (validation.success) {
    return { ok: true as const, payload: validation.data };
  }

  const flattened = validation.error.flatten();

  if (flattened.fieldErrors.leadConsent) {
    return { ok: false as const, status: 400, message: "Lead consent is required." };
  }

  if (flattened.fieldErrors.email) {
    return { ok: false as const, status: 400, message: "Valid email is required." };
  }

  if (flattened.fieldErrors.source) {
    return { ok: false as const, status: 400, message: "Lead source is invalid." };
  }

  if (flattened.formErrors.length > 0) {
    return { ok: false as const, status: 400, message: "Lead segmentation is handled by the MailerLite survey." };
  }

  return { ok: false as const, status: 400, message: "Invalid lead payload." };
}

export async function upsertMailerLiteSubscriber(payload: LandingLeadPayload, options: MailerLiteClientOptions) {
  const fetchFn = options.fetchFn ?? fetch;
  const groupId = await findMailerLiteGroupId(options.groupName, options.apiKey, fetchFn);

  if (!groupId) {
    throw new Error("Configured MailerLite group was not found.");
  }

  const mailerLiteResponse = await fetchFn(`${mailerLiteApiBaseUrl}/subscribers`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${options.apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: payload.email,
      groups: [groupId],
      fields: {
        language: getLanguageLabel(payload.language)
      }
    })
  });

  if (!mailerLiteResponse.ok) {
    throw new MailerLiteRequestError(
      "MailerLite subscriber upsert failed.",
      mailerLiteResponse.status,
      await readMailerLiteErrorBody(mailerLiteResponse)
    );
  }
}

async function findMailerLiteGroupId(groupName: string, apiKey: string, fetchFn: typeof fetch) {
  const groupsUrl = new URL(`${mailerLiteApiBaseUrl}/groups`);
  groupsUrl.searchParams.set("limit", "100");
  groupsUrl.searchParams.set("filter[name]", groupName);

  const groupsResponse = await fetchFn(groupsUrl.toString(), {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`
    }
  });

  if (!groupsResponse.ok) {
    throw new MailerLiteRequestError(
      "MailerLite group lookup failed.",
      groupsResponse.status,
      await readMailerLiteErrorBody(groupsResponse)
    );
  }

  const groups = (await groupsResponse.json()) as MailerLiteGroupListResponse;
  const exactMatch = groups.data?.find((group) => group.name.toLowerCase() === groupName.toLowerCase());

  return exactMatch?.id;
}

async function readMailerLiteErrorBody(response: Response) {
  try {
    return sanitizeMailerLiteErrorBody(await response.text());
  } catch {
    return "";
  }
}

function sanitizeMailerLiteErrorBody(responseBody: string) {
  return responseBody.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[redacted-email]").slice(0, 1000);
}

export function describeMailerLiteError(error: unknown) {
  if (error instanceof MailerLiteRequestError) {
    return {
      message: error.message,
      status: error.status,
      responseBody: error.responseBody
    };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: "Unknown MailerLite error." };
}

export function getMailerLiteLeadFailureResponse(error: unknown) {
  if (isInactiveSubscriberError(error)) {
    return {
      status: 409,
      message: "This email address cannot be subscribed automatically."
    };
  }

  return {
    status: 502,
    message: "Lead capture failed."
  };
}

function isInactiveSubscriberError(error: unknown) {
  return error instanceof MailerLiteRequestError && error.status === 422 && error.responseBody.includes(inactiveSubscriberErrorText);
}

