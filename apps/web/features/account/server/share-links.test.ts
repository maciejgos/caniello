import type { SupabaseClient } from "@supabase/supabase-js";
import { describe, expect, it } from "vitest";
import { createOwnerShareLink, hashShareToken, readSharedCareCard, revokeOwnerShareLink } from "./share-links";

const ownerUserId = "11111111-1111-4111-8111-111111111111";
const householdId = "33333333-3333-4333-8333-333333333333";
const petId = "44444444-4444-4444-8444-444444444444";
const shareLinkId = "88888888-8888-4888-8888-888888888888";

const petRow = {
  id: petId,
  household_id: householdId,
  name: "Luna",
  species: "dog",
  breed: "mixed breed",
  birth_date: "2021-05-01",
  sex_or_gender: "female",
  weight_kg: "24.20",
  microchip_number: "616093900000222",
  allergies: null,
  medication: null,
  important_notes: "Gets anxious around fireworks.",
  created_at: "2026-06-04T09:00:00.000Z",
  updated_at: "2026-06-04T09:30:00.000Z"
};

describe("care card share link server helpers", () => {
  it("hashes opaque share tokens without returning the raw token hash to clients", async () => {
    const operations: string[] = [];
    const insertedPayloads: unknown[] = [];
    const supabase = createShareLinkSupabaseMock(operations, {
      insertedPayloads,
      shareLinkInsert: {
        data: {
          id: shareLinkId,
          pet_id: petId,
          token_hash: "stored-hash",
          revoked_at: null,
          expires_at: "2026-06-25T12:00:00.000Z",
          created_at: "2026-06-11T12:00:00.000Z"
        },
        error: null
      }
    });

    const result = await createOwnerShareLink(supabase, "http://localhost");

    expect(result).toMatchObject({
      ok: true,
      shareLink: {
        id: shareLinkId,
        petId,
        url: expect.stringMatching(/^http:\/\/localhost\/share\//),
        expiresAt: "2026-06-25T12:00:00.000Z",
        revokedAt: null
      }
    });
    expect(JSON.stringify(result)).not.toContain("stored-hash");
    expect(insertedPayloads[0]).toMatchObject({
      pet_id: petId,
      token_hash: expect.stringMatching(/^[a-f0-9]{64}$/)
    });
    expect(String((insertedPayloads[0] as { token_hash: string }).token_hash)).not.toContain("/share/");
    expect(operations).toContain("share_links.insert");
  });

  it("revokes only the signed-in owner's first-pet share link", async () => {
    const operations: string[] = [];
    const supabase = createShareLinkSupabaseMock(operations, {
      shareLinkUpdate: {
        data: {
          id: shareLinkId,
          pet_id: petId,
          token_hash: "stored-hash",
          revoked_at: "2026-06-11T12:05:00.000Z",
          expires_at: "2026-06-25T12:00:00.000Z",
          created_at: "2026-06-11T12:00:00.000Z"
        },
        error: null
      }
    });

    const result = await revokeOwnerShareLink(shareLinkId, supabase, "http://localhost", new Date("2026-06-11T12:05:00.000Z"));

    expect(result).toMatchObject({ ok: true, shareLink: { id: shareLinkId, revokedAt: "2026-06-11T12:05:00.000Z" } });
    expect(operations).toContain("share_links.update");
    expect(operations).toContain(`share_links.eq:id:${shareLinkId}`);
    expect(operations).toContain(`share_links.eq:pet_id:${petId}`);
  });

  it("resolves active public tokens to bounded read-only care card data", async () => {
    const token = "raw-token";
    const supabase = createPublicShareSupabaseMock({
      expectedTokenHash: hashShareToken(token),
      shareLinkRead: {
        data: {
          id: shareLinkId,
          pet_id: petId,
          token_hash: hashShareToken(token),
          revoked_at: null,
          expires_at: "2026-06-25T12:00:00.000Z",
          created_at: "2026-06-11T12:00:00.000Z"
        },
        error: null
      }
    });

    const result = await readSharedCareCard(token, supabase);

    expect(result).toMatchObject({
      ok: true,
      pet: { id: petId, name: "Luna" },
      reminders: [{ title: "Rabies vaccine" }],
      documents: [{ title: "Vaccination card" }],
      expiresAt: "2026-06-25T12:00:00.000Z"
    });
    expect(JSON.stringify(result)).not.toContain("token_hash");
    expect(JSON.stringify(result)).not.toContain(ownerUserId);
  });

  it("returns the same safe unavailable response for invalid public tokens", async () => {
    const supabase = createPublicShareSupabaseMock({
      expectedTokenHash: hashShareToken("missing"),
      shareLinkRead: { data: null, error: null }
    });

    await expect(readSharedCareCard("missing", supabase)).resolves.toEqual({
      ok: false,
      status: 404,
      message: "This care card link is unavailable."
    });
  });
});

function createShareLinkSupabaseMock(
  operations: string[],
  overrides: {
    insertedPayloads?: unknown[];
    shareLinkInsert?: { data: unknown; error: unknown };
    shareLinkUpdate?: { data: unknown; error: unknown };
  } = {}
) {
  return {
    auth: {
      getUser: async () => ({ data: { user: { id: ownerUserId } }, error: null })
    },
    from: (table: string) => {
      if (table === "households") {
        return {
          select: () => createMaybeSingleBuilder(() => {
            operations.push("households.select");
            return { data: { id: householdId }, error: null };
          }, operations)
        };
      }

      if (table === "pets") {
        return {
          select: () => createMaybeSingleBuilder(() => {
            operations.push("pets.select");
            return { data: petRow, error: null };
          }, operations)
        };
      }

      if (table === "share_links") {
        return {
          insert: (payload: unknown) => ({
            select: () => ({
              single: async () => {
                operations.push("share_links.insert");
                overrides.insertedPayloads?.push(payload);
                return overrides.shareLinkInsert ?? { data: null, error: null };
              }
            })
          }),
          update: (payload: unknown) => {
            operations.push("share_links.update");
            operations.push(`share_links.updatePayload:${JSON.stringify(payload)}`);
            return createMaybeSingleBuilder(() => overrides.shareLinkUpdate ?? { data: null, error: null }, operations);
          }
        };
      }

      throw new Error(`Unexpected table: ${table}`);
    }
  } as unknown as SupabaseClient;
}

function createPublicShareSupabaseMock({
  expectedTokenHash,
  shareLinkRead
}: {
  expectedTokenHash: string;
  shareLinkRead: { data: unknown; error: unknown };
}) {
  return {
    from: (table: string) => {
      if (table === "share_links") {
        return {
          select: () => {
            const builder = {
              eq: (_column: string, value: string) => {
                expect(value).toBe(expectedTokenHash);
                return builder;
              },
              is: () => builder,
              maybeSingle: async () => shareLinkRead,
              or: () => builder
            };
            return builder;
          }
        };
      }

      if (table === "pets") {
        return {
          select: () => createMaybeSingleBuilder(() => ({ data: petRow, error: null }), [])
        };
      }

      if (table === "reminders") {
        return {
          select: () =>
            createListBuilder({
              data: [
                {
                  id: "55555555-5555-4555-8555-555555555555",
                  pet_id: petId,
                  title: "Rabies vaccine",
                  reminder_type: "vaccination",
                  due_date: "2026-07-12",
                  notes: null,
                  status: "active",
                  created_at: "2026-06-06T09:00:00.000Z",
                  updated_at: "2026-06-06T09:00:00.000Z"
                }
              ],
              error: null
            })
        };
      }

      if (table === "documents") {
        return {
          select: () =>
            createListBuilder({
              data: [
                {
                  id: "77777777-7777-4777-8777-777777777777",
                  pet_id: petId,
                  document_title: "Vaccination card",
                  document_type: "vaccination",
                  document_date: "2026-05-20",
                  provider_name: "Riverside Animal Hospital",
                  notes: null,
                  original_filename: null,
                  mime_type: null,
                  status: "metadata_only",
                  created_at: "2026-06-07T10:00:00.000Z",
                  updated_at: "2026-06-07T10:00:00.000Z"
                }
              ],
              error: null
            })
        };
      }

      throw new Error(`Unexpected table: ${table}`);
    }
  } as unknown as SupabaseClient;
}

function createMaybeSingleBuilder(read: () => { data: unknown; error: unknown }, operations: string[]) {
  const builder = {
    eq: (column: string, value: string) => {
      operations.push(`${column === "id" || column === "pet_id" ? "share_links" : column}.eq:${column}:${value}`);
      return builder;
    },
    limit: () => builder,
    maybeSingle: async () => read(),
    order: () => builder,
    select: () => builder
  };

  return builder;
}

function createListBuilder(result: { data: unknown; error: unknown }) {
  const builder = {
    eq: () => builder,
    in: () => builder,
    limit: async () => result,
    order: () => builder
  };

  return builder;
}
