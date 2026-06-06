alter table public.reminders
  add column reminder_type text not null default 'visit'
    constraint reminders_reminder_type_check
    check (reminder_type in ('vaccination', 'medication', 'deworming', 'visit', 'other')),
  add column notes text;

create index if not exists reminders_pet_due_date_idx
  on public.reminders (pet_id, due_date);
