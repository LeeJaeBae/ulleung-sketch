export type Ship = {
  id: string;
  name: string;
  capacity_passengers: number;
  capacity_vehicles: number | null;
  vehicle_support: boolean | null;
  company_id: string | null;
  specifications: Record<string, any> | null;
  created_at: string | null;
  updated_at: string | null;
};
