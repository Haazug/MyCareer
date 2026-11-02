-- MyCareer: uma cópia JSON por conta autenticada.
-- Executar uma vez no Supabase Dashboard > SQL Editor > New query.

create table if not exists public.career_saves (
  user_id uuid primary key references auth.users (id) on delete cascade,
  save_data jsonb not null default '{"version":1,"activeId":"","careers":[]}'::jsonb
    check (jsonb_typeof(save_data) = 'object'),
  updated_at timestamptz not null default now()
);

alter table public.career_saves enable row level security;

revoke all on table public.career_saves from public, anon;
grant select, insert, update, delete on table public.career_saves to authenticated;

drop policy if exists "career_saves_read_own" on public.career_saves;
create policy "career_saves_read_own"
  on public.career_saves for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "career_saves_insert_own" on public.career_saves;
create policy "career_saves_insert_own"
  on public.career_saves for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "career_saves_update_own" on public.career_saves;
create policy "career_saves_update_own"
  on public.career_saves for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "career_saves_delete_own" on public.career_saves;
create policy "career_saves_delete_own"
  on public.career_saves for delete to authenticated
  using ((select auth.uid()) = user_id);
