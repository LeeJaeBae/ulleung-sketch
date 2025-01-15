# 울릉스케치 데이터베이스 스키마

이 디렉토리는 울릉스케치 애플리케이션의 데이터베이스 스키마와 관련 SQL 파일들을 포함하고 있습니다.

## 디렉토리 구조

```
sql/
├── schemas/           # 데이터베이스 테이블 정의
│   ├── 01_init.sql              # 초기화 및 확장 설정
│   ├── 02_admin_and_regions.sql # 관리자 및 지역 관련 테이블
│   ├── 03_ships.sql             # 선박 관련 테이블
│   ├── 04_resorts.sql           # 리조트 관련 테이블
│   ├── 05_packages.sql          # 패키지 여행 관련 테이블
│   ├── 06_reservations.sql      # 예약 관련 테이블
│   └── 07_security_policies.sql # 보안 정책 설정
├── migrations/        # 데이터베이스 마이그레이션 파일
└── seeds/            # 초기 데이터 시드 파일
```

## 테이블 구조

### 1. 관리자 및 지역 정보

- `admins`: 관리자 계정 정보
- `regions`: 지역 정보
- `ports`: 항구 정보
- `shipping_routes`: 항로 정보

### 2. 선박 관련

- `shipping_companies`: 선사 정보
- `ships`: 선박 정보
- `ship_schedules`: 선박 운항 일정

### 3. 리조트 관련

- `resorts`: 리조트 정보
- `resort_rooms`: 객실 정보
- `resort_availability`: 객실 예약 가능 현황

### 4. 패키지 여행 관련

- `packages`: 패키지 상품 정보
- `package_schedules`: 패키지 출발 일정
- `package_schedule_details`: 패키지 상세 일정

### 5. 예약 관련

- `reservations`: 통합 예약 정보
- `ship_reservations`: 선박 예약 상세
- `resort_reservations`: 리조트 예약 상세
- `package_reservations`: 패키지 예약 상세

## 보안 정책 (RLS)

모든 테이블에는 Row Level Security가 적용되어 있으며, 다음과 같은 정책이 적용됩니다:

1. **관리자 전용 테이블**

   - `admins`: 관리자만 접근 가능

2. **공개 정보 테이블**

   - 조회: 모든 사용자 가능
   - 수정: 관리자만 가능
   - 해당 테이블: `regions`, `ports`, `shipping_routes`, `shipping_companies`, `ships`, `ship_schedules`, `resorts`, `resort_rooms`, `packages` 등

3. **예약 관련 테이블**
   - 조회: 관리자 또는 본인의 예약만 조회 가능
   - 생성: 모든 사용자 가능
   - 수정: 관리자 또는 본인만 가능
   - 해당 테이블: `reservations`, `ship_reservations`, `resort_reservations`, `package_reservations`

## 사용법

1. 새로운 데이터베이스 생성 시:

   ```sql
   -- schemas 폴더의 SQL 파일들을 순서대로 실행
   \i schemas/01_init.sql
   \i schemas/02_admin_and_regions.sql
   \i schemas/03_ships.sql
   \i schemas/04_resorts.sql
   \i schemas/05_packages.sql
   \i schemas/06_reservations.sql
   \i schemas/07_security_policies.sql
   ```

2. 초기 데이터 입력 시:
   ```sql
   -- seeds 폴더의 SQL 파일들 실행
   \i seeds/initial_data.sql
   ```
