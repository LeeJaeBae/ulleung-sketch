-- user_roles 테이블 RLS 활성화 및 정책 설정
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제
DROP POLICY IF EXISTS "Allow auth admin to manage user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own role" ON public.user_roles;
DROP POLICY IF EXISTS "인증된 사용자는 자신의 role을 볼 수 있음" ON public.user_roles;
DROP POLICY IF EXISTS "관리자만 role을 관리할 수 있음" ON public.user_roles;

-- 새로운 정책 생성
CREATE POLICY "자신의 role 조회" 
ON public.user_roles
FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "supabase_admin이 role 관리" 
ON public.user_roles
FOR ALL TO postgres
USING (true)
WITH CHECK (true);

-- shipping_companies 테이블 RLS 활성화 및 정책 설정
ALTER TABLE public.shipping_companies ENABLE ROW LEVEL SECURITY;

-- 조회 정책
CREATE POLICY "모든 인증된 사용자가 선사 목록을 볼 수 있음" 
ON public.shipping_companies
FOR SELECT TO authenticated
USING (true);

-- 생성 정책
CREATE POLICY "관리자만 선사를 생성할 수 있음" 
ON public.shipping_companies
FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- 수정 정책
CREATE POLICY "관리자와 해당 선사의 관리자만 수정 가능" 
ON public.shipping_companies
FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND (
      role = 'admin' OR 
      (role = 'company_admin' AND company_id = shipping_companies.id)
    )
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND (
      role = 'admin' OR 
      (role = 'company_admin' AND company_id = shipping_companies.id)
    )
  )
);

-- 삭제 정책
CREATE POLICY "관리자만 선사를 삭제할 수 있음" 
ON public.shipping_companies
FOR DELETE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
); 