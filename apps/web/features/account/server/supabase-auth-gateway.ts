import { AccountAuthError, type AccountAuthGateway } from "./auth";

type SupabaseAuthClient = {
  auth: {
    signUp(input: { email: string; password: string; options: { data: { displayName: string; language: string; acceptedTerms: boolean } } }): Promise<{ error: Error | null }>;
    signInWithPassword(input: { email: string; password: string }): Promise<{ error: Error | null; data: { user: { email_confirmed_at?: string | null } | null } }>;
    resetPasswordForEmail(email: string): Promise<{ error: Error | null }>;
    signOut(): Promise<{ error: Error | null }>;
  };
};

export function createSupabaseAccountAuthGateway(supabase: SupabaseAuthClient): AccountAuthGateway {
  return {
    async signUp(input) {
      const { error } = await supabase.auth.signUp({
        email: input.email,
        password: input.password,
        options: { data: { displayName: input.fullName, language: input.language, acceptedTerms: input.acceptedTerms } }
      });
      if (error) throw error;
      return { emailVerificationRequired: true };
    },
    async signIn(input) {
      const { data, error } = await supabase.auth.signInWithPassword({ email: input.email, password: input.password });
      if (error) throw toAccountAuthError(error);
      return { emailVerified: Boolean(data.user?.email_confirmed_at) };
    },
    async resetPassword(input) {
      const { error } = await supabase.auth.resetPasswordForEmail(input.email);
      if (error) throw error;
    },
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    }
  };
}

function toAccountAuthError(error: Error) {
  if (/invalid login credentials/i.test(error.message)) {
    return new AccountAuthError("invalid_credentials", error.message);
  }

  return new AccountAuthError("unknown", error.message);
}
