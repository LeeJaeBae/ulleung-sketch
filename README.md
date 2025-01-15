# 울릉스케치 (Ulleung Sketch)

울릉도 여행의 모든 것을 한 곳에서 - 울릉스케치

## 주요 기능

- 🚢 선박 예약

  - 포항, 강릉, 묵호에서 출발하는 울릉도행 선박 예약
  - 실시간 좌석 확인
  - 온라인 결제

- 🏨 숙소 예약

  - 울릉도 내 리조트, 호텔, 펜션 예약
  - 객실 타입별 가격 비교
  - 실시간 예약 가능 여부 확인

- 📦 패키지 여행
  - 선박 + 숙소 + 관광지를 묶은 패키지 상품
  - 다양한 일정과 가격대
  - 전문 가이드 동행 옵션

## 기술 스택

- Frontend

  - Next.js 14 (App Router)
  - React
  - TypeScript
  - Material UI
  - SWR

- Backend
  - Supabase
    - Database
    - Authentication
    - Storage
    - Edge Functions

## 개발 환경 설정

1. 저장소 클론

```bash
git clone https://github.com/username/ulleung-sketch.git
cd ulleung-sketch
```

2. 의존성 설치

```bash
pnpm install
```

3. 환경 변수 설정

```bash
cp .env.example .env.local
# .env.local 파일에 필요한 환경 변수 입력
```

4. 개발 서버 실행

```bash
pnpm dev
```

## 프로젝트 구조

```
src/
├── app/                    # Next.js 14 App Router
├── components/             # 공통 컴포넌트
├── contexts/              # React Context
├── hooks/                 # Custom Hooks
├── layouts/               # 레이아웃 컴포넌트
├── lib/                   # 유틸리티 함수
├── locales/              # 다국어 지원
├── sections/             # 페이지별 컴포넌트
├── theme/                # Material UI 테마
└── types/                # TypeScript 타입 정의
```

## 보안

- Row Level Security (RLS)로 데이터 접근 제어
- 사용자 권한 기반 접근 제어 (RBAC)
- 관리자 작업 로깅

## 라이선스

MIT License
