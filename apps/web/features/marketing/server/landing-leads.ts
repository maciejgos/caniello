import { landingLeadPayloadSchema, type LandingLeadPayload } from "@caniello/contracts";

type MailerLiteGroup = {
  id: string;
  name: string;
};

type MailerLiteGroupListResponse = {
  data?: MailerLiteGroup[];
};

type MailerLiteClientOptions = {
  apiKey: string;
  groupName: string;
  fetchFn?: typeof fetch;
};

export const defaultMailerLiteGroupName = "Caniello Waitlist";
const mailerLiteApiBaseUrl = "https://connect.mailerlite.com/api";

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
      groups: [groupId]
    })
  });

  if (!mailerLiteResponse.ok) {
    throw new Error("MailerLite subscriber upsert failed.");
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
    throw new Error("MailerLite group lookup failed.");
  }

  const groups = (await groupsResponse.json()) as MailerLiteGroupListResponse;
  const exactMatch = groups.data?.find((group) => group.name.toLowerCase() === groupName.toLowerCase());

  return exactMatch?.id;
}

