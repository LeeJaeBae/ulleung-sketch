'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Grid2 as Grid } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useShippingCompanies } from 'src/hooks/use-shipping-companies';

import { createShip, updateShip } from 'src/api/ship';

import { Upload } from 'src/components/upload';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { FacilityEditor } from './facility-editor';
import { SpecificationEditor } from './specification-editor';

import type { Ship } from '../ship-types';

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
  description: z.string().optional(),
  facilities: z
    .array(
      z.object({
        facility_type_id: z.string(),
        name: z.string(),
        description: z.string().optional(),
        operation_hours: z.any().optional(),
        location_on_ship: z.string().optional(),
      })
    )
    .optional(),
  parking_info: z
    .object({
      parking_deck: z.string().optional(),
      capacity: z.number().int().positive().optional(),
      height_limit: z.number().positive().optional(),
      weight_limit: z.number().positive().optional(),
      instructions: z.string().optional(),
      fees: z.record(z.string(), z.number()).optional(),
    })
    .optional(),
  images: z.array(z.any()).optional(),
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
    description: currentShip?.description || '',
    facilities: currentShip?.facilities || [],
    parking_info: currentShip?.parking_info || {},
    images: currentShip?.images || [],
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
              <Typography variant="h6">기본 정보</Typography>

              <Field.Text name="name" label="선박명" placeholder="선박명을 입력하세요" />

              <Stack spacing={2}>
                <Typography variant="subtitle2">선박 이미지</Typography>
                <Upload
                  multiple
                  files={methods.watch('images')}
                  onDrop={(acceptedFiles) => {
                    setValue('images', [...(methods.watch('images') || []), ...acceptedFiles]);
                  }}
                  onRemove={(inputFile) => {
                    const filtered = (methods.watch('images') || []).filter(
                      (file) => file !== inputFile
                    );
                    setValue('images', filtered);
                  }}
                />
              </Stack>

              <Field.Text
                name="description"
                label="선박 설명"
                multiline
                rows={4}
                placeholder="선박에 대한 설명을 입력하세요"
              />

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6">수용 인원</Typography>

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

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6">선사 정보</Typography>

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
                    <MenuItem key={company.id} value={company.id}>
                      {company.name}
                    </MenuItem>
                  ))}
                </Field.Select>
              </Box>
            </Stack>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Typography variant="h6">선박 사양</Typography>

                <SpecificationEditor
                  value={methods.watch('specifications')}
                  onChange={(value) => setValue('specifications', value)}
                />
              </Stack>
            </Card>

            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Typography variant="h6">편의 시설</Typography>

                <FacilityEditor
                  value={methods.watch('facilities')}
                  onChange={(value) => setValue('facilities', value)}
                />
              </Stack>
            </Card>

            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Typography variant="h6">주차 정보</Typography>

                <Field.Text
                  name="parking_info.parking_deck"
                  label="주차 층"
                  placeholder="예: B1, 1층"
                />

                <Field.Text
                  name="parking_info.capacity"
                  label="주차 가능 대수"
                  type="number"
                  placeholder="주차 가능 대수를 입력하세요"
                />

                <Field.Text
                  name="parking_info.height_limit"
                  label="높이 제한 (m)"
                  type="number"
                  placeholder="높이 제한을 입력하세요"
                />

                <Field.Text
                  name="parking_info.weight_limit"
                  label="중량 제한 (톤)"
                  type="number"
                  placeholder="중량 제한을 입력하세요"
                />

                <Field.Text
                  name="parking_info.instructions"
                  label="주차 안내"
                  multiline
                  rows={3}
                  placeholder="주차 관련 안내사항을 입력하세요"
                />
              </Stack>
            </Card>
          </Stack>
        </Grid>

        <Grid size={12}>
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
        </Grid>
      </Grid>
    </Form>
  );
}
