'use client';

import type { Session } from '@supabase/supabase-js';

import { useMemo, useState, useEffect, useCallback } from 'react';

import { supabase } from 'src/lib/supabase';

import { AuthContext } from '../auth-context';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  const initialize = useCallback(async () => {
    try {
      const {
        data: { session: initialSession },
      } = await supabase.auth.getSession();
      setSession(initialSession);

      if (initialSession?.user) {
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', initialSession.user.id)
          .single();

        if (roleError) {
          console.error('Error fetching user role:', roleError);
        } else {
          setUserRole(roleData?.role || 'guest');
        }
      }

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
        setSession(currentSession);

        if (currentSession?.user) {
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', currentSession.user.id)
            .single();

          setUserRole(roleData?.role || 'guest');
        } else {
          setUserRole(null);
        }
      });

      setLoading(false);

      return subscription;
    } catch (error) {
      console.error(error);
      setLoading(false);
      return undefined;
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const memoizedValue = useMemo(
    () => ({
      user: session?.user || null,
      loading,
      authenticated: !!session,
      role: userRole,
    }),
    [session, loading, userRole]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
