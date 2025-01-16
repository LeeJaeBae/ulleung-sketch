-- 1. 마스터 테이블 생성

-- 시설 유형 마스터 테이블
CREATE TABLE facility_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(50) NOT NULL, -- 'ship', 'resort', 'package'
    code VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(category, code)
);

-- 이미지 유형 마스터 테이블
CREATE TABLE image_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(50) NOT NULL, -- 'ship', 'resort', 'package'
    code VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(category, code)
);

-- 2. 선박 관련 상세 정보 테이블

-- 선박 시설 정보
CREATE TABLE ship_facilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ship_id UUID NOT NULL REFERENCES ships(id) ON DELETE CASCADE,
    facility_type_id UUID NOT NULL REFERENCES facility_types(id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    operation_hours JSONB,
    location_on_ship VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 선박 이미지
CREATE TABLE ship_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ship_id UUID NOT NULL REFERENCES ships(id) ON DELETE CASCADE,
    image_type_id UUID NOT NULL REFERENCES image_types(id),
    image_url VARCHAR(255) NOT NULL,
    caption VARCHAR(255),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 선박 주차 정보
CREATE TABLE ship_parking_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ship_id UUID NOT NULL REFERENCES ships(id) ON DELETE CASCADE,
    parking_deck VARCHAR(50),
    capacity INTEGER,
    height_limit NUMERIC(4,1),
    weight_limit NUMERIC(8,2),
    instructions TEXT,
    fees JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. 업데이트 트리거 생성
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 각 테이블에 업데이트 트리거 적용
CREATE TRIGGER update_facility_types_updated_at
    BEFORE UPDATE ON facility_types
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_image_types_updated_at
    BEFORE UPDATE ON image_types
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ship_facilities_updated_at
    BEFORE UPDATE ON ship_facilities
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ship_images_updated_at
    BEFORE UPDATE ON ship_images
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ship_parking_info_updated_at
    BEFORE UPDATE ON ship_parking_info
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 4. 기본 RLS 정책 설정
ALTER TABLE facility_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE image_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE ship_facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE ship_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE ship_parking_info ENABLE ROW LEVEL SECURITY;

-- 관리자 읽기/쓰기 정책
CREATE POLICY admin_all_facility_types ON facility_types
    FOR ALL USING (auth.role() = 'authenticated' AND EXISTS (
        SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid() AND auth.users.role = 'admin'
    ));

CREATE POLICY admin_all_image_types ON image_types
    FOR ALL USING (auth.role() = 'authenticated' AND EXISTS (
        SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid() AND auth.users.role = 'admin'
    ));

CREATE POLICY admin_all_ship_facilities ON ship_facilities
    FOR ALL USING (auth.role() = 'authenticated' AND EXISTS (
        SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid() AND auth.users.role = 'admin'
    ));

CREATE POLICY admin_all_ship_images ON ship_images
    FOR ALL USING (auth.role() = 'authenticated' AND EXISTS (
        SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid() AND auth.users.role = 'admin'
    ));

CREATE POLICY admin_all_ship_parking_info ON ship_parking_info
    FOR ALL USING (auth.role() = 'authenticated' AND EXISTS (
        SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid() AND auth.users.role = 'admin'
    ));

-- 일반 사용자 읽기 정책
CREATE POLICY user_read_facility_types ON facility_types
    FOR SELECT USING (is_active = true);

CREATE POLICY user_read_image_types ON image_types
    FOR SELECT USING (is_active = true);

CREATE POLICY user_read_ship_facilities ON ship_facilities
    FOR SELECT USING (is_active = true);

CREATE POLICY user_read_ship_images ON ship_images
    FOR SELECT USING (is_active = true);

CREATE POLICY user_read_ship_parking_info ON ship_parking_info
    FOR SELECT USING (is_active = true); 