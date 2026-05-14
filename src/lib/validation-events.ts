import type { LeadSource } from "../content";

export type ValidationEventName =
  | "analytics_consent"
  | "page_view"
  | "waitlist_submit"
  | "waitlist_success"
  | "waitlist_error";

export type ValidationEvent = {
  name: ValidationEventName;
  source?: LeadSource;
  analyticsConsent?: boolean;
  utm?: Record<string, string>;
  createdAt: string;
};

const consentKey = "caniello.analyticsConsent";

export type AnalyticsPreference = "granted" | "declined" | null;

export function readAnalyticsPreference(): AnalyticsPreference {
  const value = window.localStorage.getItem(consentKey);

  return value === "granted" || value === "declined" ? value : null;
}

export function readAnalyticsConsent() {
  return readAnalyticsPreference() === "granted";
}

export async function saveAnalyticsConsent(granted: boolean, utm: Record<string, string> = {}) {
  await sendValidationEvent({
    name: "analytics_consent",
    analyticsConsent: granted,
    utm
  });

  window.localStorage.setItem(consentKey, granted ? "granted" : "declined");
}

export function trackValidationEvent(event: Omit<ValidationEvent, "createdAt">) {
  if (!readAnalyticsConsent()) {
    return;
  }

  void sendValidationEvent(event).catch(() => {
    // Validation analytics must never interrupt the landing-page flow.
  });
}

async function sendValidationEvent(event: Omit<ValidationEvent, "createdAt">) {
  await fetch("/api/validation-events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...event,
      createdAt: new Date().toISOString()
    })
  });
}

export function readValidationEvents() {
  return [];
}
