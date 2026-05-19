import { NextResponse } from "next/server";
import { validateValidationEventPayload } from "../../../features/marketing/server/validation-events";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const validation = validateValidationEventPayload(payload);
  if (!validation.ok) {
    return NextResponse.json({ ok: false, message: validation.message }, { status: validation.status });
  }

  // Durable analytics storage will be wired when the final analytics sink is selected.
  // This server boundary keeps browser behavior API-driven without exposing vendor credentials.
  return NextResponse.json({ ok: true }, { status: 202 });
}

