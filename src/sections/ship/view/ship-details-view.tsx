'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import type { Ship } from '../ship-types';

// ----------------------------------------------------------------------

type Props = {
  ship?: Ship;
};

export function ShipDetailsView({ ship }: Props) {
  const router = useRouter();

  const renderStatus = (shipStatus: Ship['status']) => {
    const statusMap: Record<
      Ship['status'],
      { label: string; color: 'success' | 'warning' | 'error' }
    > = {
      active: { label: '운항중', color: 'success' },
      inactive: { label: '정박중', color: 'warning' },
      maintenance: { label: '정비중', color: 'error' },
    };

    const { label, color } = statusMap[shipStatus];

    return <Chip label={label} color={color} />;
  };

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="선박 상세"
        links={[
          { name: '대시보드', href: paths.dashboard.root },
          { name: '선박', href: paths.dashboard.ship.root },
          { name: ship?.name || '' },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon="solar:pen-bold" />}
            onClick={() => router.push(paths.dashboard.ship.edit(ship?.id || ''))}
          >
            수정
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Stack spacing={2}>
                <Typography variant="h6">기본 정보</Typography>

                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between">
                    <Box>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        선박명
                      </Typography>
                      <Typography variant="body2">{ship?.name}</Typography>
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        상태
                      </Typography>
                      {ship?.status && renderStatus(ship.status)}
                    </Box>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Box>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        선박 종류
                      </Typography>
                      <Typography variant="body2">{ship?.type}</Typography>
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        정원
                      </Typography>
                      <Typography variant="body2">{ship?.capacity}명</Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
