-- JWT 토큰 커스텀 클레임 추가 함수
CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  claims jsonb;
  user_data record;
BEGIN
  -- 사용자 역할과 소속 선사 정보 가져오기
  SELECT 
    ur.role,
    ur.company_id,
    sc.name as company_name
  INTO user_data
  FROM public.user_roles ur
  LEFT JOIN public.shipping_companies sc ON ur.company_id = sc.id
  WHERE ur.user_id = (event->>'user_id')::uuid;

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

  -- 수정된 클레임으로 이벤트 업데이트
  return jsonb_set(event, '{claims}', claims);
END;
$$;

-- 필요한 권한 설정
GRANT USAGE ON SCHEMA public TO supabase_auth_admin;
GRANT EXECUTE ON FUNCTION public.custom_access_token_hook TO supabase_auth_admin;
GRANT ALL ON TABLE public.user_roles TO supabase_auth_admin;

-- 일반 사용자 권한 제한
REVOKE EXECUTE ON FUNCTION public.custom_access_token_hook FROM authenticated, anon, public;
REVOKE ALL ON TABLE public.user_roles FROM authenticated, anon, public; 