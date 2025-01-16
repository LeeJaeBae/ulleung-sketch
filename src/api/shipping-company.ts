import type { Tables } from 'src/types/supabase';

import { supabase } from 'src/lib/supabase';

export type ShippingCompany = Tables<'shipping_companies'>;

export async function getShippingCompanies() {
  const { data, error } = await supabase
    .from('shipping_companies')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function getShippingCompany(id: string) {
  const { data, error } = await supabase
    .from('shipping_companies')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function createShippingCompany(data: Omit<ShippingCompany, 'id' | 'created_at' | 'updated_at'>) {
  const { data: newCompany, error } = await supabase
    .from('shipping_companies')
    .insert([data])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return newCompany;
}

export async function updateShippingCompany(
  id: string,
  data: Partial<Omit<ShippingCompany, 'id' | 'created_at' | 'updated_at'>>
) {
  const { data: updatedCompany, error } = await supabase
    .from('shipping_companies')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return updatedCompany;
}

export async function deleteShippingCompany(id: string) {
  const { error } = await supabase.from('shipping_companies').delete().eq('id', id);

  if (error) {
    throw error;
  }
} 