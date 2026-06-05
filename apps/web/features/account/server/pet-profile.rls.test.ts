import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const runRlsTests = process.env.CANIELLO_RUN_SUPABASE_RLS_TESTS === "1";
const describeRls = runRlsTests ? describe : describe.skip;

const ownerAPetId = "44444444-4444-4444-8444-444444444444";
const ownerAHouseholdId = "33333333-3333-4333-8333-333333333333";
const forbiddenRename = "Owner B should not rename Bruno";
const testPassword = "CanielloRlsTest123!";

type LocalSupabaseConfig = {
  anonKey: string;
  serviceRoleKey: string;
  url: string;
};

describeRls("pet profile Supabase RLS integration", () => {
  it("prevents a second owner from reading or mutating another owner's household pet", async () => {
    const config = readLocalSupabaseConfig();
    const service = createClient(config.url, config.serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    const testEmail = `rls-owner-${Date.now()}@example.test`;
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
        .insert({ owner_user_id: ownerBUserId, name: "RLS test household" })
        .select("id")
        .single();
      expect(ownHouseholdError).toBeNull();
      expect(ownHousehold?.id).toBeTruthy();
      if (!ownHousehold?.id) {
        throw new Error("Temporary owner household was not created.");
      }

      const { data: ownPet, error: ownPetError } = await ownerB
        .from("pets")
        .insert({ household_id: ownHousehold.id, name: "RLS test pet" })
        .select("id,name")
        .single();
      expect(ownPetError).toBeNull();
      expect(ownPet).toMatchObject({ name: "RLS test pet" });

      const { data: brunoBefore, error: brunoBeforeError } = await service
        .from("pets")
        .select("id,name")
        .eq("id", ownerAPetId)
        .single();
      expect(brunoBeforeError).toBeNull();
      expect(brunoBefore?.id).toBe(ownerAPetId);

      const { data: forbiddenRead, error: forbiddenReadError } = await ownerB
        .from("pets")
        .select("id,name")
        .eq("id", ownerAPetId);
      expect(forbiddenReadError).toBeNull();
      expect(forbiddenRead).toEqual([]);

      const { data: forbiddenUpdate, error: forbiddenUpdateError } = await ownerB
        .from("pets")
        .update({ name: forbiddenRename })
        .eq("id", ownerAPetId)
        .select("id,name");
      expect(forbiddenUpdateError).toBeNull();
      expect(forbiddenUpdate).toEqual([]);

      const { data: forbiddenInsert, error: forbiddenInsertError } = await ownerB
        .from("pets")
        .insert({ household_id: ownerAHouseholdId, name: "Owner B should not add a pet here" })
        .select("id");
      expect(forbiddenInsert).toBeNull();
      expect(forbiddenInsertError).not.toBeNull();

      const { data: bruno, error: brunoError } = await service
        .from("pets")
        .select("id,name")
        .eq("id", ownerAPetId)
        .single();
      expect(brunoError).toBeNull();
      expect(bruno).toEqual(brunoBefore);
      expect(bruno?.name).not.toBe(forbiddenRename);
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
