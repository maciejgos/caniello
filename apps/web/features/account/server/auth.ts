import {
  accountLoginPayloadSchema,
  accountSignupPayloadSchema,
  passwordResetRequestPayloadSchema,
  type AccountLoginPayload,
  type AccountSignupPayload,
  type PasswordResetRequestPayload
} from "@caniello/contracts";

export type AccountAuthGateway = {
  signUp(input: AccountSignupPayload): Promise<{ emailVerificationRequired: boolean }>;
  signIn(input: AccountLoginPayload): Promise<{ emailVerified: boolean }>;
  resetPassword(input: PasswordResetRequestPayload): Promise<void>;
  signOut(): Promise<void>;
};

export class AccountAuthError extends Error {
  constructor(
    readonly reason: "invalid_credentials" | "unknown",
    message = "Account auth request failed."
  ) {
    super(message);
    this.name = "AccountAuthError";
  }
}

export type AccountActionResult =
  | { ok: true; status: "verification_required" | "authenticated" | "reset_requested" | "signed_out" }
  | { ok: false; status: "invalid_payload" | "auth_unavailable" | "invalid_credentials" | "auth_failed"; message: string; issues?: unknown };

export async function requestSignup(payload: unknown, gateway: AccountAuthGateway | null): Promise<AccountActionResult> {
  const parsed = accountSignupPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    return { ok: false, status: "invalid_payload", message: "Account request payload is invalid.", issues: parsed.error.flatten() };
  }
  if (!gateway) {
    return { ok: false, status: "auth_unavailable", message: "Supabase auth is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY for the web app." };
  }

  try {
    await gateway.signUp(parsed.data);
    return { ok: true, status: "verification_required" };
  } catch {
    return { ok: false, status: "auth_failed", message: "Supabase auth request failed." };
  }
}

export async function requestLogin(payload: unknown, gateway: AccountAuthGateway | null): Promise<AccountActionResult> {
  const parsed = accountLoginPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    return { ok: false, status: "invalid_payload", message: "Account request payload is invalid.", issues: parsed.error.flatten() };
  }
  if (!gateway) {
    return { ok: false, status: "auth_unavailable", message: "Supabase auth is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY for the web app." };
  }

  try {
    await gateway.signIn(parsed.data);
    return { ok: true, status: "authenticated" };
  } catch (error) {
    if (error instanceof AccountAuthError && error.reason === "invalid_credentials") {
      return { ok: false, status: "invalid_credentials", message: "Email or password is incorrect." };
    }
    return { ok: false, status: "auth_failed", message: "Supabase auth request failed." };
  }
}

export async function requestPasswordReset(payload: unknown, gateway: AccountAuthGateway | null): Promise<AccountActionResult> {
  const parsed = passwordResetRequestPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    return { ok: false, status: "invalid_payload", message: "Account request payload is invalid.", issues: parsed.error.flatten() };
  }
  if (!gateway) {
    return { ok: false, status: "auth_unavailable", message: "Supabase auth is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY for the web app." };
  }

  try {
    await gateway.resetPassword(parsed.data);
    return { ok: true, status: "reset_requested" };
  } catch {
    return { ok: false, status: "auth_failed", message: "Supabase auth request failed." };
  }
}

export async function requestLogout(gateway: Pick<AccountAuthGateway, "signOut"> | null): Promise<AccountActionResult> {
  if (!gateway) {
    return { ok: false, status: "auth_unavailable", message: "Supabase auth is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY for the web app." };
  }

  try {
    await gateway.signOut();
    return { ok: true, status: "signed_out" };
  } catch {
    return { ok: false, status: "auth_failed", message: "Supabase auth request failed." };
  }
}
