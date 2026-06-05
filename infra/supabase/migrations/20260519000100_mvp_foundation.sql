-- Caniello MVP foundation schema.
-- This migration creates the minimal private owner data model required before auth,
-- pet profiles, document upload, timeline, reminders, sharing, and audit work begin.

create extension if not exists "pgcrypto";

create table public.households (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null unique references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.pets (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  name text not null,
  species text,
  breed text,
  birth_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  pet_id uuid not null references public.pets(id) on delete cascade,
  storage_bucket text not null,
  storage_path text not null,
  original_filename text,
  mime_type text,
  status text not null default 'uploaded' check (status in ('uploaded', 'processing', 'extracted', 'needs_review', 'confirmed', 'failed', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.document_processing_jobs (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents(id) on delete cascade,
  status text not null default 'queued' check (status in ('queued', 'processing', 'succeeded', 'failed', 'retrying')),
  attempts integer not null default 0 check (attempts >= 0),
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.extracted_fields (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents(id) on delete cascade,
  field_name text not null,
  field_value text,
  confidence numeric(5, 4) check (confidence is null or (confidence >= 0 and confidence <= 1)),
  confirmed_value text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.timeline_events (
  id uuid primary key default gen_random_uuid(),
  pet_id uuid not null references public.pets(id) on delete cascade,
  source_document_id uuid references public.documents(id) on delete set null,
  event_type text not null,
  event_date date not null,
  title text not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.reminders (
  id uuid primary key default gen_random_uuid(),
  pet_id uuid not null references public.pets(id) on delete cascade,
  source_document_id uuid references public.documents(id) on delete set null,
  title text not null,
  due_date date not null,
  status text not null default 'suggested' check (status in ('suggested', 'active', 'completed', 'dismissed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.share_links (
  id uuid primary key default gen_random_uuid(),
  pet_id uuid not null references public.pets(id) on delete cascade,
  token_hash text not null unique,
  revoked_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.households enable row level security;
alter table public.pets enable row level security;
alter table public.documents enable row level security;
alter table public.document_processing_jobs enable row level security;
alter table public.extracted_fields enable row level security;
alter table public.timeline_events enable row level security;
alter table public.reminders enable row level security;
alter table public.share_links enable row level security;
alter table public.audit_logs enable row level security;

create policy "Owners can manage their households"
  on public.households
  for all
  using (owner_user_id = auth.uid())
  with check (owner_user_id = auth.uid());

create policy "Owners can manage pets in their households"
  on public.pets
  for all
  using (exists (
    select 1 from public.households
    where households.id = pets.household_id
      and households.owner_user_id = auth.uid()
  ))
  with check (exists (
    select 1 from public.households
    where households.id = pets.household_id
      and households.owner_user_id = auth.uid()
  ));

create policy "Owners can manage documents for their pets"
  on public.documents
  for all
  using (exists (
    select 1
    from public.pets
    join public.households on households.id = pets.household_id
    where pets.id = documents.pet_id
      and households.owner_user_id = auth.uid()
  ))
  with check (exists (
    select 1
    from public.pets
    join public.households on households.id = pets.household_id
    where pets.id = documents.pet_id
      and households.owner_user_id = auth.uid()
  ));

create policy "Owners can read processing jobs for their documents"
  on public.document_processing_jobs
  for select
  using (exists (
    select 1
    from public.documents
    join public.pets on pets.id = documents.pet_id
    join public.households on households.id = pets.household_id
    where documents.id = document_processing_jobs.document_id
      and households.owner_user_id = auth.uid()
  ));

create policy "Owners can manage extracted fields for their documents"
  on public.extracted_fields
  for all
  using (exists (
    select 1
    from public.documents
    join public.pets on pets.id = documents.pet_id
    join public.households on households.id = pets.household_id
    where documents.id = extracted_fields.document_id
      and households.owner_user_id = auth.uid()
  ))
  with check (exists (
    select 1
    from public.documents
    join public.pets on pets.id = documents.pet_id
    join public.households on households.id = pets.household_id
    where documents.id = extracted_fields.document_id
      and households.owner_user_id = auth.uid()
  ));

create policy "Owners can manage timeline events for their pets"
  on public.timeline_events
  for all
  using (exists (
    select 1
    from public.pets
    join public.households on households.id = pets.household_id
    where pets.id = timeline_events.pet_id
      and households.owner_user_id = auth.uid()
  ))
  with check (exists (
    select 1
    from public.pets
    join public.households on households.id = pets.household_id
    where pets.id = timeline_events.pet_id
      and households.owner_user_id = auth.uid()
  ));

create policy "Owners can manage reminders for their pets"
  on public.reminders
  for all
  using (exists (
    select 1
    from public.pets
    join public.households on households.id = pets.household_id
    where pets.id = reminders.pet_id
      and households.owner_user_id = auth.uid()
  ))
  with check (exists (
    select 1
    from public.pets
    join public.households on households.id = pets.household_id
    where pets.id = reminders.pet_id
      and households.owner_user_id = auth.uid()
  ));

create policy "Owners can manage share links for their pets"
  on public.share_links
  for all
  using (exists (
    select 1
    from public.pets
    join public.households on households.id = pets.household_id
    where pets.id = share_links.pet_id
      and households.owner_user_id = auth.uid()
  ))
  with check (exists (
    select 1
    from public.pets
    join public.households on households.id = pets.household_id
    where pets.id = share_links.pet_id
      and households.owner_user_id = auth.uid()
  ));

create policy "Owners can read their own audit logs"
  on public.audit_logs
  for select
  using (actor_user_id = auth.uid());
