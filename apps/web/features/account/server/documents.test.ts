import type { SupabaseClient } from "@supabase/supabase-js";
import { describe, expect, it } from "vitest";
import {
  createDocumentDatabasePayload,
  createDocumentUpdatePayload,
  createOwnerDocument,
  mapDocumentRow,
  updateOwnerDocument
} from "./documents";

const ownerUserId = "11111111-1111-4111-8111-111111111111";
const householdId = "33333333-3333-4333-8333-333333333333";
const petId = "44444444-4444-4444-8444-444444444444";
const documentId = "77777777-7777-4777-8777-777777777777";

const petRow = {
  id: petId,
  household_id: householdId,
  name: "Bruno",
  species: "dog",
  breed: "mixed breed",
  birth_date: "2021-05-01",
  sex_or_gender: "male",
  weight_kg: "26.40",
  microchip_number: null,
  allergies: null,
  medication: null,
  important_notes: null,
  created_at: "2026-06-04T09:00:00.000Z",
  updated_at: "2026-06-04T09:30:00.000Z"
};

describe("document server helpers", () => {
  it("maps API payload fields to document metadata columns", () => {
    expect(
      createDocumentDatabasePayload({
        title: "Rabies certificate",
        documentType: "vaccination",
        documentDate: "2026-05-20",
        providerName: "Riverside Animal Hospital",
        notes: null,
        originalFilename: "rabies.pdf",
        mimeType: "application/pdf"
      })
    ).toEqual({
      document_title: "Rabies certificate",
      document_type: "vaccination",
      document_date: "2026-05-20",
      provider_name: "Riverside Animal Hospital",
      notes: null,
      original_filename: "rabies.pdf",
      mime_type: "application/pdf"
    });
  });

  it("adds a fresh updated_at value for document updates", () => {
    expect(
      createDocumentUpdatePayload(
        {
          document_title: "Updated lab result",
          document_type: "lab_result",
          document_date: "2026-05-21",
          provider_name: null,
          notes: "Reviewed by owner.",
          original_filename: null,
          mime_type: null
        },
        new Date("2026-06-07T11:00:00.000Z")
      )
    ).toEqual({
      document_title: "Updated lab result",
      document_type: "lab_result",
      document_date: "2026-05-21",
      provider_name: null,
      notes: "Reviewed by owner.",
      original_filename: null,
      mime_type: null,
      updated_at: "2026-06-07T11:00:00.000Z"
    });
  });

  it("maps Supabase document rows to the API response shape", () => {
    expect(
      mapDocumentRow({
        id: documentId,
        pet_id: petId,
        document_title: "Rabies certificate",
        document_type: "vaccination",
        document_date: "2026-05-20",
        provider_name: "Riverside Animal Hospital",
        notes: null,
        original_filename: "rabies.pdf",
        mime_type: "application/pdf",
        status: "metadata_only",
        created_at: "2026-06-07T10:00:00.000Z",
        updated_at: "2026-06-07T10:00:00.000Z"
      })
    ).toEqual({
      id: documentId,
      petId,
      title: "Rabies certificate",
      documentType: "vaccination",
      documentDate: "2026-05-20",
      providerName: "Riverside Animal Hospital",
      notes: null,
      originalFilename: "rabies.pdf",
      mimeType: "application/pdf",
      status: "metadata_only",
      createdAt: "2026-06-07T10:00:00.000Z",
      updatedAt: "2026-06-07T10:00:00.000Z"
    });
  });

  it("creates metadata-only documents for the signed-in owner's first pet", async () => {
    const operations: string[] = [];
    const documentRow = {
      id: documentId,
      pet_id: petId,
      document_title: "Rabies certificate",
      document_type: "vaccination" as const,
      document_date: "2026-05-20",
      provider_name: "Riverside Animal Hospital",
      notes: "Bring to the next visit.",
      original_filename: "rabies.pdf",
      mime_type: "application/pdf",
      status: "metadata_only" as const,
      created_at: "2026-06-07T10:00:00.000Z",
      updated_at: "2026-06-07T10:00:00.000Z"
    };
    const supabase = createDocumentSupabaseMock(operations, {
      documentInsert: { data: documentRow, error: null }
    });

    const result = await createOwnerDocument(
      {
        title: "Rabies certificate",
        documentType: "vaccination",
        documentDate: "2026-05-20",
        providerName: "Riverside Animal Hospital",
        notes: "Bring to the next visit.",
        originalFilename: "rabies.pdf",
        mimeType: "application/pdf"
      },
      supabase
    );

    expect(result).toMatchObject({ ok: true, document: { title: "Rabies certificate", status: "metadata_only" } });
    expect(operations).toContain("households.select");
    expect(operations).toContain("pets.select");
    expect(operations.join(" ")).toContain('"storage_bucket":"metadata-only"');
    expect(operations.join(" ")).not.toContain("extraction");
  });

  it("updates an owner document without touching upload or OCR behavior", async () => {
    const operations: string[] = [];
    const supabase = createDocumentSupabaseMock(operations, {
      documentUpdate: {
        data: {
          id: documentId,
          pet_id: petId,
          document_title: "Updated rabies certificate",
          document_type: "vaccination",
          document_date: "2026-05-21",
          provider_name: null,
          notes: null,
          original_filename: null,
          mime_type: null,
          status: "metadata_only",
          created_at: "2026-06-07T10:00:00.000Z",
          updated_at: "2026-06-07T11:00:00.000Z"
        },
        error: null
      }
    });

    const result = await updateOwnerDocument(
      documentId,
      {
        title: "Updated rabies certificate",
        documentType: "vaccination",
        documentDate: "2026-05-21"
      },
      supabase
    );

    expect(result).toMatchObject({ ok: true, document: { id: documentId, title: "Updated rabies certificate" } });
    expect(operations).toContain("documents.update");
    expect(operations.join(" ")).not.toContain("storage_path");
  });
});

function createDocumentSupabaseMock(
  operations: string[],
  overrides: {
    householdRead?: { data: unknown; error: unknown };
    petRead?: { data: unknown; error: unknown };
    documentInsert?: { data: unknown; error: unknown };
    documentUpdate?: { data: unknown; error: unknown };
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
            return overrides.householdRead ?? { data: { id: householdId }, error: null };
          })
        };
      }

      if (table === "pets") {
        return {
          select: () => createMaybeSingleBuilder(() => {
            operations.push("pets.select");
            return overrides.petRead ?? { data: petRow, error: null };
          })
        };
      }

      if (table === "documents") {
        return {
          insert: (payload: unknown) => ({
            select: () => ({
              single: async () => {
                operations.push(`documents.insert:${JSON.stringify(payload)}`);
                return overrides.documentInsert ?? { data: null, error: null };
              }
            })
          }),
          update: (payload: unknown) => {
            operations.push("documents.update");
            operations.push(`documents.updatePayload:${JSON.stringify(payload)}`);
            return createMaybeSingleBuilder(() => overrides.documentUpdate ?? { data: null, error: null });
          }
        };
      }

      throw new Error(`Unexpected table: ${table}`);
    }
  } as unknown as SupabaseClient;
}

function createMaybeSingleBuilder(read: () => { data: unknown; error: unknown }) {
  const builder = {
    eq: () => builder,
    limit: () => builder,
    maybeSingle: async () => read(),
    order: () => builder,
    select: () => builder
  };

  return builder;
}
