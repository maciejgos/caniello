import { createVersionPayload } from "@caniello/contracts";
import { NextResponse } from "next/server";
import webPackage from "../../../package.json";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    createVersionPayload({
      version: webPackage.version,
      commit: process.env.VERCEL_GIT_COMMIT_SHA,
      environment: process.env.VERCEL_ENV
    }),
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}
