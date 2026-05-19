import type { LeadSource } from "../content";

export type LandingLeadPayload = {
  email: string;
  source: LeadSource;
  leadConsent: boolean;
  language: string;
  utm: Record<string, string>;
};

export type LandingLeadResult = {
  ok: boolean;
  message?: string;
};

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function readUtmParams(search = window.location.search) {
  const params = new URLSearchParams(search);
  const utm: Record<string, string> = {};

  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((key) => {
    const value = params.get(key);

    if (value) {
      utm[key] = value;
    }
  });

  return utm;
}

export async function submitLandingLead(payload: LandingLeadPayload): Promise<LandingLeadResult> {
  const response = await fetch("/api/landing-leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    return { ok: false };
  }

  return response.json() as Promise<LandingLeadResult>;
}
