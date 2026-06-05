alter table public.households
  add constraint households_owner_user_id_unique
  unique (owner_user_id);
