import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const runRlsTests = process.env.CANIELLO_RUN_SUPABASE_RLS_TESTS === "1";
const describeRls = runRlsTests ? describe : describe.skip;

const ownerAUserId = "11111111-1111-4111-8111-111111111111";
const forbiddenDisplayName = "Owner B should not rename Anna";
const testPassword = "CanielloRlsTest123!";

type LocalSupabaseConfig = {
  anonKey: string;
  serviceRoleKey: string;
  url: string;
};

describeRls("account settings Supabase RLS integration", () => {
  it("prevents a second owner from reading or mutating another owner's account privacy records", async () => {
    const config = readLocalSupabaseConfig();
    const service = createClient(config.url, config.serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    const testEmail = `rls-settings-owner-${Date.now()}@example.test`;
    const { data: createdUser, error: createUserError } = await service.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: true
    });
    expect(createUserError).toBeNull();
    expect(createdUser.user?.id).toBeTruthy();

    const ownerBUserId = createdUser.user?.id;
    if (!ownerBUserId) {
      throw new Error("Temporary RLS owner was not created.");
    }

    const ownerAInsertedIds = {
      consentId: "",
      exportId: "",
      deletionId: ""
    };

    try {
      const { data: ownerAProfileBefore, error: ownerAProfileBeforeError } = await service
        .from("account_profiles")
        .select("id,display_name,language")
        .eq("owner_user_id", ownerAUserId)
        .single();
      expect(ownerAProfileBeforeError).toBeNull();
      expect(ownerAProfileBefore?.display_name).toBe("Anna Kowalska");

      const { data: ownerAConsent, error: ownerAConsentError } = await service
        .from("consent_events")
        .insert({
          owner_user_id: ownerAUserId,
          analytics_consent: true,
          marketing_consent: false,
          language: "pl",
          metadata: { test: "account-settings-rls" }
        })
        .select("id")
        .single();
      expect(ownerAConsentError).toBeNull();
      ownerAInsertedIds.consentId = ownerAConsent?.id ?? "";

      const { data: ownerAExport, error: ownerAExportError } = await service
        .from("data_export_requests")
        .insert({ owner_user_id: ownerAUserId, language: "pl", metadata: { test: "account-settings-rls" } })
        .select("id")
        .single();
      expect(ownerAExportError).toBeNull();
      ownerAInsertedIds.exportId = ownerAExport?.id ?? "";

      const { data: ownerADeletion, error: ownerADeletionError } = await service
        .from("account_deletion_requests")
        .insert({ owner_user_id: ownerAUserId, language: "pl", metadata: { test: "account-settings-rls" } })
        .select("id")
        .single();
      expect(ownerADeletionError).toBeNull();
      ownerAInsertedIds.deletionId = ownerADeletion?.id ?? "";

      const ownerB = createClient(config.url, config.anonKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      });

      const { error: signInError } = await ownerB.auth.signInWithPassword({
        email: testEmail,
        password: testPassword
      });
      expect(signInError).toBeNull();

      const { data: ownProfile, error: ownProfileError } = await ownerB
        .from("account_profiles")
        .update({ display_name: "RLS Settings Owner", language: "en" })
        .eq("owner_user_id", ownerBUserId)
        .select("id,display_name,language")
        .single();
      expect(ownProfileError).toBeNull();
      expect(ownProfile).toMatchObject({ display_name: "RLS Settings Owner", language: "en" });

      const { data: ownConsent, error: ownConsentError } = await ownerB
        .from("consent_events")
        .insert({ owner_user_id: ownerBUserId, analytics_consent: false, marketing_consent: true, language: "en" })
        .select("id")
        .single();
      expect(ownConsentError).toBeNull();
      expect(ownConsent?.id).toBeTruthy();

      const { data: ownExport, error: ownExportError } = await ownerB
        .from("data_export_requests")
        .insert({ owner_user_id: ownerBUserId, language: "en" })
        .select("id,status")
        .single();
      expect(ownExportError).toBeNull();
      expect(ownExport).toMatchObject({ status: "requested" });

      const { data: ownDeletion, error: ownDeletionError } = await ownerB
        .from("account_deletion_requests")
        .insert({ owner_user_id: ownerBUserId, language: "en" })
        .select("id,status")
        .single();
      expect(ownDeletionError).toBeNull();
      expect(ownDeletion).toMatchObject({ status: "requested" });

      const { data: ownDeletionAudit, error: ownDeletionAuditError } = await service
        .from("audit_logs")
        .select("action,entity_type,entity_id,metadata")
        .eq("actor_user_id", ownerBUserId)
        .eq("action", "account.deletion_requested")
        .eq("entity_id", ownDeletion?.id)
        .single();
      expect(ownDeletionAuditError).toBeNull();
      expect(ownDeletionAudit).toMatchObject({
        action: "account.deletion_requested",
        entity_type: "account_deletion_request",
        entity_id: ownDeletion?.id,
        metadata: { status: "requested", language: "en" }
      });

      const { data: forbiddenProfileRead, error: forbiddenProfileReadError } = await ownerB
        .from("account_profiles")
        .select("id,display_name")
        .eq("owner_user_id", ownerAUserId);
      expect(forbiddenProfileReadError).toBeNull();
      expect(forbiddenProfileRead).toEqual([]);

      const { data: forbiddenProfileUpdate, error: forbiddenProfileUpdateError } = await ownerB
        .from("account_profiles")
        .update({ display_name: forbiddenDisplayName })
        .eq("owner_user_id", ownerAUserId)
        .select("id,display_name");
      expect(forbiddenProfileUpdateError).toBeNull();
      expect(forbiddenProfileUpdate).toEqual([]);

      const forbiddenReads = await Promise.all([
        ownerB.from("consent_events").select("id").eq("id", ownerAInsertedIds.consentId),
        ownerB.from("data_export_requests").select("id").eq("id", ownerAInsertedIds.exportId),
        ownerB.from("account_deletion_requests").select("id").eq("id", ownerAInsertedIds.deletionId)
      ]);
      forbiddenReads.forEach(({ data, error }) => {
        expect(error).toBeNull();
        expect(data).toEqual([]);
      });

      const forbiddenInserts = await Promise.all([
        ownerB.from("consent_events").insert({ owner_user_id: ownerAUserId, analytics_consent: false, language: "en" }).select("id"),
        ownerB.from("data_export_requests").insert({ owner_user_id: ownerAUserId, language: "en" }).select("id"),
        ownerB.from("account_deletion_requests").insert({ owner_user_id: ownerAUserId, language: "en" }).select("id")
      ]);
      forbiddenInserts.forEach(({ data, error }) => {
        expect(data).toBeNull();
        expect(error).not.toBeNull();
      });

      const { data: ownerAProfileAfter, error: ownerAProfileAfterError } = await service
        .from("account_profiles")
        .select("id,display_name,language")
        .eq("owner_user_id", ownerAUserId)
        .single();
      expect(ownerAProfileAfterError).toBeNull();
      expect(ownerAProfileAfter).toEqual(ownerAProfileBefore);
      expect(ownerAProfileAfter?.display_name).not.toBe(forbiddenDisplayName);
    } finally {
      if (ownerAInsertedIds.consentId) {
        await service.from("consent_events").delete().eq("id", ownerAInsertedIds.consentId);
      }
      if (ownerAInsertedIds.exportId) {
        await service.from("data_export_requests").delete().eq("id", ownerAInsertedIds.exportId);
      }
      if (ownerAInsertedIds.deletionId) {
        await service.from("account_deletion_requests").delete().eq("id", ownerAInsertedIds.deletionId);
      }
      await service.auth.admin.deleteUser(ownerBUserId);
    }
  });
});

function readLocalSupabaseConfig(): LocalSupabaseConfig {
  const env = {
    ...readEnvFile(join(process.cwd(), "../../.env.local")),
    ...readEnvFile(join(process.cwd(), ".env.local")),
    ...process.env
  };

  const url = env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !anonKey || !serviceRoleKey) {
    throw new Error(
      "Missing local Supabase env for RLS integration test. Run ./scripts/start.sh and set CANIELLO_RUN_SUPABASE_RLS_TESTS=1."
    );
  }

  return { url, anonKey, serviceRoleKey };
}

function readEnvFile(path: string) {
  if (!existsSync(path)) return {};

  return Object.fromEntries(
    readFileSync(path, "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const separatorIndex = line.indexOf("=");
        const key = line.slice(0, separatorIndex).trim();
        const value = line
          .slice(separatorIndex + 1)
          .trim()
          .replace(/^['"]|['"]$/g, "");
        return [key, value];
      })
  );
}
