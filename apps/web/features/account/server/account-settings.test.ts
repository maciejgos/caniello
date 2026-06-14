import type { SupabaseClient } from "@supabase/supabase-js";
import { describe, expect, it, vi } from "vitest";
import {
  mapAccountDeletionRequestRow,
  mapAccountProfileRow,
  mapConsentEventRow,
  mapDataExportRequestRow,
  requestOwnerAccountDeletion
} from "./account-settings";

describe("account settings server mapping", () => {
  it("maps account profile and consent rows to API responses", () => {
    expect(
      mapAccountProfileRow({
        id: "11111111-1111-4111-8111-111111111111",
        display_name: "Anna Kowalska",
        language: "pl",
        created_at: "2026-06-12T08:00:00.000Z",
        updated_at: "2026-06-12T08:05:00.000Z"
      })
    ).toEqual({
      id: "11111111-1111-4111-8111-111111111111",
      displayName: "Anna Kowalska",
      language: "pl",
      createdAt: "2026-06-12T08:00:00.000Z",
      updatedAt: "2026-06-12T08:05:00.000Z"
    });

    expect(
      mapConsentEventRow({
        id: "22222222-2222-4222-8222-222222222222",
        analytics_consent: true,
        marketing_consent: false,
        language: "en",
        created_at: "2026-06-12T08:10:00.000Z"
      })
    ).toEqual({
      id: "22222222-2222-4222-8222-222222222222",
      analyticsConsent: true,
      marketingConsent: false,
      language: "en",
      createdAt: "2026-06-12T08:10:00.000Z"
    });
  });

  it("maps data-rights request rows without download or deletion side effects", () => {
    const requestRow = {
      id: "33333333-3333-4333-8333-333333333333",
      status: "requested" as const,
      requested_at: "2026-06-12T08:15:00.000Z"
    };

    expect(mapDataExportRequestRow(requestRow)).toEqual({
      id: "33333333-3333-4333-8333-333333333333",
      status: "requested",
      requestedAt: "2026-06-12T08:15:00.000Z"
    });
    expect(mapAccountDeletionRequestRow(requestRow)).toEqual({
      id: "33333333-3333-4333-8333-333333333333",
      status: "requested",
      requestedAt: "2026-06-12T08:15:00.000Z"
    });
  });

  it("records account deletion requests in the intended request table", async () => {
    const getUser = vi.fn().mockResolvedValue({
      data: { user: { id: "11111111-1111-4111-8111-111111111111" } },
      error: null
    });
    const single = vi.fn().mockResolvedValue({
      data: {
        id: "44444444-4444-4444-8444-444444444444",
        status: "requested",
        requested_at: "2026-06-12T08:15:00.000Z"
      },
      error: null
    });
    const select = vi.fn().mockReturnValue({ single });
    const insert = vi.fn().mockReturnValue({ select });
    const from = vi.fn().mockReturnValue({ insert });

    const result = await requestOwnerAccountDeletion(
      { confirmation: "DELETE", language: "pl" },
      { auth: { getUser }, from } as unknown as SupabaseClient
    );

    expect(result).toEqual({
      ok: true,
      latestDeletionRequest: {
        id: "44444444-4444-4444-8444-444444444444",
        status: "requested",
        requestedAt: "2026-06-12T08:15:00.000Z"
      }
    });
    expect(from).toHaveBeenCalledWith("account_deletion_requests");
    expect(insert).toHaveBeenCalledWith({
      owner_user_id: "11111111-1111-4111-8111-111111111111",
      language: "pl"
    });
    expect(select).toHaveBeenCalledWith("id, status, requested_at");
  });

  it("rejects account deletion requests without the DELETE confirmation", async () => {
    const getUser = vi.fn();
    const from = vi.fn();

    const result = await requestOwnerAccountDeletion(
      { confirmation: "delete", language: "pl" },
      { auth: { getUser }, from } as unknown as SupabaseClient
    );

    expect(result).toMatchObject({
      ok: false,
      status: 400,
      message: "Invalid account deletion request payload."
    });
    expect(getUser).not.toHaveBeenCalled();
    expect(from).not.toHaveBeenCalled();
  });
});
