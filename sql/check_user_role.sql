-- 현재 사용자의 role 확인
SELECT 
  au.email,
  ur.role,
  ur.company_id
FROM auth.users au
LEFT JOIN public.user_roles ur ON au.id = ur.user_id
WHERE au.id = auth.uid();

-- user_roles 테이블의 전체 내용 확인
SELECT * FROM public.user_roles;

-- shipping_companies 테이블의 RLS 정책 확인
SELECT * FROM pg_policies 
WHERE tablename = 'shipping_companies'; 