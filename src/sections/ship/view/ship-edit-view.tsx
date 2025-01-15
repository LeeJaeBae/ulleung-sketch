'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ShipNewEditForm } from '../components/ship-new-edit-form';
import type { Ship } from '../ship-types';

// ----------------------------------------------------------------------

type Props = {
  ship?: Ship;
};

export function ShipEditView({ ship }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="선박 수정"
        links={[
          { name: '대시보드', href: paths.dashboard.root },
          { name: '선박', href: paths.dashboard.ship.root },
          { name: ship?.name || '' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ShipNewEditForm currentShip={ship} />
    </DashboardContent>
  );
}
