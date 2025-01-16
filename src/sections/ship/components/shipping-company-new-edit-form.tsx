import * as z from 'zod';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import { Grid2 as Grid } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';

import { supabase } from 'src/lib/supabase';

import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const FormSchema = z.object({
  name: z.string().min(1, '선사명을 입력해주세요'),
  phone: z.string().min(1, '연락처를 입력해주세요'),
  contact_person: z.string().optional(),
  email: z.string().email('올바른 이메일 주소를 입력해주세요').optional().nullable(),
  website: z.string().url('올바른 웹사이트 주소를 입력해주세요').optional().nullable(),
  business_hours: z
    .object({
      open: z.string().nullable(),
      close: z.string().nullable(),
    })
    .nullable(),
});

type FormValues = z.infer<typeof FormSchema>;

// ----------------------------------------------------------------------

type Props = {
  currentShippingCompany?: FormValues;
};

export default function ShippingCompanyNewEditForm({ currentShippingCompany }: Props) {
  const router = useRouter();

  const methods = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: currentShippingCompany || {
      name: '',
      phone: '',
      contact_person: '',
      email: '',
      website: '',
      business_hours: {
        open: null,
        close: null,
      },
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { data: shippingCompanyData, error: shippingCompanyError } = await supabase
        .from('shipping_companies')
        .upsert(data);

      if (shippingCompanyError) {
        throw shippingCompanyError;
      }

      toast(
        currentShippingCompany ? '선사 정보가 수정되었습니다.' : '새로운 선사가 등록되었습니다.'
      );
      router.back();
    } catch (error) {
      console.error(error);
      toast.error('오류가 발생했습니다.');
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Stack spacing={3}>
            <Field.Text name="name" label="선사명" placeholder="선사명을 입력하세요" />

            <Field.Text name="phone" label="연락처" placeholder="연락처를 입력하세요" />

            <Field.Text
              name="contact_person"
              label="담당자"
              placeholder="담당자 이름을 입력하세요"
            />

            <Field.Text name="email" label="이메일" placeholder="이메일을 입력하세요" />

            <Field.Text name="website" label="웹사이트" placeholder="웹사이트 주소를 입력하세요" />

            <Stack spacing={2}>
              <Typography variant="subtitle2">영업시간</Typography>
              <Stack direction="row" spacing={2}>
                <Controller
                  name="business_hours.open"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TimePicker
                      label="시작 시간"
                      value={
                        value
                          ? dayjs()
                              .hour(parseInt(value.split(':')[0]))
                              .minute(parseInt(value.split(':')[1]))
                          : null
                      }
                      onChange={(newValue) => onChange(newValue?.format('HH:mm') || null)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                        },
                      }}
                    />
                  )}
                />
                <Controller
                  name="business_hours.close"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TimePicker
                      label="종료 시간"
                      value={
                        value
                          ? dayjs()
                              .hour(parseInt(value.split(':')[0]))
                              .minute(parseInt(value.split(':')[1]))
                          : null
                      }
                      onChange={(newValue) => onChange(newValue?.format('HH:mm') || null)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                        },
                      }}
                    />
                  )}
                />
              </Stack>
            </Stack>
          </Stack>
        </Grid>

        <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
            {currentShippingCompany ? '수정' : '등록'}
          </LoadingButton>
        </Grid>
      </Grid>
    </Form>
  );
}
