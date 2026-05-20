import { accountPrivacyAuditActionSchema, accountPrivacyAuditActions } from "@caniello/contracts";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  buildSupabaseRestUrl,
  buildSupabaseStorageUrl,
  createSupabaseBrowserClient,
  createSupabaseServiceRoleClient,
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

  it("centralizes Supabase client construction without mixing service role config into browser clients", () => {
    const browserClient = createSupabaseBrowserClient({ url: "http://127.0.0.1:54321", anonKey: "anon-key" });
    const serviceClient = createSupabaseServiceRoleClient({
      url: "http://127.0.0.1:54321",
      serviceRoleKey: "service-role-key"
    });

    expect(browserClient).toHaveProperty("auth");
    expect(serviceClient).toHaveProperty("auth");
  });

  it("uses shared account privacy audit action names from contracts", () => {
    for (const action of Object.values(accountPrivacyAuditActions)) {
      expect(accountPrivacyAuditActionSchema.parse(action)).toBe(action);
    }
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

  it("creates account privacy tables with RLS and owner-scoped policies", () => {
    const migration = readFileSync(
      join(process.cwd(), "../../infra/supabase/migrations/20260520150000_owner_account_privacy_foundation.sql"),
      "utf8"
    );

    for (const table of ["account_profiles", "consent_events", "data_export_requests", "account_deletion_requests"]) {
      expect(migration).toContain(`create table public.${table}`);
      expect(migration).toContain(`alter table public.${table} enable row level security`);
    }

    for (const action of Object.values(accountPrivacyAuditActions)) {
      expect(migration).toContain(action);
    }

    expect(migration).toContain("create type public.account_language as enum ('pl', 'en')");
    expect(migration).toContain(
      "create type public.data_rights_request_status as enum ('requested', 'processing', 'completed', 'failed', 'cancelled')"
    );
    expect(migration).toContain("owner_user_id = auth.uid()");
    expect(migration).toContain("insert into public.audit_logs");
  });
});
