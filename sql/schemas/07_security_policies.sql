-- users 테이블 생성
create table if not exists users (
  id uuid references auth.users(id) primary key,
  email text not null,
  role text not null default 'user' check (role in ('admin', 'user')),
  created_at timestamp with time zone default now() not null
);

comment on table users is '사용자 정보';
comment on column users.id is '사용자 ID (auth.users 참조)';
comment on column users.email is '사용자 이메일';
comment on column users.role is '사용자 역할 (admin 또는 user)';

-- RLS 활성화
alter table users enable row level security;

-- 기존 정책 삭제
drop policy if exists "사용자는 자신의 정보를 볼 수 있음" on users;
drop policy if exists "관리자는 모든 사용자 정보를 볼 수 있음" on users;
drop policy if exists "관리자만 사용자 정보 수정 가능" on users;

-- 새로운 통합 정책 생성
create policy "users_policy" on users
  for all
  to authenticated
  using (
    -- 자신의 정보는 볼 수 있음
    auth.uid() = id
    -- 또는 role이 admin인 경우 모든 작업 가능
    or role = 'admin'
  );

-- 새로운 사용자 생성 시 자동으로 users 테이블에 추가
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user(); 