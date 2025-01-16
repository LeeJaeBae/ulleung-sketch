export type Ship = {
  id: string;
  name: string;
  capacity_passengers: number;
  capacity_vehicles: number | null;
  vehicle_support: boolean | null;
  company_id: string;
  specifications: Record<string, any> | null;
  description?: string;
  facilities?: Array<{
    facility_type_id: string;
    name: string;
    description?: string;
    operation_hours?: {
      open: string | null;
      close: string | null;
    };
    location_on_ship?: string;
  }>;
  parking_info?: {
    parking_deck?: string;
    capacity?: number;
    height_limit?: number;
    weight_limit?: number;
    instructions?: string;
    fees?: Record<string, number>;
  };
  images?: File[];
  created_at: string;
  updated_at: string;
};
