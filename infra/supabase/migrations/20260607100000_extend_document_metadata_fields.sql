alter table public.documents
  add column if not exists document_title text,
  add column if not exists document_type text not null default 'other',
  add column if not exists document_date date,
  add column if not exists provider_name text,
  add column if not exists notes text;

alter table public.documents
  drop constraint if exists documents_status_check;

alter table public.documents
  add constraint documents_status_check
  check (status in ('metadata_only', 'uploaded', 'processing', 'extracted', 'needs_review', 'confirmed', 'failed', 'archived'));

alter table public.documents
  drop constraint if exists documents_document_type_check;

alter table public.documents
  add constraint documents_document_type_check
  check (document_type in ('vaccination', 'lab_result', 'visit_summary', 'prescription', 'insurance', 'travel', 'other'));

create index if not exists documents_pet_date_idx
  on public.documents (pet_id, document_date desc, created_at desc);
