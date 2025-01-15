'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from 'src/contexts/auth-context';

import { SplashScreen } from 'src/components/loading-screen';
import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

type AdminGuardProps = {
  children: React.ReactNode;
};

export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();

  const { user, loading } = useAuthContext();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== 'admin') {
        router.replace('/');
        return;
      }
      setIsChecking(false);
    }
  }, [user, loading, router]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
