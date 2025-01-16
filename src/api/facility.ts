import { supabase } from 'src/lib/supabase';

export type FacilityType = {
  id: string;
  name: string;
  code: string;
  category: string;
  description?: string;
  icon?: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export async function getFacilityTypes(category: string) {
  const { data, error } = await supabase
    .from('facility_types')
    .select('*')
    .eq('category', category)
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function createFacilityType(data: Omit<FacilityType, 'id' | 'created_at' | 'updated_at'>) {
  const { data: newFacilityType, error } = await supabase
    .from('facility_types')
    .insert([data])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return newFacilityType;
}

export async function updateFacilityType(id: string, data: Partial<Omit<FacilityType, 'id' | 'created_at' | 'updated_at'>>) {
  const { data: updatedFacilityType, error } = await supabase
    .from('facility_types')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return updatedFacilityType;
}

export async function deleteFacilityType(id: string) {
  const { error } = await supabase
    .from('facility_types')
    .update({ is_active: false })
    .eq('id', id);

  if (error) {
    throw error;
  }
} 