-- Owner account privacy foundation schema.
-- Adds minimal profile, consent, data export, and deletion request state for the owner MVP.

create type public.account_language as enum ('pl', 'en');
create type public.data_rights_request_status as enum ('requested', 'processing', 'completed', 'failed', 'cancelled');

create table public.account_profiles (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null unique references auth.users(id) on delete cascade,
  display_name text,
  language public.account_language not null default 'pl',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.consent_events (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  analytics_consent boolean not null,
  marketing_consent boolean,
  language public.account_language not null default 'pl',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.data_export_requests (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  status public.data_rights_request_status not null default 'requested',
  language public.account_language not null default 'pl',
  metadata jsonb not null default '{}'::jsonb,
  requested_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.account_deletion_requests (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  status public.data_rights_request_status not null default 'requested',
  language public.account_language not null default 'pl',
  metadata jsonb not null default '{}'::jsonb,
  requested_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.account_profiles enable row level security;
alter table public.consent_events enable row level security;
alter table public.data_export_requests enable row level security;
alter table public.account_deletion_requests enable row level security;

create policy "Owners can read their account profile"
  on public.account_profiles
  for select
  using (owner_user_id = auth.uid());

create policy "Owners can insert their account profile"
  on public.account_profiles
  for insert
  with check (owner_user_id = auth.uid());

create policy "Owners can update their account profile"
  on public.account_profiles
  for update
  using (owner_user_id = auth.uid())
  with check (owner_user_id = auth.uid());

create policy "Owners can read their consent events"
  on public.consent_events
  for select
  using (owner_user_id = auth.uid());

create policy "Owners can insert their consent events"
  on public.consent_events
  for insert
  with check (owner_user_id = auth.uid());

create policy "Owners can read their data export requests"
  on public.data_export_requests
  for select
  using (owner_user_id = auth.uid());

create policy "Owners can insert their data export requests"
  on public.data_export_requests
  for insert
  with check (owner_user_id = auth.uid());

create policy "Owners can read their account deletion requests"
  on public.account_deletion_requests
  for select
  using (owner_user_id = auth.uid());

create policy "Owners can insert their account deletion requests"
  on public.account_deletion_requests
  for insert
  with check (owner_user_id = auth.uid());

create or replace function public.record_account_privacy_audit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.audit_logs (actor_user_id, action, entity_type, entity_id, metadata)
  values (
    new.owner_user_id,
    tg_argv[0],
    tg_argv[1],
    new.id,
    jsonb_build_object('status', coalesce(to_jsonb(new)->>'status', 'recorded'), 'language', to_jsonb(new)->>'language')
  );

  return new;
end;
$$;

create trigger audit_account_profile_updated
after update on public.account_profiles
for each row
execute function public.record_account_privacy_audit('account.profile_updated', 'account_profile');

create trigger audit_consent_event_created
after insert on public.consent_events
for each row
execute function public.record_account_privacy_audit('account.consent_updated', 'consent_event');

create trigger audit_data_export_requested
after insert on public.data_export_requests
for each row
execute function public.record_account_privacy_audit('account.data_export_requested', 'data_export_request');

create trigger audit_account_deletion_requested
after insert on public.account_deletion_requests
for each row
execute function public.record_account_privacy_audit('account.deletion_requested', 'account_deletion_request');
