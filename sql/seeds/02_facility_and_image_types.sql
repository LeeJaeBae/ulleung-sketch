-- 선박 시설 유형 초기 데이터
INSERT INTO facility_types (category, code, name, description, icon, display_order) VALUES
    ('ship', 'restaurant', '식당', '선박 내 식사 공간', 'restaurant', 10),
    ('ship', 'cafe', '카페', '커피와 음료를 즐길 수 있는 공간', 'cafe', 20),
    ('ship', 'shop', '매점', '간단한 식음료와 기념품을 구매할 수 있는 공간', 'shop', 30),
    ('ship', 'lounge', '라운지', '휴식을 취할 수 있는 공간', 'lounge', 40),
    ('ship', 'deck', '갑판', '바다 전망을 감상할 수 있는 공간', 'deck', 50),
    ('ship', 'nursing_room', '수유실', '아기와 함께하는 공간', 'baby', 60),
    ('ship', 'medical', '의무실', '응급 처치 및 의료 서비스', 'medical', 70),
    ('ship', 'toilet', '화장실', '선박 내 화장실', 'toilet', 80),
    ('ship', 'elevator', '엘리베이터', '층간 이동 설비', 'elevator', 90);

-- 선박 이미지 유형 초기 데이터
INSERT INTO image_types (category, code, name, description, display_order) VALUES
    ('ship', 'exterior', '외관', '선박의 외부 전경', 10),
    ('ship', 'interior', '내부', '선박의 내부 전경', 20),
    ('ship', 'cabin', '객실', '승객 좌석 공간', 30),
    ('ship', 'facility', '편의시설', '선박 내 각종 편의시설', 40),
    ('ship', 'restaurant', '식당', '선박 내 식당 공간', 50),
    ('ship', 'deck', '갑판', '선박의 갑판 공간', 60),
    ('ship', 'parking', '주차장', '차량 주차 공간', 70); 