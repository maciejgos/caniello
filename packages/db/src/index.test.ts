import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  buildSupabaseRestUrl,
  buildSupabaseStorageUrl,
  readSupabaseClientConfig,
  readSupabaseServiceRoleConfig
} from ".";

describe("Supabase configuration helpers", () => {
  it("reads public client configuration from environment variables", () => {
    expect(
      readSupabaseClientConfig({
        NEXT_PUBLIC_SUPABASE_URL: "http://127.0.0.1:54321/",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon-key"
      })
    ).toEqual({
      url: "http://127.0.0.1:54321",
      anonKey: "anon-key"
    });
  });

  it("returns null when public Supabase configuration is incomplete", () => {
    expect(readSupabaseClientConfig({ NEXT_PUBLIC_SUPABASE_URL: "http://127.0.0.1:54321" })).toBeNull();
  });

  it("keeps the service role key separate from browser-safe config", () => {
    expect(
      readSupabaseServiceRoleConfig({
        NEXT_PUBLIC_SUPABASE_URL: "http://127.0.0.1:54321",
        SUPABASE_SERVICE_ROLE_KEY: "service-role-key"
      })
    ).toEqual({
      url: "http://127.0.0.1:54321",
      serviceRoleKey: "service-role-key"
    });
  });

  it("builds stable Supabase REST and Storage URLs", () => {
    const config = { url: "http://127.0.0.1:54321", anonKey: "anon-key" };

    expect(buildSupabaseRestUrl(config)).toBe("http://127.0.0.1:54321/rest/v1");
    expect(buildSupabaseStorageUrl(config)).toBe("http://127.0.0.1:54321/storage/v1");
  });
});


describe("Supabase migration baseline", () => {
  it("creates the core owner data tables with RLS enabled", () => {
    const migration = readFileSync(
      join(process.cwd(), "../../infra/supabase/migrations/20260519000100_mvp_foundation.sql"),
      "utf8"
    );

    for (const table of [
      "households",
      "pets",
      "documents",
      "document_processing_jobs",
      "extracted_fields",
      "timeline_events",
      "reminders",
      "share_links",
      "audit_logs"
    ]) {
      expect(migration).toContain(`create table public.${table}`);
      expect(migration).toContain(`alter table public.${table} enable row level security`);
    }
  });
});
