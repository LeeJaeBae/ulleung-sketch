# SQL 마이그레이션

이 디렉토리는 데이터베이스 스키마와 정책을 설정하는 SQL 파일들을 포함합니다.

## 파일 구조

- `migrations/`
  - `00_create_functions.sql` - 유틸리티 함수 생성 (타임스탬프 갱신 등)
  - `01_create_types.sql` - 사용자 역할 ENUM 타입 생성
  - `02_create_user_roles.sql` - 사용자 역할 테이블 생성
  - `03_create_auth_hook.sql` - JWT 토큰 커스텀 클레임 추가 함수
  - `04_create_rls_policies.sql` - RLS 정책 설정

## 적용 순서

1. Supabase Studio의 SQL 편집기에서 각 파일의 내용을 순서대로 실행하세요.
2. 실행 후 각 정책이 제대로 적용되었는지 확인하세요.

## 주의사항

- `custom_access_token_hook` 함수를 생성한 후, Supabase 대시보드의 Authentication > Hooks에서 이 함수를 JWT 토큰 생성 훅으로 설정해야 합니다.
- RLS 정책을 변경할 때는 기존 정책을 먼저 삭제하고 새로운 정책을 생성하는 것이 안전합니다.

## 정책 설명

### 사용자 역할

- `admin`: 시스템 관리자 (모든 권한)
- `company_admin`: 선사 관리자 (자사 정보 관리)
- `staff`: 일반 직원 (조회 권한)
- `guest`: 게스트 (제한된 조회 권한)

### RLS 정책

- 모든 인증된 사용자는 선사 목록을 조회할 수 있습니다.
- 시스템 관리자만 새로운 선사를 등록할 수 있습니다.
- 시스템 관리자와 해당 선사의 관리자만 선사 정보를 수정할 수 있습니다.
- 시스템 관리자만 선사를 삭제할 수 있습니다.
