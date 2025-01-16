import type { User } from '@supabase/supabase-js';

import { createContext } from 'react';

// ----------------------------------------------------------------------

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  authenticated: boolean;
  role: string | null;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  authenticated: false,
  role: null,
});
