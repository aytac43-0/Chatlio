-- Chatlio SQL schema for Supabase

-- Enable pgcrypto for uuid generation
create extension if not exists "pgcrypto";

-- profiles table
create table if not exists profiles (
  id uuid primary key,
  email text not null,
  full_name text,
  username text not null,
  role text default 'user',
  created_at timestamptz default now()
);

-- customers
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references profiles(id) on delete cascade,
  name text,
  phone text,
  email text,
  notes text,
  created_at timestamptz default now()
);

-- tags
create table if not exists customer_tags (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references profiles(id) on delete cascade,
  name text not null
);

create table if not exists customer_tag_rel (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete cascade,
  tag_id uuid references customer_tags(id) on delete cascade
);

-- sales_pipeline
create table if not exists sales_pipeline (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references profiles(id) on delete cascade,
  customer_id uuid references customers(id) on delete cascade,
  title text,
  amount numeric,
  status text default 'new',
  updated_at timestamptz default now()
);

-- reminders
create table if not exists reminders (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references profiles(id) on delete cascade,
  customer_id uuid references customers(id),
  note text,
  due_at timestamptz,
  done boolean default false,
  created_at timestamptz default now()
);

-- Row-level security: enable and policies

alter table profiles enable row level security;
create policy select_own_profiles on profiles for select using (auth.uid() = id);
create policy insert_profiles on profiles for insert using (auth.role() = 'authenticated') with check (auth.uid() = id);
create policy update_own_profiles on profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy delete_own_profiles on profiles for delete using (auth.uid() = id);

-- Trigger: create a profiles row when a new auth user is created
create function if not exists public.handle_auth_user_created() returns trigger language plpgsql as $$
begin
  -- Insert profile row matching auth.users id; do nothing if exists
  if not exists (select 1 from public.profiles where id = new.id) then
    insert into public.profiles(id, email, full_name, username, role, created_at)
    values (new.id, new.email, new.raw_user_meta->>'full_name', new.raw_user_meta->>'username', 'user', now());
  end if;
  return new;
end;
$$;

-- Attach trigger to auth.users (Supabase auth schema)
drop trigger if exists auth_users_insert on auth.users;
create trigger auth_users_insert
after insert on auth.users
for each row
execute function public.handle_auth_user_created();

alter table customers enable row level security;
create policy customers_owner_select on customers for select using (owner_id = auth.uid());
create policy customers_owner_modify on customers for insert, update, delete using (owner_id = auth.uid()) with check (owner_id = auth.uid());

alter table customer_tags enable row level security;
create policy tags_owner_select on customer_tags for select using (owner_id = auth.uid());
create policy tags_owner_modify on customer_tags for insert, update, delete using (owner_id = auth.uid()) with check (owner_id = auth.uid());

alter table customer_tag_rel enable row level security;
create policy tag_rel_owner_select on customer_tag_rel for select using (exists(select 1 from customers c where c.id = customer_tag_rel.customer_id and c.owner_id = auth.uid()));
create policy tag_rel_owner_modify on customer_tag_rel for insert, update, delete using (exists(select 1 from customers c where c.id = customer_tag_rel.customer_id and c.owner_id = auth.uid()));

alter table sales_pipeline enable row level security;
create policy pipeline_owner_select on sales_pipeline for select using (owner_id = auth.uid());
create policy pipeline_owner_modify on sales_pipeline for insert, update, delete using (owner_id = auth.uid()) with check (owner_id = auth.uid());

alter table reminders enable row level security;
create policy reminders_owner_select on reminders for select using (owner_id = auth.uid());
create policy reminders_owner_modify on reminders for insert, update, delete using (owner_id = auth.uid()) with check (owner_id = auth.uid());

-- Unique username case-insensitive
create unique index if not exists profiles_username_lower_idx on profiles((lower(username)));
