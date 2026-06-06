import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const runRlsTests = process.env.CANIELLO_RUN_SUPABASE_RLS_TESTS === "1";
const describeRls = runRlsTests ? describe : describe.skip;

const ownerAPetId = "44444444-4444-4444-8444-444444444444";
const ownerAReminderId = "55555555-5555-4555-8555-555555555555";
const forbiddenTitle = "Owner B should not change Bruno reminder";
const testPassword = "CanielloRlsTest123!";

type LocalSupabaseConfig = {
  anonKey: string;
  serviceRoleKey: string;
  url: string;
};

describeRls("care reminder Supabase RLS integration", () => {
  it("prevents a second owner from reading or mutating another owner's reminders", async () => {
    const config = readLocalSupabaseConfig();
    const service = createClient(config.url, config.serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    await service
      .from("reminders")
      .upsert({
        id: ownerAReminderId,
        pet_id: ownerAPetId,
        title: "Rabies vaccine",
        reminder_type: "vaccination",
        due_date: "2026-07-12",
        notes: "Owner A reminder used by RLS tests.",
        status: "active"
      })
      .select("id")
      .single();

    const testEmail = `reminder-rls-owner-${Date.now()}@example.test`;
    const { data: createdUser, error: createUserError } = await service.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: true
    });
    expect(createUserError).toBeNull();
    expect(createdUser.user?.id).toBeTruthy();

    const ownerBUserId = createdUser.user?.id;
    if (!ownerBUserId) {
      throw new Error("Temporary reminder RLS owner was not created.");
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
        .insert({ owner_user_id: ownerBUserId, name: "Reminder RLS test household" })
        .select("id")
        .single();
      expect(ownHouseholdError).toBeNull();
      expect(ownHousehold?.id).toBeTruthy();
      if (!ownHousehold?.id) {
        throw new Error("Temporary reminder owner household was not created.");
      }

      const { data: ownPet, error: ownPetError } = await ownerB
        .from("pets")
        .insert({ household_id: ownHousehold.id, name: "Reminder RLS test pet" })
        .select("id,name")
        .single();
      expect(ownPetError).toBeNull();
      expect(ownPet?.id).toBeTruthy();
      if (!ownPet?.id) {
        throw new Error("Temporary reminder owner pet was not created.");
      }

      const { data: ownReminder, error: ownReminderError } = await ownerB
        .from("reminders")
        .insert({
          pet_id: ownPet.id,
          title: "Owner B reminder",
          reminder_type: "visit",
          due_date: "2026-08-01",
          notes: "Owner B can manage their own reminder.",
          status: "active"
        })
        .select("id,title")
        .single();
      expect(ownReminderError).toBeNull();
      expect(ownReminder).toMatchObject({ title: "Owner B reminder" });

      const { data: ownerAReminderBefore, error: ownerAReminderBeforeError } = await service
        .from("reminders")
        .select("id,title,status")
        .eq("id", ownerAReminderId)
        .single();
      expect(ownerAReminderBeforeError).toBeNull();
      expect(ownerAReminderBefore?.id).toBe(ownerAReminderId);

      const { data: forbiddenRead, error: forbiddenReadError } = await ownerB
        .from("reminders")
        .select("id,title")
        .eq("id", ownerAReminderId);
      expect(forbiddenReadError).toBeNull();
      expect(forbiddenRead).toEqual([]);

      const { data: forbiddenUpdate, error: forbiddenUpdateError } = await ownerB
        .from("reminders")
        .update({ title: forbiddenTitle })
        .eq("id", ownerAReminderId)
        .select("id,title");
      expect(forbiddenUpdateError).toBeNull();
      expect(forbiddenUpdate).toEqual([]);

      const { data: forbiddenInsert, error: forbiddenInsertError } = await ownerB
        .from("reminders")
        .insert({
          pet_id: ownerAPetId,
          title: "Owner B should not add Bruno reminder",
          reminder_type: "visit",
          due_date: "2026-09-01",
          status: "active"
        })
        .select("id");
      expect(forbiddenInsert).toBeNull();
      expect(forbiddenInsertError).not.toBeNull();

      const { data: ownerAReminderAfter, error: ownerAReminderAfterError } = await service
        .from("reminders")
        .select("id,title,status")
        .eq("id", ownerAReminderId)
        .single();
      expect(ownerAReminderAfterError).toBeNull();
      expect(ownerAReminderAfter).toEqual(ownerAReminderBefore);
      expect(ownerAReminderAfter?.title).not.toBe(forbiddenTitle);
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
      "Missing local Supabase env for reminder RLS integration test. Run ./scripts/start.sh and set CANIELLO_RUN_SUPABASE_RLS_TESTS=1."
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
