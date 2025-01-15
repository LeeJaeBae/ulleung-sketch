'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';

import { DashboardContent } from 'src/layouts/dashboard';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import ShippingCompanyNewEditForm from 'src/sections/shipping-company/shipping-company-new-edit-form';

// ----------------------------------------------------------------------

export default function ShippingCompanyCreatePage() {
  const settings = useSettingsContext();

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="선사 등록"
        links={[
          {
            name: '대시보드',
            href: paths.dashboard.root,
          },
          {
            name: '선사',
            href: paths.dashboard.shipping.root,
          },
          {
            name: '등록',
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ShippingCompanyNewEditForm />
    </DashboardContent>
  );
}
