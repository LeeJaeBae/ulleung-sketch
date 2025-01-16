export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      admin_logs: {
        Row: {
          action: string
          admin_id: string
          created_at: string
          id: string
          new_value: Json | null
          old_value: Json | null
          target_user_id: string
        }
        Insert: {
          action: string
          admin_id: string
          created_at?: string
          id?: string
          new_value?: Json | null
          old_value?: Json | null
          target_user_id: string
        }
        Update: {
          action?: string
          admin_id?: string
          created_at?: string
          id?: string
          new_value?: Json | null
          old_value?: Json | null
          target_user_id?: string
        }
        Relationships: []
      }
      facility_types: {
        Row: {
          category: string
          code: string
          created_at: string | null
          description: string | null
          display_order: number | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          category: string
          code: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          code?: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      image_types: {
        Row: {
          category: string
          code: string
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          category: string
          code: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          code?: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      package_reservations: {
        Row: {
          created_at: string | null
          id: string
          participant_count: number
          reservation_id: string | null
          schedule_id: string | null
          special_requests: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          participant_count: number
          reservation_id?: string | null
          schedule_id?: string | null
          special_requests?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          participant_count?: number
          reservation_id?: string | null
          schedule_id?: string | null
          special_requests?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "package_reservations_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_reservations_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "package_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      package_schedule_details: {
        Row: {
          created_at: string | null
          day_number: number
          description: string | null
          duration: string | null
          id: string
          location: string | null
          schedule_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          day_number: number
          description?: string | null
          duration?: string | null
          id?: string
          location?: string | null
          schedule_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          day_number?: number
          description?: string | null
          duration?: string | null
          id?: string
          location?: string | null
          schedule_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "package_schedule_details_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "package_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      package_schedules: {
        Row: {
          available_spots: number
          created_at: string | null
          end_date: string
          id: string
          package_id: string | null
          price_modifier: number | null
          start_date: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          available_spots: number
          created_at?: string | null
          end_date: string
          id?: string
          package_id?: string | null
          price_modifier?: number | null
          start_date: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          available_spots?: number
          created_at?: string | null
          end_date?: string
          id?: string
          package_id?: string | null
          price_modifier?: number | null
          start_date?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "package_schedules_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      packages: {
        Row: {
          created_at: string | null
          description: string
          duration: number
          id: string
          images: Json | null
          included_services: Json | null
          max_participants: number
          min_participants: number
          name: string
          price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          duration: number
          id?: string
          images?: Json | null
          included_services?: Json | null
          max_participants: number
          min_participants: number
          name: string
          price: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          duration?: number
          id?: string
          images?: Json | null
          included_services?: Json | null
          max_participants?: number
          min_participants?: number
          name?: string
          price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      ports: {
        Row: {
          created_at: string | null
          description: string | null
          facilities: Json | null
          id: string
          latitude: number
          longitude: number
          name: string
          region_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          facilities?: Json | null
          id?: string
          latitude: number
          longitude: number
          name: string
          region_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          facilities?: Json | null
          id?: string
          latitude?: number
          longitude?: number
          name?: string
          region_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ports_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      regions: {
        Row: {
          created_at: string | null
          id: string
          latitude: number
          longitude: number
          name: string
          prefecture: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          latitude: number
          longitude: number
          name: string
          prefecture: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          latitude?: number
          longitude?: number
          name?: string
          prefecture?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      reservations: {
        Row: {
          created_at: string | null
          customer_email: string | null
          customer_name: string
          customer_phone: string
          id: string
          payment_status: string | null
          status: string
          total_price: number
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_email?: string | null
          customer_name: string
          customer_phone: string
          id?: string
          payment_status?: string | null
          status: string
          total_price: number
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string
          customer_phone?: string
          id?: string
          payment_status?: string | null
          status?: string
          total_price?: number
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      resort_availability: {
        Row: {
          available_count: number
          created_at: string | null
          date: string
          id: string
          price_modifier: number | null
          room_id: string | null
          updated_at: string | null
        }
        Insert: {
          available_count: number
          created_at?: string | null
          date: string
          id?: string
          price_modifier?: number | null
          room_id?: string | null
          updated_at?: string | null
        }
        Update: {
          available_count?: number
          created_at?: string | null
          date?: string
          id?: string
          price_modifier?: number | null
          room_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resort_availability_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "resort_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      resort_reservations: {
        Row: {
          check_in_date: string
          check_out_date: string
          created_at: string | null
          guest_count: number
          id: string
          reservation_id: string | null
          room_id: string | null
          special_requests: string | null
          updated_at: string | null
        }
        Insert: {
          check_in_date: string
          check_out_date: string
          created_at?: string | null
          guest_count: number
          id?: string
          reservation_id?: string | null
          room_id?: string | null
          special_requests?: string | null
          updated_at?: string | null
        }
        Update: {
          check_in_date?: string
          check_out_date?: string
          created_at?: string | null
          guest_count?: number
          id?: string
          reservation_id?: string | null
          room_id?: string | null
          special_requests?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resort_reservations_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resort_reservations_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "resort_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      resort_rooms: {
        Row: {
          amenities: Json | null
          capacity: number
          created_at: string | null
          id: string
          images: Json | null
          name: string
          price: number
          resort_id: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          amenities?: Json | null
          capacity: number
          created_at?: string | null
          id?: string
          images?: Json | null
          name: string
          price: number
          resort_id?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          amenities?: Json | null
          capacity?: number
          created_at?: string | null
          id?: string
          images?: Json | null
          name?: string
          price?: number
          resort_id?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resort_rooms_resort_id_fkey"
            columns: ["resort_id"]
            isOneToOne: false
            referencedRelation: "resorts"
            referencedColumns: ["id"]
          },
        ]
      }
      resorts: {
        Row: {
          contact_email: string | null
          contact_phone: string
          created_at: string | null
          description: string | null
          facilities: Json | null
          id: string
          images: Json | null
          latitude: number
          location: string
          longitude: number
          name: string
          updated_at: string | null
        }
        Insert: {
          contact_email?: string | null
          contact_phone: string
          created_at?: string | null
          description?: string | null
          facilities?: Json | null
          id?: string
          images?: Json | null
          latitude: number
          location: string
          longitude: number
          name: string
          updated_at?: string | null
        }
        Update: {
          contact_email?: string | null
          contact_phone?: string
          created_at?: string | null
          description?: string | null
          facilities?: Json | null
          id?: string
          images?: Json | null
          latitude?: number
          location?: string
          longitude?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ship_facilities: {
        Row: {
          created_at: string | null
          description: string | null
          facility_type_id: string
          id: string
          is_active: boolean | null
          location_on_ship: string | null
          name: string
          operation_hours: Json | null
          ship_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          facility_type_id: string
          id?: string
          is_active?: boolean | null
          location_on_ship?: string | null
          name: string
          operation_hours?: Json | null
          ship_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          facility_type_id?: string
          id?: string
          is_active?: boolean | null
          location_on_ship?: string | null
          name?: string
          operation_hours?: Json | null
          ship_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ship_facilities_facility_type_id_fkey"
            columns: ["facility_type_id"]
            isOneToOne: false
            referencedRelation: "facility_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ship_facilities_ship_id_fkey"
            columns: ["ship_id"]
            isOneToOne: false
            referencedRelation: "ships"
            referencedColumns: ["id"]
          },
        ]
      }
      ship_images: {
        Row: {
          caption: string | null
          created_at: string | null
          display_order: number | null
          id: string
          image_type_id: string
          image_url: string
          is_active: boolean | null
          ship_id: string
          updated_at: string | null
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_type_id: string
          image_url: string
          is_active?: boolean | null
          ship_id: string
          updated_at?: string | null
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_type_id?: string
          image_url?: string
          is_active?: boolean | null
          ship_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ship_images_image_type_id_fkey"
            columns: ["image_type_id"]
            isOneToOne: false
            referencedRelation: "image_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ship_images_ship_id_fkey"
            columns: ["ship_id"]
            isOneToOne: false
            referencedRelation: "ships"
            referencedColumns: ["id"]
          },
        ]
      }
      ship_parking_info: {
        Row: {
          capacity: number | null
          created_at: string | null
          fees: Json | null
          height_limit: number | null
          id: string
          instructions: string | null
          is_active: boolean | null
          parking_deck: string | null
          ship_id: string
          updated_at: string | null
          weight_limit: number | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string | null
          fees?: Json | null
          height_limit?: number | null
          id?: string
          instructions?: string | null
          is_active?: boolean | null
          parking_deck?: string | null
          ship_id: string
          updated_at?: string | null
          weight_limit?: number | null
        }
        Update: {
          capacity?: number | null
          created_at?: string | null
          fees?: Json | null
          height_limit?: number | null
          id?: string
          instructions?: string | null
          is_active?: boolean | null
          parking_deck?: string | null
          ship_id?: string
          updated_at?: string | null
          weight_limit?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ship_parking_info_ship_id_fkey"
            columns: ["ship_id"]
            isOneToOne: false
            referencedRelation: "ships"
            referencedColumns: ["id"]
          },
        ]
      }
      ship_reservations: {
        Row: {
          created_at: string | null
          id: string
          passenger_count: number
          reservation_id: string | null
          schedule_id: string | null
          special_requests: string | null
          updated_at: string | null
          vehicle_included: boolean | null
          vehicle_type: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          passenger_count: number
          reservation_id?: string | null
          schedule_id?: string | null
          special_requests?: string | null
          updated_at?: string | null
          vehicle_included?: boolean | null
          vehicle_type?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          passenger_count?: number
          reservation_id?: string | null
          schedule_id?: string | null
          special_requests?: string | null
          updated_at?: string | null
          vehicle_included?: boolean | null
          vehicle_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ship_reservations_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ship_reservations_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "ship_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      ship_schedules: {
        Row: {
          arrival_time: string
          available_seats: number
          available_vehicle_spots: number | null
          base_price: number
          created_at: string | null
          departure_time: string
          id: string
          route_id: string | null
          ship_id: string | null
          status: string | null
          updated_at: string | null
          vehicle_price: number | null
        }
        Insert: {
          arrival_time: string
          available_seats: number
          available_vehicle_spots?: number | null
          base_price: number
          created_at?: string | null
          departure_time: string
          id?: string
          route_id?: string | null
          ship_id?: string | null
          status?: string | null
          updated_at?: string | null
          vehicle_price?: number | null
        }
        Update: {
          arrival_time?: string
          available_seats?: number
          available_vehicle_spots?: number | null
          base_price?: number
          created_at?: string | null
          departure_time?: string
          id?: string
          route_id?: string | null
          ship_id?: string | null
          status?: string | null
          updated_at?: string | null
          vehicle_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ship_schedules_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "shipping_routes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ship_schedules_ship_id_fkey"
            columns: ["ship_id"]
            isOneToOne: false
            referencedRelation: "ships"
            referencedColumns: ["id"]
          },
        ]
      }
      shipping_companies: {
        Row: {
          business_hours: Json | null
          contact_person: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string
          phone: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          business_hours?: Json | null
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
          phone: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          business_hours?: Json | null
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      shipping_routes: {
        Row: {
          arrival_port_id: string | null
          created_at: string | null
          departure_port_id: string | null
          distance: number | null
          estimated_time: unknown | null
          id: string
          updated_at: string | null
        }
        Insert: {
          arrival_port_id?: string | null
          created_at?: string | null
          departure_port_id?: string | null
          distance?: number | null
          estimated_time?: unknown | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          arrival_port_id?: string | null
          created_at?: string | null
          departure_port_id?: string | null
          distance?: number | null
          estimated_time?: unknown | null
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shipping_routes_arrival_port_id_fkey"
            columns: ["arrival_port_id"]
            isOneToOne: false
            referencedRelation: "ports"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipping_routes_departure_port_id_fkey"
            columns: ["departure_port_id"]
            isOneToOne: false
            referencedRelation: "ports"
            referencedColumns: ["id"]
          },
        ]
      }
      ships: {
        Row: {
          capacity_passengers: number
          capacity_vehicles: number | null
          company_id: string | null
          created_at: string | null
          id: string
          name: string
          specifications: Json | null
          updated_at: string | null
          vehicle_support: boolean | null
        }
        Insert: {
          capacity_passengers: number
          capacity_vehicles?: number | null
          company_id?: string | null
          created_at?: string | null
          id?: string
          name: string
          specifications?: Json | null
          updated_at?: string | null
          vehicle_support?: boolean | null
        }
        Update: {
          capacity_passengers?: number
          capacity_vehicles?: number | null
          company_id?: string | null
          created_at?: string | null
          id?: string
          name?: string
          specifications?: Json | null
          updated_at?: string | null
          vehicle_support?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "ships_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "shipping_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          role: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          role?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_schema: {
        Args: {
          sql: string
        }
        Returns: Json
      }
      get_schema_info: {
        Args: Record<PropertyKey, never>
        Returns: {
          table_name: string
          column_name: string
          data_type: string
          is_nullable: boolean
          column_default: string
          character_maximum_length: number
          numeric_precision: number
          numeric_scale: number
          column_description: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
