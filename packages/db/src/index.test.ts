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
  readSupabaseServerClientConfig,
  readSupabaseServiceRoleConfig
} from ".";

const repositoryRoot = process.cwd().endsWith("packages/db") ? join(process.cwd(), "../..") : process.cwd();
const migrationPath = (filename: string) => join(repositoryRoot, "infra/supabase/migrations", filename);

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

  it("prefers the internal Supabase URL for server-side clients", () => {
    expect(
      readSupabaseServerClientConfig({
        NEXT_PUBLIC_SUPABASE_URL: "http://127.0.0.1:55321",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon-key",
        SUPABASE_INTERNAL_URL: "http://host.docker.internal:55321/"
      })
    ).toEqual({
      url: "http://host.docker.internal:55321",
      anonKey: "anon-key"
    });
  });

  it("prefers the internal Supabase URL for service-role clients", () => {
    expect(
      readSupabaseServiceRoleConfig({
        NEXT_PUBLIC_SUPABASE_URL: "http://127.0.0.1:55321",
        SUPABASE_INTERNAL_URL: "http://host.docker.internal:55321",
        SUPABASE_SERVICE_ROLE_KEY: "service-role-key"
      })
    ).toEqual({
      url: "http://host.docker.internal:55321",
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
    const migration = readFileSync(migrationPath("20260519000100_mvp_foundation.sql"), "utf8");

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
    const migration = readFileSync(migrationPath("20260520150000_owner_account_privacy_foundation.sql"), "utf8");

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

  it("creates account profiles automatically from Supabase Auth users", () => {
    const migration = readFileSync(migrationPath("20260523093000_create_account_profile_on_auth_signup.sql"), "utf8");

    expect(migration).toContain("create or replace function public.create_account_profile_for_auth_user()");
    expect(migration).toContain("create trigger create_account_profile_after_auth_signup");
    expect(migration).toContain("after insert on auth.users");
    expect(migration).toContain("insert into public.account_profiles");
    expect(migration).toContain("raw_user_meta_data->>'displayName'");
    expect(migration).toContain("where account_profiles.id is null");
  });

  it("extends owner-scoped pets with MVP profile fields without changing RLS ownership", () => {
    const migration = readFileSync(migrationPath("20260604090000_extend_pet_profile_fields.sql"), "utf8");

    for (const column of [
      "sex_or_gender",
      "weight_kg",
      "microchip_number",
      "allergies",
      "medication",
      "important_notes"
    ]) {
      expect(migration).toContain(`add column ${column}`);
    }

    expect(migration).toContain("constraint pets_weight_kg_range");
    expect(migration).toContain("weight_kg >= 0");
    expect(migration).toContain("weight_kg <= 250");
    expect(migration).toContain("on public.pets (household_id, created_at)");
    expect(migration).not.toContain("create policy");
  });

  it("enforces one default owner household for first-pet creation", () => {
    const migration = readFileSync(migrationPath("20260605150000_enforce_unique_owner_households.sql"), "utf8");

    expect(migration).toContain("alter table public.households");
    expect(migration).toContain("constraint households_owner_user_id_unique");
    expect(migration).toContain("unique (owner_user_id)");
    expect(migration).not.toContain("create policy");
  });
});
