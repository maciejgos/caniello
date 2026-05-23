-- Create app account profiles automatically for Supabase Auth users.
-- This keeps public.account_profiles in sync even when auth users are created
-- by another client or after a later mobile app reuses the same auth project.

create or replace function public.create_account_profile_for_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  profile_language public.account_language := 'pl';
begin
  if new.raw_user_meta_data ? 'language'
    and new.raw_user_meta_data->>'language' in ('pl', 'en') then
    profile_language := (new.raw_user_meta_data->>'language')::public.account_language;
  end if;

  insert into public.account_profiles (owner_user_id, display_name, language)
  values (
    new.id,
    nullif(btrim(coalesce(new.raw_user_meta_data->>'displayName', new.raw_user_meta_data->>'fullName', '')), ''),
    profile_language
  )
  on conflict (owner_user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists create_account_profile_after_auth_signup on auth.users;

create trigger create_account_profile_after_auth_signup
after insert on auth.users
for each row
execute function public.create_account_profile_for_auth_user();

insert into public.account_profiles (owner_user_id, display_name, language)
select
  users.id,
  nullif(btrim(coalesce(users.raw_user_meta_data->>'displayName', users.raw_user_meta_data->>'fullName', '')), ''),
  case
    when users.raw_user_meta_data ? 'language'
      and users.raw_user_meta_data->>'language' in ('pl', 'en')
      then (users.raw_user_meta_data->>'language')::public.account_language
    else 'pl'::public.account_language
  end
from auth.users
left join public.account_profiles on account_profiles.owner_user_id = users.id
where account_profiles.id is null;
