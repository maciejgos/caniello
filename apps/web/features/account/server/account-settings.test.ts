import { describe, expect, it } from "vitest";
import {
  mapAccountDeletionRequestRow,
  mapAccountProfileRow,
  mapConsentEventRow,
  mapDataExportRequestRow
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
});
