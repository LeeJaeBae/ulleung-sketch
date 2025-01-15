-- 관리자 로그 테이블 생성
create table if not exists admin_logs (
  id uuid default gen_random_uuid() primary key,
  admin_id uuid references auth.users(id) not null,
  target_user_id uuid references auth.users(id) not null,
  action varchar not null,
  old_value jsonb,
  new_value jsonb,
  created_at timestamp with time zone default now() not null
);

comment on table admin_logs is '관리자 작업 로그';
comment on column admin_logs.admin_id is '작업을 수행한 관리자 ID';
comment on column admin_logs.target_user_id is '작업 대상 사용자 ID';
comment on column admin_logs.action is '수행된 작업 (예: role_update)';
comment on column admin_logs.old_value is '변경 전 값';
comment on column admin_logs.new_value is '변경 후 값';

-- RLS 활성화
alter table admin_logs enable row level security;

-- RLS 정책 설정
-- 1. 관리자만 로그를 조회할 수 있음
create policy "관리자만 로그 조회 가능" on admin_logs
  for select
  to authenticated
  using (
    exists (
      select 1 from users
      where users.id = auth.uid()
      and users.role = 'admin'
    )
  );

-- 2. 관리자만 로그를 생성할 수 있음
create policy "관리자만 로그 생성 가능" on admin_logs
  for insert
  to authenticated
  with check (
    exists (
      select 1 from users
      where users.id = auth.uid()
      and users.role = 'admin'
    )
  ); 