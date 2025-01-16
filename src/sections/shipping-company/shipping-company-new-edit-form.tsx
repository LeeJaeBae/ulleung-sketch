'use client';

import type { ShippingCompany } from 'src/api/shipping-company';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Grid2 as Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { createShippingCompany, updateShippingCompany } from 'src/api/shipping-company';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const shippingCompanySchema = z.object({
  name: z.string().min(1, '선사명은 필수입니다'),
  phone: z.string().min(1, '전화번호는 필수입니다'),
  email: z.string().email('올바른 이메일 주소를 입력하세요').optional().nullable(),
  website: z.string().url('올바른 웹사이트 주소를 입력하세요').optional().nullable(),
  contact_person: z.string().optional().nullable(),
  business_hours: z
    .object({
      weekday: z.object({
        open: z.string().nullable(),
        close: z.string().nullable(),
      }),
      weekend: z.object({
        open: z.string().nullable(),
        close: z.string().nullable(),
      }),
    })
    .optional()
    .nullable(),
});

type FormValues = z.infer<typeof shippingCompanySchema>;

type Props = {
  currentCompany?: ShippingCompany;
};

export function ShippingCompanyNewEditForm({ currentCompany }: Props) {
  const router = useRouter();
  const loading = useBoolean();

  const defaultValues = {
    name: currentCompany?.name || '',
    phone: currentCompany?.phone || '',
    email: currentCompany?.email || '',
    website: currentCompany?.website || '',
    contact_person: currentCompany?.contact_person || '',
    business_hours: currentCompany?.business_hours || {
      weekday: { open: null, close: null },
      weekend: { open: null, close: null },
    },
  };

  const methods = useForm<FormValues>({
    resolver: zodResolver(shippingCompanySchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      loading.onTrue();

      if (currentCompany) {
        await updateShippingCompany(currentCompany.id, data);
        toast.success('선사가 성공적으로 수정되었습니다!');
      } else {
        await createShippingCompany(data);
        toast.success('선사가 성공적으로 등록되었습니다!');
      }

      reset();
      loading.onFalse();
      router.push(paths.dashboard.shipping.list);
    } catch (error) {
      console.error('Error saving shipping company:', error);
      loading.onFalse();
      toast.error(currentCompany ? '선사 수정에 실패했습니다.' : '선사 등록에 실패했습니다.');
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Typography variant="h6">기본 정보</Typography>

              <Field.Text name="name" label="선사명" placeholder="선사명을 입력하세요" />

              <Field.Text name="phone" label="전화번호" placeholder="전화번호를 입력하세요" />

              <Field.Text name="email" label="이메일" placeholder="이메일을 입력하세요" />

              <Field.Text
                name="website"
                label="웹사이트"
                placeholder="웹사이트 주소를 입력하세요"
              />

              <Field.Text
                name="contact_person"
                label="담당자"
                placeholder="담당자 이름을 입력하세요"
              />

              <Stack spacing={2}>
                <Typography variant="subtitle2">영업 시간</Typography>

                <Stack spacing={2}>
                  <Typography variant="body2" color="text.secondary">
                    평일
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Field.Text
                      name="business_hours.weekday.open"
                      label="시작 시간"
                      placeholder="09:00"
                    />
                    <Field.Text
                      name="business_hours.weekday.close"
                      label="종료 시간"
                      placeholder="18:00"
                    />
                  </Stack>
                </Stack>

                <Stack spacing={2}>
                  <Typography variant="body2" color="text.secondary">
                    주말
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Field.Text
                      name="business_hours.weekend.open"
                      label="시작 시간"
                      placeholder="09:00"
                    />
                    <Field.Text
                      name="business_hours.weekend.close"
                      label="종료 시간"
                      placeholder="18:00"
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid size={12}>
          <Stack direction="row" spacing={1.5} justifyContent="flex-end">
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => router.push(paths.dashboard.shipping.list)}
            >
              취소
            </Button>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {currentCompany ? '수정' : '등록'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </Form>
  );
}
