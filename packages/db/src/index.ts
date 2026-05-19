export type SupabaseClientConfig = {
  url: string;
  anonKey: string;
};

export type SupabaseServiceRoleConfig = {
  url: string;
  serviceRoleKey: string;
};

function readRequiredEnvValue(env: Record<string, string | undefined>, key: string): string | null {
  const value = env[key]?.trim();
  return value ? value : null;
}

function normalizeSupabaseUrl(value: string): string | null {
  try {
    const parsed = new URL(value);
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

export function readSupabaseClientConfig(env: Record<string, string | undefined> = process.env): SupabaseClientConfig | null {
  const rawUrl = readRequiredEnvValue(env, "NEXT_PUBLIC_SUPABASE_URL");
  const anonKey = readRequiredEnvValue(env, "NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (!rawUrl || !anonKey) {
    return null;
  }

  const url = normalizeSupabaseUrl(rawUrl);
  if (!url) {
    return null;
  }

  return { url, anonKey };
}

export function readSupabaseServiceRoleConfig(
  env: Record<string, string | undefined> = process.env
): SupabaseServiceRoleConfig | null {
  const rawUrl = readRequiredEnvValue(env, "NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = readRequiredEnvValue(env, "SUPABASE_SERVICE_ROLE_KEY");

  if (!rawUrl || !serviceRoleKey) {
    return null;
  }

  const url = normalizeSupabaseUrl(rawUrl);
  if (!url) {
    return null;
  }

  return { url, serviceRoleKey };
}

export function buildSupabaseRestUrl(config: Pick<SupabaseClientConfig, "url">): string {
  return `${config.url}/rest/v1`;
}

export function buildSupabaseStorageUrl(config: Pick<SupabaseClientConfig, "url">): string {
  return `${config.url}/storage/v1`;
}
