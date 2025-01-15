import { supabase } from 'src/lib/supabase';
import type { ShippingCompany } from 'src/types/shipping-company';

export async function createShippingCompany(data: Omit<ShippingCompany, 'id' | 'created_at' | 'updated_at'>) {
  const { data: company, error } = await supabase
    .from('shipping_companies')
    .insert([data])
    .select()
    .single();

  if (error) throw error;

  return company;
}

export async function updateShippingCompany(
  id: string,
  data: Partial<Omit<ShippingCompany, 'id' | 'created_at' | 'updated_at'>>
) {
  const { data: company, error } = await supabase
    .from('shipping_companies')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return company;
}

export async function getShippingCompany(id: string) {
  const { data: company, error } = await supabase
    .from('shipping_companies')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;

  return company;
}

export async function getShippingCompanies() {
  const { data: companies, error } = await supabase
    .from('shipping_companies')
    .select('*')
    .order('name');

  if (error) throw error;

  return companies;
}

export async function deleteShippingCompany(id: string) {
  const { error } = await supabase
    .from('shipping_companies')
    .delete()
    .eq('id', id);

  if (error) throw error;
} 