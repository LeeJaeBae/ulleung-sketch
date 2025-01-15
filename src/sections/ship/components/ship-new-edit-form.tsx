'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Grid2 as Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useShippingCompanies } from 'src/hooks/use-shipping-companies';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

import { createShip, updateShip } from 'src/api/ship';
import type { Ship } from '../ship-types';
import { SpecificationEditor } from './specification-editor';

// ----------------------------------------------------------------------

const shipSchema = z.object({
  name: z.string().min(1, '선박명은 필수입니다'),
  capacity_passengers: z
    .number({
      required_error: '승객 정원은 필수입니다',
      invalid_type_error: '승객 정원은 숫자여야 합니다',
    })
    .int('승객 정원은 정수여야 합니다')
    .positive('승객 정원은 양수여야 합니다'),
  capacity_vehicles: z
    .number({
      invalid_type_error: '차량 정원은 숫자여야 합니다',
    })
    .int('차량 정원은 정수여야 합니다')
    .positive('차량 정원은 양수여야 합니다')
    .nullable(),
  vehicle_support: z.boolean().nullable(),
  company_id: z.string().min(1, '선사는 필수입니다'),
  specifications: z.record(z.string(), z.any()).nullable(),
});

type FormValues = z.infer<typeof shipSchema>;

type Props = {
  currentShip?: Ship;
};

export function ShipNewEditForm({ currentShip }: Props) {
  const router = useRouter();
  const loading = useBoolean();

  const { companies, loading: loadingCompanies, error: companiesError } = useShippingCompanies();

  const defaultValues = {
    name: currentShip?.name || '',
    capacity_passengers: currentShip?.capacity_passengers || 0,
    capacity_vehicles: currentShip?.capacity_vehicles || null,
    vehicle_support: currentShip?.vehicle_support || false,
    company_id: currentShip?.company_id || '',
    specifications: currentShip?.specifications || null,
  };

  const methods = useForm<FormValues>({
    resolver: zodResolver(shipSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      loading.onTrue();

      if (currentShip) {
        await updateShip(currentShip.id, data);
        toast.success('선박이 성공적으로 수정되었습니다!');
      } else {
        await createShip(data);
        toast.success('선박이 성공적으로 등록되었습니다!');
      }

      reset();
      loading.onFalse();
      router.push(paths.dashboard.ship.list);
    } catch (error) {
      console.error('Error saving ship:', error);
      loading.onFalse();
      toast.error(currentShip ? '선박 수정에 실패했습니다.' : '선박 등록에 실패했습니다.');
    }
  });

  if (loadingCompanies) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ height: 200 }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (companiesError) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        선사 목록을 불러오는데 실패했습니다
      </Alert>
    );
  }

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Field.Text name="name" label="선박명" placeholder="선박명을 입력하세요" />

              <Field.Text
                name="capacity_passengers"
                label="승객 정원"
                type="number"
                placeholder="승객 정원을 입력하세요"
                slotProps={{
                  input: {
                    inputProps: { min: 0 },
                  },
                }}
              />

              <Field.Text
                name="capacity_vehicles"
                label="차량 정원"
                type="number"
                placeholder="차량 정원을 입력하세요"
                slotProps={{
                  input: {
                    inputProps: { min: 0 },
                  },
                }}
              />

              <Field.Switch name="vehicle_support" label="차량 탑승 가능" />

              <Box>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                  <Typography variant="subtitle2">선사</Typography>
                  <Button
                    size="small"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                    onClick={() => router.push(paths.dashboard.shipping.new)}
                  >
                    새 선사 등록
                  </Button>
                </Stack>

                <Field.Select name="company_id" placeholder="선사를 선택하세요">
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </Field.Select>
              </Box>

              <SpecificationEditor
                value={methods.watch('specifications')}
                onChange={(value) => setValue('specifications', value)}
              />

              <Stack direction="row" spacing={1.5} alignItems="flex-end" justifyContent="flex-end">
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={() => router.push(paths.dashboard.ship.list)}
                >
                  취소
                </Button>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {currentShip ? '수정' : '등록'}
                </LoadingButton>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
