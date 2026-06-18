import { describe, expect, it, vi } from "vitest";
import {
  AccountAuthError,
  requestLogin,
  requestLogout,
  requestPasswordReset,
  requestSignup,
  type AccountAuthGateway,
} from "./auth";

function createGateway(
  input: { emailVerificationRequired?: boolean } = {},
): AccountAuthGateway {
  return {
    signUp: vi.fn(async () => ({
      emailVerificationRequired: input.emailVerificationRequired ?? true,
    })),
    signIn: vi.fn(async () => ({ emailVerified: true })),
    resetPassword: vi.fn(async () => undefined),
    signOut: vi.fn(async () => undefined),
  };
}

describe("account auth server actions", () => {
  it("rejects invalid signup payloads before auth calls", async () => {
    const gateway = createGateway();

    const result = await requestSignup(
      {
        fullName: "Test Owner",
        email: "bad",
        password: "short",
        language: "de",
        acceptedTerms: true,
      },
      gateway,
    );

    expect(result).toMatchObject({ ok: false, status: "invalid_payload" });
    expect(gateway.signUp).not.toHaveBeenCalled();
  });

  it("starts signup and returns the verification-required state", async () => {
    const gateway = createGateway();

    const result = await requestSignup(
      {
        fullName: "Test Owner",
        email: "owner@example.com",
        password: "correct horse battery staple",
        language: "pl",
        acceptedTerms: true,
      },
      gateway,
    );

    expect(result).toEqual({ ok: true, status: "verification_required" });
    expect(gateway.signUp).toHaveBeenCalledWith(
      expect.objectContaining({
        fullName: "Test Owner",
        email: "owner@example.com",
        language: "pl",
      }),
    );
  });

  it("returns authenticated when signup does not require email verification", async () => {
    const gateway = createGateway({ emailVerificationRequired: false });

    const result = await requestSignup(
      {
        fullName: "Test Owner",
        email: "owner@example.com",
        password: "correct horse battery staple",
        language: "pl",
        acceptedTerms: true,
      },
      gateway,
    );

    expect(result).toEqual({ ok: true, status: "authenticated" });
  });

  it("logs in, starts password reset, and signs out through the gateway", async () => {
    const gateway = createGateway();

    await expect(
      requestLogin(
        {
          email: "owner@example.com",
          password: "correct horse battery staple",
        },
        gateway,
      ),
    ).resolves.toEqual({
      ok: true,
      status: "authenticated",
    });
    await expect(
      requestPasswordReset(
        { email: "owner@example.com", language: "en" },
        gateway,
      ),
    ).resolves.toEqual({
      ok: true,
      status: "reset_requested",
    });
    await expect(requestLogout(gateway)).resolves.toEqual({
      ok: true,
      status: "signed_out",
    });
  });

  it("reports invalid credentials distinctly from unexpected auth failures", async () => {
    const gateway = createGateway();
    vi.mocked(gateway.signIn).mockRejectedValueOnce(
      new AccountAuthError("invalid_credentials"),
    );

    await expect(
      requestLogin(
        {
          email: "owner@example.com",
          password: "correct horse battery staple",
        },
        gateway,
      ),
    ).resolves.toMatchObject({
      ok: false,
      status: "invalid_credentials",
    });
  });

  it("reports unavailable auth when Supabase config is missing", async () => {
    await expect(
      requestLogin(
        {
          email: "owner@example.com",
          password: "correct horse battery staple",
        },
        null,
      ),
    ).resolves.toMatchObject({
      ok: false,
      status: "auth_unavailable",
      message: expect.stringMatching(/Supabase auth is not configured/),
    });
  });
});
