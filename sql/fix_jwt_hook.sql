-- 기존 함수 삭제
DROP FUNCTION IF EXISTS public.custom_access_token_hook(jsonb);

-- JWT 훅 함수 다시 생성
CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER -- 중요: 함수가 생성자의 권한으로 실행되도록 함
SET search_path = public
STABLE
AS $$
DECLARE
  claims jsonb;
  user_data record;
BEGIN
  -- 디버깅을 위한 로그
  RAISE LOG 'JWT Hook 실행: user_id = %', event->>'user_id';
  
  -- 사용자 역할과 소속 선사 정보 가져오기
  SELECT 
    ur.role,
    ur.company_id,
    sc.name as company_name
  INTO user_data
  FROM public.user_roles ur
  LEFT JOIN public.shipping_companies sc ON ur.company_id = sc.id
  WHERE ur.user_id = (event->>'user_id')::uuid;

  -- 디버깅을 위한 로그
  RAISE LOG 'Found user data: role = %, company_id = %', user_data.role, user_data.company_id;

  claims := event->'claims';

  -- 클레임에 역할 정보 추가
  IF user_data.role IS NOT NULL THEN
    claims := jsonb_set(claims, '{user_role}', to_jsonb(user_data.role));
    
    -- 선사 관리자나 직원인 경우 소속 선사 정보도 추가
    IF user_data.company_id IS NOT NULL THEN
      claims := jsonb_set(claims, '{company_id}', to_jsonb(user_data.company_id));
      claims := jsonb_set(claims, '{company_name}', to_jsonb(user_data.company_name));
    END IF;
  ELSE
    claims := jsonb_set(claims, '{user_role}', '"guest"');
  END IF;

  -- 디버깅을 위한 로그
  RAISE LOG 'Final claims = %', claims;

  -- 수정된 클레임으로 이벤트 업데이트
  return jsonb_set(event, '{claims}', claims);
END;
$$;

-- 필요한 권한 설정
GRANT USAGE ON SCHEMA public TO supabase_auth_admin;
GRANT EXECUTE ON FUNCTION public.custom_access_token_hook TO supabase_auth_admin;

-- 일반 사용자 권한 제한
REVOKE EXECUTE ON FUNCTION public.custom_access_token_hook FROM authenticated, anon, public;

-- 테스트를 위해 현재 사용자를 admin으로 설정
UPDATE public.user_roles
SET role = 'admin'
WHERE user_id = auth.uid(); 