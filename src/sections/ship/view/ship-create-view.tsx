'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ShipNewEditForm } from '../components/ship-new-edit-form';

// ----------------------------------------------------------------------

export function ShipCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="선박 등록"
        links={[
          { name: '대시보드', href: paths.dashboard.root },
          { name: '선박', href: paths.dashboard.ship.root },
          { name: '등록' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ShipNewEditForm />
    </DashboardContent>
  );
}
