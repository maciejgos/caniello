alter table public.pets
  add column sex_or_gender text,
  add column weight_kg numeric(6, 2),
  add column microchip_number text,
  add column allergies text,
  add column medication text,
  add column important_notes text;

alter table public.pets
  add constraint pets_weight_kg_range
  check (weight_kg is null or (weight_kg >= 0 and weight_kg <= 250));

create index pets_household_created_at_idx
  on public.pets (household_id, created_at);
