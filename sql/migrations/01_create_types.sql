-- 사용자 역할 ENUM 타입 생성
CREATE TYPE public.app_role AS ENUM (
  'admin',           -- 시스템 관리자
  'company_admin',   -- 선사 관리자
  'staff',          -- 일반 직원
  'guest'           -- 게스트
); 