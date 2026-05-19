import { NextResponse } from "next/server";
import { defaultMailerLiteGroupName, describeMailerLiteError, getMailerLiteLeadFailureResponse, upsertMailerLiteSubscriber, validateLandingLeadPayload } from "../../../features/marketing/server/landing-leads";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const validation = validateLandingLeadPayload(payload);
  if (!validation.ok) {
    return NextResponse.json({ ok: false, message: validation.message }, { status: validation.status });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupName = process.env.MAILERLITE_GROUP_NAME || defaultMailerLiteGroupName;

  if (!apiKey) {
    return NextResponse.json({ ok: false, message: "Lead capture is not configured." }, { status: 503 });
  }

  try {
    await upsertMailerLiteSubscriber(validation.payload, { apiKey, groupName });
  } catch (error) {
    console.error("Landing lead MailerLite upsert failed", describeMailerLiteError(error));
    const failure = getMailerLiteLeadFailureResponse(error);
    return NextResponse.json({ ok: false, message: failure.message }, { status: failure.status });
  }

  return NextResponse.json({ ok: true });
}

