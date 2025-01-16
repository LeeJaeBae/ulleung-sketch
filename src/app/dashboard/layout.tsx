'use client';

import { QueryClientProvider } from '@tanstack/react-query';

import { CONFIG } from 'src/global-config';
import { queryClient } from 'src/lib/qureyClient';
import { DashboardLayout } from 'src/layouts/dashboard';

import { AuthGuard } from 'src/auth/guard';
import { AdminGuard } from 'src/auth/guard/admin-guard';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  if (CONFIG.auth.skip) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  return (
    <AuthGuard>
      <AdminGuard>
        <QueryClientProvider client={queryClient}>
          <DashboardLayout>{children}</DashboardLayout>
        </QueryClientProvider>
      </AdminGuard>
    </AuthGuard>
  );
}
