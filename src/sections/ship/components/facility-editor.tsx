import type { Dayjs } from 'dayjs';
import type { FieldValues } from 'react-hook-form';

import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import { TimePicker } from '@mui/x-date-pickers';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';

import { getFacilityTypes } from 'src/api/facility';

import { Iconify } from 'src/components/iconify';
import { Field } from 'src/components/hook-form';

import { FacilityTypeDialog } from './facility-type-dialog';

// ----------------------------------------------------------------------

type FacilityType = {
  id: string;
  name: string;
  code: string;
  description?: string;
  icon?: string;
};

type Facility = {
  facility_type_id: string;
  name: string;
  description?: string;
  operation_hours?: {
    open: string | null;
    close: string | null;
  };
  location_on_ship?: string;
};

type FormValues = FieldValues & {
  facilities: Facility[];
};

type Props = {
  facilities?: Facility[];
  onFacilitiesChange: (facilities: Facility[]) => void;
};

export function FacilityEditor({ facilities, onFacilitiesChange }: Props) {
  const { control } = useFormContext<FormValues>();
  const dialog = useBoolean();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'facilities',
  });

  const { data: facilityTypes = [], refetch } = useQuery<FacilityType[]>({
    queryKey: ['facility-types', 'ship'],
    queryFn: () => getFacilityTypes('ship'),
  });

  const handleAdd = () => {
    append({
      facility_type_id: '',
      name: '',
      description: '',
      operation_hours: {
        open: null,
        close: null,
      },
      location_on_ship: '',
    });
  };

  return (
    <>
      <Stack spacing={3}>
        {fields.map((field, index) => (
          <Card key={field.id} sx={{ p: 2, position: 'relative' }}>
            <IconButton
              size="small"
              color="error"
              onClick={() => remove(index)}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>

            <Stack spacing={3} mt={1}>
              <Box>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                  <Typography variant="subtitle2">시설 유형</Typography>
                  <Button
                    size="small"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                    onClick={dialog.onTrue}
                  >
                    새 시설 유형 추가
                  </Button>
                </Stack>

                <Field.Select
                  name={`facilities.${index}.facility_type_id`}
                  placeholder="시설 유형을 선택하세요"
                >
                  {facilityTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Field.Select>
              </Box>

              <Field.Text
                name={`facilities.${index}.name`}
                label="시설명"
                placeholder="시설명을 입력하세요"
              />

              <Field.Text
                name={`facilities.${index}.description`}
                label="설명"
                placeholder="시설에 대한 설명을 입력하세요"
                multiline
                rows={2}
              />

              <Stack spacing={2}>
                <Typography variant="subtitle2">운영 시간</Typography>
                <Stack direction="row" spacing={2}>
                  <Controller<FormValues>
                    name={`facilities.${index}.operation_hours.open`}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TimePicker
                        label="시작 시간"
                        value={value ? dayjs(value) : null}
                        onChange={(newValue: Dayjs | null) =>
                          onChange(newValue?.format('HH:mm') || null)
                        }
                        slotProps={{
                          textField: {
                            fullWidth: true,
                          },
                        }}
                      />
                    )}
                  />
                  <Controller<FormValues>
                    name={`facilities.${index}.operation_hours.close`}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TimePicker
                        label="종료 시간"
                        value={value ? dayjs(value) : null}
                        onChange={(newValue: Dayjs | null) =>
                          onChange(newValue?.format('HH:mm') || null)
                        }
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

              <Field.Text
                name={`facilities.${index}.location_on_ship`}
                label="위치"
                placeholder="선박 내 위치를 입력하세요"
              />
            </Stack>
          </Card>
        ))}

        <Button
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleAdd}
          variant="soft"
          color="success"
        >
          시설 추가
        </Button>
      </Stack>

      <FacilityTypeDialog open={dialog.value} onClose={dialog.onFalse} onSuccess={refetch} />
    </>
  );
}
