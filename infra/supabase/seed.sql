-- Local-only demo data for the Caniello Supabase stack.
-- These credentials are documented in README.md and must not be used outside local development.

insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
)
values (
  '00000000-0000-0000-0000-000000000000',
  '11111111-1111-4111-8111-111111111111',
  'authenticated',
  'authenticated',
  'akowalska@example.com',
  crypt('CanielloDemo123!', gen_salt('bf')),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"acceptedTerms":true,"language":"pl","full_name":"Anna Kowalska"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
)
on conflict (id) do update
set
  email = excluded.email,
  encrypted_password = excluded.encrypted_password,
  email_confirmed_at = excluded.email_confirmed_at,
  raw_app_meta_data = excluded.raw_app_meta_data,
  raw_user_meta_data = excluded.raw_user_meta_data,
  updated_at = now();

insert into auth.identities (
  id,
  provider_id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
)
values (
  '22222222-2222-4222-8222-222222222222',
  '11111111-1111-4111-8111-111111111111',
  '11111111-1111-4111-8111-111111111111',
  '{"sub":"11111111-1111-4111-8111-111111111111","email":"akowalska@example.com","email_verified":true,"phone_verified":false,"full_name":"Anna Kowalska"}'::jsonb,
  'email',
  now(),
  now(),
  now()
)
on conflict (provider_id, provider) do update
set
  identity_data = excluded.identity_data,
  updated_at = now();

insert into public.account_profiles (
  owner_user_id,
  display_name,
  language
)
values (
  '11111111-1111-4111-8111-111111111111',
  'Anna Kowalska',
  'pl'
)
on conflict (owner_user_id) do update
set
  display_name = excluded.display_name,
  language = excluded.language,
  updated_at = now();

insert into public.households (
  id,
  owner_user_id,
  name
)
values (
  '33333333-3333-4333-8333-333333333333',
  '11111111-1111-4111-8111-111111111111',
  'Demo household'
)
on conflict (id) do update
set
  name = excluded.name,
  updated_at = now();

insert into public.pets (
  id,
  household_id,
  name,
  species,
  breed,
  birth_date,
  sex_or_gender,
  weight_kg,
  microchip_number,
  allergies,
  medication,
  important_notes
)
values (
  '44444444-4444-4444-8444-444444444444',
  '33333333-3333-4333-8333-333333333333',
  'Bruno',
  'dog',
  'mixed breed',
  '2021-05-01',
  'male',
  26.40,
  '616093900000000',
  'None saved',
  'OmegaVet supplement',
  'Prefers quiet handling during clinic visits.'
)
on conflict (id) do update
set
  name = excluded.name,
  species = excluded.species,
  breed = excluded.breed,
  birth_date = excluded.birth_date,
  sex_or_gender = excluded.sex_or_gender,
  weight_kg = excluded.weight_kg,
  microchip_number = excluded.microchip_number,
  allergies = excluded.allergies,
  medication = excluded.medication,
  important_notes = excluded.important_notes,
  updated_at = now();
