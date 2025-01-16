'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

type AdminGuardProps = {
  children: React.ReactNode;
};

export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();

  const { role, loading } = useAuthContext();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!role || role !== 'admin') {
        router.replace('/');
        return;
      }
      setIsChecking(false);
    }
  }, [role, loading, router]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
