alter table public.reminders
  add column due_time time,
  add column repeat_frequency text not null default 'none'
    constraint reminders_repeat_frequency_check
    check (repeat_frequency in ('none', 'weekly', 'monthly', 'yearly')),
  add column advance_notice_days integer not null default 0
    constraint reminders_advance_notice_days_check
    check (advance_notice_days in (0, 1, 2, 7));

create or replace function public.record_reminder_audit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  owner_id uuid;
  audit_action text;
begin
  select households.owner_user_id
    into owner_id
  from public.pets
  join public.households on households.id = pets.household_id
  where pets.id = new.pet_id;

  if owner_id is null or auth.uid() is distinct from owner_id then
    return new;
  end if;

  audit_action := case
    when tg_op = 'INSERT' then 'reminder.created'
    when old.status is distinct from new.status and new.status = 'completed'
      then 'reminder.completed'
    else 'reminder.updated'
  end;

  insert into public.audit_logs (
    actor_user_id,
    action,
    entity_type,
    entity_id,
    metadata
  )
  values (
    owner_id,
    audit_action,
    'reminder',
    new.id,
    jsonb_build_object('status', new.status)
  );

  return new;
end;
$$;

create trigger audit_reminder_created
after insert on public.reminders
for each row
execute function public.record_reminder_audit();

create trigger audit_reminder_updated
after update on public.reminders
for each row
execute function public.record_reminder_audit();
