-- UUID 확장 활성화
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 기존 테이블 삭제
DROP TABLE IF EXISTS 
  package_reservations,
  resort_reservations,
  ship_reservations,
  reservations,
  package_schedule_details,
  package_schedules,
  packages,
  resort_availability,
  resort_rooms,
  resorts,
  ship_schedules,
  ships,
  shipping_companies,
  shipping_routes,
  ports,
  regions,
  admins
CASCADE; 