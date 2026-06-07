import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const runRlsTests = process.env.CANIELLO_RUN_SUPABASE_RLS_TESTS === "1";
const describeRls = runRlsTests ? describe : describe.skip;

const ownerAPetId = "44444444-4444-4444-8444-444444444444";
const ownerADocumentId = "77777777-7777-4777-8777-777777777777";
const forbiddenTitle = "Owner B should not change Bruno document";
const testPassword = "CanielloRlsTest123!";

type LocalSupabaseConfig = {
  anonKey: string;
  serviceRoleKey: string;
  url: string;
};

describeRls("document metadata Supabase RLS integration", () => {
  it("prevents a second owner from reading or mutating another owner's documents", async () => {
    const config = readLocalSupabaseConfig();
    const service = createClient(config.url, config.serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    await service
      .from("documents")
      .upsert({
        id: ownerADocumentId,
        pet_id: ownerAPetId,
        storage_bucket: "metadata-only",
        storage_path: "metadata-only/owner-a-rls-document",
        document_title: "Owner A rabies certificate",
        document_type: "vaccination",
        document_date: "2026-05-20",
        provider_name: "Riverside Animal Hospital",
        notes: "Owner A document used by RLS tests.",
        original_filename: "rabies-certificate.pdf",
        mime_type: "application/pdf",
        status: "metadata_only"
      })
      .select("id")
      .single();

    const testEmail = `document-rls-owner-${Date.now()}@example.test`;
    const { data: createdUser, error: createUserError } = await service.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: true
    });
    expect(createUserError).toBeNull();
    expect(createdUser.user?.id).toBeTruthy();

    const ownerBUserId = createdUser.user?.id;
    if (!ownerBUserId) {
      throw new Error("Temporary document RLS owner was not created.");
    }

    try {
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

      const { data: ownHousehold, error: ownHouseholdError } = await ownerB
        .from("households")
        .insert({ owner_user_id: ownerBUserId, name: "Document RLS test household" })
        .select("id")
        .single();
      expect(ownHouseholdError).toBeNull();
      expect(ownHousehold?.id).toBeTruthy();
      if (!ownHousehold?.id) {
        throw new Error("Temporary document owner household was not created.");
      }

      const { data: ownPet, error: ownPetError } = await ownerB
        .from("pets")
        .insert({ household_id: ownHousehold.id, name: "Document RLS test pet" })
        .select("id,name")
        .single();
      expect(ownPetError).toBeNull();
      expect(ownPet?.id).toBeTruthy();
      if (!ownPet?.id) {
        throw new Error("Temporary document owner pet was not created.");
      }

      const { data: ownDocument, error: ownDocumentError } = await ownerB
        .from("documents")
        .insert({
          pet_id: ownPet.id,
          storage_bucket: "metadata-only",
          storage_path: `metadata-only/owner-b-${Date.now()}`,
          document_title: "Owner B vaccination record",
          document_type: "vaccination",
          document_date: "2026-08-01",
          provider_name: "Owner B clinic",
          status: "metadata_only"
        })
        .select("id,document_title")
        .single();
      expect(ownDocumentError).toBeNull();
      expect(ownDocument).toMatchObject({ document_title: "Owner B vaccination record" });

      const { data: ownerADocumentBefore, error: ownerADocumentBeforeError } = await service
        .from("documents")
        .select("id,document_title,status")
        .eq("id", ownerADocumentId)
        .single();
      expect(ownerADocumentBeforeError).toBeNull();
      expect(ownerADocumentBefore?.id).toBe(ownerADocumentId);

      const { data: forbiddenRead, error: forbiddenReadError } = await ownerB
        .from("documents")
        .select("id,document_title")
        .eq("id", ownerADocumentId);
      expect(forbiddenReadError).toBeNull();
      expect(forbiddenRead).toEqual([]);

      const { data: forbiddenUpdate, error: forbiddenUpdateError } = await ownerB
        .from("documents")
        .update({ document_title: forbiddenTitle })
        .eq("id", ownerADocumentId)
        .select("id,document_title");
      expect(forbiddenUpdateError).toBeNull();
      expect(forbiddenUpdate).toEqual([]);

      const { data: forbiddenInsert, error: forbiddenInsertError } = await ownerB
        .from("documents")
        .insert({
          pet_id: ownerAPetId,
          storage_bucket: "metadata-only",
          storage_path: `metadata-only/forbidden-${Date.now()}`,
          document_title: "Owner B should not add Bruno document",
          document_type: "visit_summary",
          document_date: "2026-09-01",
          status: "metadata_only"
        })
        .select("id");
      expect(forbiddenInsert).toBeNull();
      expect(forbiddenInsertError).not.toBeNull();

      const { data: ownerADocumentAfter, error: ownerADocumentAfterError } = await service
        .from("documents")
        .select("id,document_title,status")
        .eq("id", ownerADocumentId)
        .single();
      expect(ownerADocumentAfterError).toBeNull();
      expect(ownerADocumentAfter).toEqual(ownerADocumentBefore);
      expect(ownerADocumentAfter?.document_title).not.toBe(forbiddenTitle);
    } finally {
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
      "Missing local Supabase env for document RLS integration test. Run ./scripts/start.sh and set CANIELLO_RUN_SUPABASE_RLS_TESTS=1."
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
