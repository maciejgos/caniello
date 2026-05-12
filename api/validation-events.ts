import type { IncomingMessage, ServerResponse } from "node:http";

type ValidationEventPayload = {
  name?: string;
  source?: string;
  analyticsConsent?: boolean;
  utm?: Record<string, string>;
  createdAt?: string;
};

const allowedEvents = [
  "analytics_consent",
  "page_view",
  "waitlist_submit",
  "waitlist_success",
  "waitlist_error",
  "wave2_interest",
  "wave3_interest"
];

export default async function handler(request: IncomingMessage, response: ServerResponse) {
  if (request.method !== "POST") {
    sendJson(response, 405, { ok: false, message: "Method not allowed." });
    return;
  }

  let payload: ValidationEventPayload;

  try {
    payload = await readJsonBody(request);
  } catch {
    sendJson(response, 400, { ok: false, message: "Invalid JSON body." });
    return;
  }

  if (!payload.name || !allowedEvents.includes(payload.name)) {
    sendJson(response, 400, { ok: false, message: "Valid event name is required." });
    return;
  }

  // Durable analytics storage will be wired when the final analytics sink is selected.
  // This server boundary keeps browser behavior API-driven without exposing vendor credentials.
  sendJson(response, 202, { ok: true });
}

function readJsonBody(request: IncomingMessage) {
  return new Promise<ValidationEventPayload>((resolve, reject) => {
    let body = "";

    request.on("data", (chunk: Buffer) => {
      body += chunk.toString("utf8");
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}") as ValidationEventPayload);
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
