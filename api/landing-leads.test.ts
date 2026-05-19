import { upsertMailerLiteSubscriber, validateLandingLeadPayload } from "./landing-leads";

const validPayload = {
  email: "owner@example.com",
  source: "landing_page_hero" as const,
  leadConsent: true,
  language: "pl" as const,
  utm: {
    utm_source: "newsletter",
    utm_medium: "email",
    utm_campaign: "waitlist"
  }
};

describe("landing lead MailerLite integration", () => {
  it("rejects server-side submissions when lead consent is missing", () => {
    expect(validateLandingLeadPayload({ ...validPayload, leadConsent: false })).toEqual({
      ok: false,
      status: 400,
      message: "Lead consent is required."
    });
  });

  it("rejects landing-page role or wave segmentation fields", () => {
    const segmentedPayload = {
      ...validPayload,
      role: "pet_service_provider",
      interestWave: "wave_2"
    } as unknown as Parameters<typeof validateLandingLeadPayload>[0];

    expect(validateLandingLeadPayload(segmentedPayload)).toEqual({
      ok: false,
      status: 400,
      message: "Lead segmentation is handled by the MailerLite survey."
    });
  });

  it("rejects unsupported language context", () => {
    expect(validateLandingLeadPayload({ ...validPayload, language: "de" })).toEqual({
      ok: false,
      status: 400,
      message: "Lead language is invalid."
    });
  });

  it("upserts a subscriber into the configured waitlist group with Polish language context", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ data: [{ id: "123", name: "Caniello Waitlist" }] }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        })
      )
      .mockResolvedValueOnce(new Response(JSON.stringify({ data: { id: "subscriber-1" } }), { status: 200 }));

    await upsertMailerLiteSubscriber(validPayload, {
      apiKey: "test-token",
      groupName: "Caniello Waitlist",
      fetchFn: fetchMock
    });

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "https://connect.mailerlite.com/api/groups?limit=100&filter%5Bname%5D=Caniello+Waitlist",
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: "Bearer test-token" })
      })
    );

    const [, subscriberRequest] = fetchMock.mock.calls[1];
    expect(fetchMock.mock.calls[1][0]).toBe("https://connect.mailerlite.com/api/subscribers");
    expect(subscriberRequest).toMatchObject({
      method: "POST",
      headers: expect.objectContaining({ Authorization: "Bearer test-token" })
    });
    expect(JSON.parse(String(subscriberRequest.body))).toMatchObject({
      email: "owner@example.com",
      groups: ["123"],
      fields: {
        language: "PL"
      }
    });
  });

  it("maps English landing context to the MailerLite language field", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ data: [{ id: "123", name: "Caniello Waitlist" }] }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        })
      )
      .mockResolvedValueOnce(new Response(JSON.stringify({ data: { id: "subscriber-1" } }), { status: 200 }));

    await upsertMailerLiteSubscriber({ ...validPayload, language: "en" }, {
      apiKey: "test-token",
      groupName: "Caniello Waitlist",
      fetchFn: fetchMock
    });

    const [, subscriberRequest] = fetchMock.mock.calls[1];
    expect(JSON.parse(String(subscriberRequest.body))).toMatchObject({
      fields: {
        language: "EN"
      }
    });
  });

  it("fails without exposing secrets when the configured MailerLite group is missing", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(
      new Response(JSON.stringify({ data: [{ id: "999", name: "Another Group" }] }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      })
    );

    await expect(
      upsertMailerLiteSubscriber(validPayload, {
        apiKey: "test-token",
        groupName: "Caniello Waitlist",
        fetchFn: fetchMock
      })
    ).rejects.toThrow("Configured MailerLite group was not found.");

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
