import { useCallback, useEffect, useState } from 'react';
import { supabase } from 'src/lib/supabase';
import type { ShippingCompany } from 'src/types/shipping-company';

export function useShippingCompanies() {
  const [companies, setCompanies] = useState<ShippingCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCompanies = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('shipping_companies')
        .select('*')
        .order('name');

      if (error) throw error;

      setCompanies(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching shipping companies:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const refresh = useCallback(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return {
    companies,
    loading,
    error,
    refresh,
  };
} 