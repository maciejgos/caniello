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

const roleGroups: Record<NonNullable<LandingLeadPayload["role"]>, string[]> = {
  pet_owner: ["MAILERLITE_GROUP_WAITLIST", "MAILERLITE_GROUP_PET_OWNERS"],
  pet_service_provider: ["MAILERLITE_GROUP_SERVICE_PROVIDERS", "MAILERLITE_GROUP_WAVE2"],
  clinic_vet: ["MAILERLITE_GROUP_CLINICS_VETS", "MAILERLITE_GROUP_WAVE3"]
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const roles = ["pet_owner", "pet_service_provider", "clinic_vet"];
const waves = ["wave_1", "wave_2", "wave_3"];
const sources = ["landing_page_hero", "landing_page_mid_cta", "landing_page_footer", "landing_page_wave2", "landing_page_wave3"];

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

  if (!payload.leadConsent) {
    sendJson(response, 400, { ok: false, message: "Lead consent is required." });
    return;
  }

  if (!payload.email || !emailPattern.test(payload.email)) {
    sendJson(response, 400, { ok: false, message: "Valid email is required." });
    return;
  }

  if (!isAllowed(payload.role, roles) || !isAllowed(payload.interestWave, waves) || !isAllowed(payload.source, sources)) {
    sendJson(response, 400, { ok: false, message: "Lead role, wave, and source are required." });
    return;
  }

  const apiKey = process.env.MAILERLITE_API_KEY;

  if (!apiKey) {
    sendJson(response, 503, { ok: false, message: "Lead capture is not configured." });
    return;
  }

  const groupIds = roleGroups[payload.role].map((name) => process.env[name]).filter(Boolean);
  const mailerLiteResponse = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: payload.email,
      groups: groupIds,
      fields: {
        role: payload.role,
        interest_wave: payload.interestWave,
        source: payload.source,
        lead_consent: String(payload.leadConsent),
        language: payload.language,
        organization: payload.organization,
        context: payload.context,
        website: payload.website,
        utm_source: payload.utm?.utm_source,
        utm_medium: payload.utm?.utm_medium,
        utm_campaign: payload.utm?.utm_campaign,
        utm_term: payload.utm?.utm_term,
        utm_content: payload.utm?.utm_content
      }
    })
  });

  if (!mailerLiteResponse.ok) {
    sendJson(response, 502, { ok: false, message: "Lead capture failed." });
    return;
  }

  sendJson(response, 200, { ok: true });
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
