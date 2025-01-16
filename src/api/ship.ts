import type { Tables } from 'src/types/supabase';

import { supabase } from 'src/lib/supabase';


export async function createShip(data: Omit<Tables<'ships'>, 'id' | 'created_at' | 'updated_at'>) {
  const { data: ship, error } = await supabase
    .from('ships')
    .insert([data])
    .select()
    .single();

  if (error) throw error;

  return ship;
}

export async function updateShip(id: string, data: Partial<Omit<Ship, 'id' | 'created_at' | 'updated_at'>>) {
  const { data: ship, error } = await supabase
    .from('ships')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return ship;
}

export async function getShip(id: string) {
  const { data: ship, error } = await supabase
    .from('ships')
    .select('*, shipping_companies(*)')
    .eq('id', id)
    .single();

  if (error) throw error;

  return ship;
}

export async function getShips() {
  const { data: ships, error } = await supabase
    .from('ships')
    .select('*, shipping_companies(*)')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return ships;
}

export async function deleteShip(id: string) {
  const { error } = await supabase
    .from('ships')
    .delete()
    .eq('id', id);

  if (error) throw error;
} 