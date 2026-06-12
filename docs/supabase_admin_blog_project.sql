-- Madhavam Realty Supabase setup
-- Paste only SQL into Supabase SQL Editor. Do not paste markdown text.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Profiles: one row per auth.users user, used to identify admin/agent users.
-- ---------------------------------------------------------------------------

create table if not exists public.profiles (
  id uuid not null,
  email text null,
  role text null default 'admin'::text,
  updated_at timestamp with time zone not null default timezone('utc'::text, now()),
  constraint profiles_pkey primary key (id),
  constraint profiles_id_fkey foreign key (id) references auth.users (id) on delete cascade,
  constraint profiles_role_check check (role = any (array['admin'::text, 'agent'::text]))
);

alter table public.profiles enable row level security;

drop policy if exists "Authenticated users can read profiles" on public.profiles;
create policy "Authenticated users can read profiles"
  on public.profiles
  for select
  to authenticated
  using (true);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

-- Replace the id/email with your real Supabase Authentication user.
insert into public.profiles (id, email, role, updated_at)
values (
  'f54387e6-7dd8-4721-9514-f6a8d01bf851',
  'admin@madhavam.com',
  'admin',
  now()
)
on conflict (id) do update
set
  email = excluded.email,
  role = 'admin',
  updated_at = now();

-- ---------------------------------------------------------------------------
-- Projects: exact schema used by the admin project form.
-- ---------------------------------------------------------------------------

create table if not exists public.projects (
  id uuid not null default gen_random_uuid(),
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  title text not null,
  tag text not null,
  image_url text not null,
  location text not null,
  type text not null,
  featured boolean null default false,
  constraint projects_pkey primary key (id),
  constraint projects_type_check check (
    type = any (
      array[
        'Residential'::text,
        'Commercial'::text,
        'Land'::text,
        'Leasing'::text
      ]
    )
  )
);

alter table public.projects enable row level security;

drop policy if exists "Public can read projects" on public.projects;
create policy "Public can read projects"
  on public.projects
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins can insert projects" on public.projects;
create policy "Admins can insert projects"
  on public.projects
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "Admins can update projects" on public.projects;
create policy "Admins can update projects"
  on public.projects
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can delete projects" on public.projects;
create policy "Admins can delete projects"
  on public.projects
  for delete
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Leads: exact schema used by admin lead management.
-- ---------------------------------------------------------------------------

create table if not exists public.leads (
  id uuid not null default gen_random_uuid(),
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  name text not null,
  email text not null,
  phone text not null,
  interest text not null,
  status text null default 'new'::text,
  notes text null,
  constraint leads_pkey primary key (id),
  constraint leads_status_check check (
    status = any (
      array[
        'new'::text,
        'contacted'::text,
        'qualified'::text,
        'lost'::text,
        'closed'::text
      ]
    )
  )
);

alter table public.leads enable row level security;

drop policy if exists "Anyone can insert leads" on public.leads;
create policy "Anyone can insert leads"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins can read leads" on public.leads;
create policy "Admins can read leads"
  on public.leads
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "Admins can update leads" on public.leads;
create policy "Admins can update leads"
  on public.leads
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can delete leads" on public.leads;
create policy "Admins can delete leads"
  on public.leads
  for delete
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Blogs: exact schema used by the admin blog form.
-- ---------------------------------------------------------------------------

create table if not exists public.blogs (
  id uuid not null default gen_random_uuid(),
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  title text not null,
  slug text not null,
  excerpt text not null,
  content text not null,
  author text null default 'Admin'::text,
  image text not null,
  tags text[] null default array[]::text[],
  published_at timestamp with time zone not null default timezone('utc'::text, now()),
  constraint blogs_pkey primary key (id),
  constraint blogs_slug_key unique (slug)
);

alter table public.blogs enable row level security;

drop policy if exists "Public can read blogs" on public.blogs;
create policy "Public can read blogs"
  on public.blogs
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins can insert blogs" on public.blogs;
create policy "Admins can insert blogs"
  on public.blogs
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "Admins can update blogs" on public.blogs;
create policy "Admins can update blogs"
  on public.blogs
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can delete blogs" on public.blogs;
create policy "Admins can delete blogs"
  on public.blogs
  for delete
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Storage buckets: admin upload forms require public image buckets.
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values
  ('project-images', 'project-images', true),
  ('blog-images', 'blog-images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can read project images" on storage.objects;
create policy "Public can read project images"
  on storage.objects
  for select
  to public
  using (bucket_id = 'project-images');

drop policy if exists "Admins can upload project images" on storage.objects;
create policy "Admins can upload project images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "Admins can update project images" on storage.objects;
create policy "Admins can update project images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'project-images' and public.is_admin())
  with check (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "Admins can delete project images" on storage.objects;
create policy "Admins can delete project images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "Public can read blog images" on storage.objects;
create policy "Public can read blog images"
  on storage.objects
  for select
  to public
  using (bucket_id = 'blog-images');

drop policy if exists "Admins can upload blog images" on storage.objects;
create policy "Admins can upload blog images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'blog-images' and public.is_admin());

drop policy if exists "Admins can update blog images" on storage.objects;
create policy "Admins can update blog images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'blog-images' and public.is_admin())
  with check (bucket_id = 'blog-images' and public.is_admin());

drop policy if exists "Admins can delete blog images" on storage.objects;
create policy "Admins can delete blog images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'blog-images' and public.is_admin());
