export type SupabaseClientConfig = {
  url: string;
  anonKey: string;
};

export function readSupabaseClientConfig(env: Record<string, string | undefined> = process.env): SupabaseClientConfig | null {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return { url, anonKey };
}

