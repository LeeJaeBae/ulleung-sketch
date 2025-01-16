-- 기존 정책들 삭제
DROP POLICY IF EXISTS "Allow auth admin to manage user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own role" ON public.user_roles;
DROP POLICY IF EXISTS "모든 인증된 사용자가 선사 목록을 볼 수 있음" ON public.shipping_companies;
DROP POLICY IF EXISTS "관리자만 선사를 생성할 수 있음" ON public.shipping_companies;
DROP POLICY IF EXISTS "관리자와 해당 선사의 관리자만 수정 가능" ON public.shipping_companies;
DROP POLICY IF EXISTS "관리자만 선사를 삭제할 수 있음" ON public.shipping_companies;

-- 기존 트리거 삭제
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS set_updated_at ON public.user_roles;

-- 기존 함수들 삭제
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.set_updated_at();
DROP FUNCTION IF EXISTS public.custom_access_token_hook(jsonb);

-- 기존 테이블 삭제
DROP TABLE IF EXISTS public.user_roles;

-- 기존 타입 삭제
DROP TYPE IF EXISTS public.app_role; 