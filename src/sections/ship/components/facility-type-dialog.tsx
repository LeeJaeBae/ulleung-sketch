import type { FacilityType } from 'src/api/facility';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useBoolean } from 'src/hooks/use-boolean';

import { createFacilityType, updateFacilityType } from 'src/api/facility';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const facilityTypeSchema = z.object({
  name: z.string().min(1, '시설 유형명은 필수입니다'),
  code: z.string().min(1, '코드는 필수입니다'),
  category: z.string().min(1, '카테고리는 필수입니다'),
  description: z.string().optional(),
  icon: z.string().optional(),
  display_order: z.number().int().nonnegative(),
  is_active: z.boolean(),
});

type FormValues = z.infer<typeof facilityTypeSchema>;

type Props = {
  open: boolean;
  onClose: () => void;
  currentFacilityType?: FacilityType;
  onSuccess?: () => void;
};

export function FacilityTypeDialog({ open, onClose, currentFacilityType, onSuccess }: Props) {
  const loading = useBoolean();

  const defaultValues = {
    name: currentFacilityType?.name || '',
    code: currentFacilityType?.code || '',
    category: currentFacilityType?.category || 'ship',
    description: currentFacilityType?.description || '',
    icon: currentFacilityType?.icon || '',
    display_order: currentFacilityType?.display_order || 0,
    is_active: currentFacilityType?.is_active ?? true,
  };

  const methods = useForm<FormValues>({
    resolver: zodResolver(facilityTypeSchema),
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

      if (currentFacilityType) {
        await updateFacilityType(currentFacilityType.id, data);
        toast.success('시설 유형이 성공적으로 수정되었습니다!');
      } else {
        await createFacilityType(data);
        toast.success('시설 유형이 성공적으로 등록되었습니다!');
      }

      reset();
      loading.onFalse();
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error saving facility type:', error);
      loading.onFalse();
      toast.error(
        currentFacilityType ? '시설 유형 수정에 실패했습니다.' : '시설 유형 등록에 실패했습니다.'
      );
    }
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{currentFacilityType ? '시설 유형 수정' : '시설 유형 추가'}</DialogTitle>

      <DialogContent>
        <Form methods={methods} onSubmit={onSubmit}>
          <Field.Text
            name="name"
            label="시설 유형명"
            placeholder="시설 유형명을 입력하세요"
            sx={{ mt: 2 }}
          />

          <Field.Text name="code" label="코드" placeholder="코드를 입력하세요" sx={{ mt: 2 }} />

          <Field.Text
            name="description"
            label="설명"
            placeholder="설명을 입력하세요"
            multiline
            rows={3}
            sx={{ mt: 2 }}
          />

          <Field.Text
            name="icon"
            label="아이콘"
            placeholder="아이콘 코드를 입력하세요"
            sx={{ mt: 2 }}
          />

          <Field.Text
            name="display_order"
            label="표시 순서"
            type="number"
            placeholder="표시 순서를 입력하세요"
            sx={{ mt: 2 }}
          />

          <Field.Switch name="is_active" label="활성화" sx={{ mt: 2 }} />

          <DialogActions>
            <Button color="inherit" onClick={onClose}>
              취소
            </Button>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {currentFacilityType ? '수정' : '추가'}
            </LoadingButton>
          </DialogActions>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
