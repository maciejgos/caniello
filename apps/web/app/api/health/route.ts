import { createHealthPayload } from "@caniello/contracts";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(createHealthPayload(), {
    status: 200,
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
