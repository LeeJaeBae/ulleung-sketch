## 울릉스케치 개발 히스토리

### 2024-03-26

#### 프로젝트 초기 설정 및 기본 기능 구현

- 프로젝트 기본 구조 설정

  - Next.js 14 프로젝트 생성
  - TypeScript 설정
  - Material UI 통합
  - 기본 디렉토리 구조 구성
    - `src/app`: Next.js 14 App Router 구조
    - `src/components`: 공통 컴포넌트
    - `src/contexts`: React Context
    - `src/hooks`: Custom Hooks
    - `src/layouts`: 레이아웃 컴포넌트
    - `src/lib`: 유틸리티 함수
    - `src/locales`: 다국어 지원
    - `src/sections`: 페이지별 컴포넌트
    - `src/theme`: Material UI 테마
    - `src/types`: TypeScript 타입 정의

- Supabase 설정 및 연동

  - Supabase 프로젝트 생성
  - 데이터베이스 스키마 설계
    - users: 사용자 정보 테이블
    - ships: 선박 정보 테이블
    - accommodations: 숙소 정보 테이블
    - bookings: 예약 정보 테이블
    - packages: 패키지 상품 테이블
  - Row Level Security (RLS) 정책 설정
  - Supabase Auth 설정
    - 이메일/비밀번호 인증
    - 소셜 로그인 (Google, Kakao) 연동
  - Supabase Storage 버킷 생성
    - 숙소 이미지
    - 관광지 이미지
    - 사용자 프로필 이미지

- 기본 UI 컴포넌트 구현

  - 공통 레이아웃 구성
  - 네비게이션 바
  - 푸터
  - 로그인/회원가입 폼
  - 메인 페이지 레이아웃
  - 반응형 디자인 적용

- API 라우트 구성

  - 선박 예약 API
  - 숙소 예약 API
  - 패키지 상품 API
  - 사용자 프로필 API

- Git/GitHub 설정

  - Git 저장소 초기화
  - README.md 작성
    - 프로젝트 소개
    - 주요 기능 설명
    - 기술 스택 정리
    - 개발 환경 설정 가이드
    - 프로젝트 구조 문서화
  - GitHub 저장소 연결 (https://github.com/LeeJaeBae/ulleung-sketch)
  - HISTORY.md 파일 생성 및 관리

- 개발 환경 설정
  - ESLint 설정
  - Prettier 설정
  - husky를 이용한 git hooks 설정
  - VSCode 설정 및 추천 확장 프로그램 정의
