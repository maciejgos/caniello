import type { IncomingMessage, ServerResponse } from "node:http";

type LandingLeadPayload = {
  email?: string;
  role?: "pet_owner" | "pet_service_provider" | "clinic_vet";
  interestWave?: "wave_1" | "wave_2" | "wave_3";
  source?: string;
  leadConsent?: boolean;
  language?: string;
  organization?: string;
  context?: string;
  website?: string;
  utm?: Record<string, string>;
};

type ValidLandingLeadPayload = Required<Pick<LandingLeadPayload, "email" | "role" | "interestWave" | "source" | "leadConsent">> &
  Omit<LandingLeadPayload, "email" | "role" | "interestWave" | "source" | "leadConsent">;

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

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const roles = ["pet_owner", "pet_service_provider", "clinic_vet"];
const waves = ["wave_1", "wave_2", "wave_3"];
const sources = ["landing_page_hero", "landing_page_mid_cta", "landing_page_footer", "landing_page_wave2", "landing_page_wave3"];
const defaultMailerLiteGroupName = "Caniello Waitlist";
const mailerLiteApiBaseUrl = "https://connect.mailerlite.com/api";

export default async function handler(request: IncomingMessage, response: ServerResponse) {
  if (request.method !== "POST") {
    sendJson(response, 405, { ok: false, message: "Method not allowed." });
    return;
  }

  let payload: LandingLeadPayload;

  try {
    payload = await readJsonBody(request);
  } catch {
    sendJson(response, 400, { ok: false, message: "Invalid JSON body." });
    return;
  }

  const validation = validateLandingLeadPayload(payload);
  if (!validation.ok) {
    sendJson(response, validation.status, { ok: false, message: validation.message });
    return;
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupName = process.env.MAILERLITE_GROUP_NAME || defaultMailerLiteGroupName;

  if (!apiKey) {
    sendJson(response, 503, { ok: false, message: "Lead capture is not configured." });
    return;
  }

  try {
    await upsertMailerLiteSubscriber(validation.payload, { apiKey, groupName });
  } catch {
    sendJson(response, 502, { ok: false, message: "Lead capture failed." });
    return;
  }

  sendJson(response, 200, { ok: true });
}

export function validateLandingLeadPayload(payload: LandingLeadPayload) {
  if (!payload.leadConsent) {
    return { ok: false as const, status: 400, message: "Lead consent is required." };
  }

  if (!payload.email || !emailPattern.test(payload.email)) {
    return { ok: false as const, status: 400, message: "Valid email is required." };
  }

  if (!isAllowed(payload.role, roles) || !isAllowed(payload.interestWave, waves) || !isAllowed(payload.source, sources)) {
    return { ok: false as const, status: 400, message: "Lead role, wave, and source are required." };
  }

  return { ok: true as const, payload: payload as ValidLandingLeadPayload };
}

export async function upsertMailerLiteSubscriber(payload: ValidLandingLeadPayload, options: MailerLiteClientOptions) {
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

function isAllowed<T extends string>(value: unknown, allowed: T[]): value is T {
  return typeof value === "string" && allowed.includes(value as T);
}

function readJsonBody(request: IncomingMessage) {
  return new Promise<LandingLeadPayload>((resolve, reject) => {
    let body = "";

    request.on("data", (chunk: Buffer) => {
      body += chunk.toString("utf8");
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}") as LandingLeadPayload);
      } catch (error) {
        reject(error);
      }
    });
    request.on("error", reject);
  });
}

function sendJson(response: ServerResponse, statusCode: number, data: Record<string, unknown>) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(data));
}
