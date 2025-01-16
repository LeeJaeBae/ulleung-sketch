-- JWT 훅 함수 존재 여부 확인
SELECT 
    p.proname as function_name,
    p.proargtypes,
    p.prosrc as function_definition,
    p.provolatile,
    p.proisstrict
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public' 
AND p.proname = 'custom_access_token_hook';

-- 테스트를 위한 샘플 이벤트로 함수 실행
SELECT public.custom_access_token_hook(
  jsonb_build_object(
    'user_id', auth.uid(),
    'claims', '{}'::jsonb
  )
); 