create table if not exists public.email_leads (
  id bigint generated always as identity primary key,
  email text not null,
  placement text not null default 'unknown',
  landing_path text not null default '/',
  referrer text not null default 'direct',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  gclid text,
  created_at timestamptz not null default now(),
  constraint email_leads_email_length check (char_length(email) between 3 and 320)
);

create index if not exists email_leads_created_at_idx
  on public.email_leads (created_at desc);

comment on table public.email_leads is
  'First-party workspace-guide email leads captured on muzeoffice.com.';

revoke all on table public.email_leads from public;
