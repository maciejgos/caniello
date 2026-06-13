import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const runRlsTests = process.env.CANIELLO_RUN_SUPABASE_RLS_TESTS === "1";
const describeRls = runRlsTests ? describe : describe.skip;

const ownerAPetId = "44444444-4444-4444-8444-444444444444";
const ownerAEventId = "66666666-6666-4666-8666-666666666666";
const forbiddenTitle = "Owner B should not change Bruno timeline";
const testPassword = "CanielloRlsTest123!";

type LocalSupabaseConfig = {
  anonKey: string;
  serviceRoleKey: string;
  url: string;
};

describeRls("care timeline Supabase RLS integration", () => {
  it("prevents a second owner from reading or mutating another owner's timeline events", async () => {
    const config = readLocalSupabaseConfig();
    const service = createClient(config.url, config.serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    await service
      .from("timeline_events")
      .upsert({
        id: ownerAEventId,
        pet_id: ownerAPetId,
        source_document_id: null,
        title: "Owner A annual visit",
        event_type: "visit",
        event_date: "2026-06-12",
        notes: "Owner A timeline event used by RLS tests."
      })
      .select("id")
      .single();

    const testEmail = `timeline-rls-owner-${Date.now()}@example.test`;
    const { data: createdUser, error: createUserError } = await service.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: true
    });
    expect(createUserError).toBeNull();
    expect(createdUser.user?.id).toBeTruthy();

    const ownerBUserId = createdUser.user?.id;
    if (!ownerBUserId) {
      throw new Error("Temporary timeline RLS owner was not created.");
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
        .insert({ owner_user_id: ownerBUserId, name: "Timeline RLS test household" })
        .select("id")
        .single();
      expect(ownHouseholdError).toBeNull();
      expect(ownHousehold?.id).toBeTruthy();
      if (!ownHousehold?.id) {
        throw new Error("Temporary timeline owner household was not created.");
      }

      const { data: ownPet, error: ownPetError } = await ownerB
        .from("pets")
        .insert({ household_id: ownHousehold.id, name: "Timeline RLS test pet" })
        .select("id,name")
        .single();
      expect(ownPetError).toBeNull();
      expect(ownPet?.id).toBeTruthy();
      if (!ownPet?.id) {
        throw new Error("Temporary timeline owner pet was not created.");
      }

      const { data: ownEvent, error: ownEventError } = await ownerB
        .from("timeline_events")
        .insert({
          pet_id: ownPet.id,
          source_document_id: null,
          title: "Owner B visit",
          event_type: "visit",
          event_date: "2026-08-01",
          notes: "Owner B can manage their own timeline event."
        })
        .select("id,title")
        .single();
      expect(ownEventError).toBeNull();
      expect(ownEvent).toMatchObject({ title: "Owner B visit" });

      const { data: ownerAEventBefore, error: ownerAEventBeforeError } = await service
        .from("timeline_events")
        .select("id,title,event_type")
        .eq("id", ownerAEventId)
        .single();
      expect(ownerAEventBeforeError).toBeNull();
      expect(ownerAEventBefore?.id).toBe(ownerAEventId);

      const { data: forbiddenRead, error: forbiddenReadError } = await ownerB
        .from("timeline_events")
        .select("id,title")
        .eq("id", ownerAEventId);
      expect(forbiddenReadError).toBeNull();
      expect(forbiddenRead).toEqual([]);

      const { data: forbiddenUpdate, error: forbiddenUpdateError } = await ownerB
        .from("timeline_events")
        .update({ title: forbiddenTitle })
        .eq("id", ownerAEventId)
        .select("id,title");
      expect(forbiddenUpdateError).toBeNull();
      expect(forbiddenUpdate).toEqual([]);

      const { data: forbiddenInsert, error: forbiddenInsertError } = await ownerB
        .from("timeline_events")
        .insert({
          pet_id: ownerAPetId,
          source_document_id: null,
          title: "Owner B should not add Bruno timeline",
          event_type: "visit",
          event_date: "2026-09-01"
        })
        .select("id");
      expect(forbiddenInsert).toBeNull();
      expect(forbiddenInsertError).not.toBeNull();

      const { data: ownerAEventAfter, error: ownerAEventAfterError } = await service
        .from("timeline_events")
        .select("id,title,event_type")
        .eq("id", ownerAEventId)
        .single();
      expect(ownerAEventAfterError).toBeNull();
      expect(ownerAEventAfter).toEqual(ownerAEventBefore);
      expect(ownerAEventAfter?.title).not.toBe(forbiddenTitle);
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
      "Missing local Supabase env for timeline RLS integration test. Run ./scripts/start.sh and set CANIELLO_RUN_SUPABASE_RLS_TESTS=1."
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
