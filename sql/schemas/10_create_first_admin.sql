-- 현재 로그인한 사용자를 관리자로 설정
UPDATE users
SET role = 'admin'
WHERE email = 'jaewon@ulleung.com';  -- 실제 이메일 주소로 변경해주세요

-- 관리자 권한이 제대로 설정되었는지 확인
SELECT id, email, role, created_at
FROM users
WHERE role = 'admin'; 