import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Input from '@mui/material/Input';

import { Iconify } from 'src/components/iconify';

type Specification = {
  key: string;
  value: string;
};

type Props = {
  value: Record<string, any> | null;
  onChange: (value: Record<string, any>) => void;
};

export function SpecificationEditor({ value, onChange }: Props) {
  const [specs, setSpecs] = useState<Specification[]>(() => {
    if (!value) return [];
    return Object.entries(value).map(([key, value]) => ({
      key,
      value: String(value),
    }));
  });

  const handleAdd = () => {
    setSpecs((prev) => [...prev, { key: '', value: '' }]);
  };

  const handleRemove = (index: number) => {
    setSpecs((prev) => prev.filter((_, i) => i !== index));
    const newValue = specs.reduce((acc, { key, value }, i) => {
      if (i === index) return acc;
      return { ...acc, [key]: value };
    }, {});
    onChange(newValue);
  };

  const handleChange = (index: number, field: 'key' | 'value', newValue: string) => {
    setSpecs((prev) => {
      const updated = prev.map((spec, i) => {
        if (i !== index) return spec;
        return { ...spec, [field]: newValue };
      });

      const newSpecs = updated.reduce((acc, { key, value }) => {
        if (!key) return acc;
        return { ...acc, [key]: value };
      }, {});

      onChange(newSpecs);
      return updated;
    });
  };

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        선박 사양
      </Typography>

      <Stack spacing={2}>
        {specs.map((spec, index) => (
          <Stack key={index} direction="row" spacing={1} alignItems="center">
            <Input
              value={spec.key}
              onChange={(e) => handleChange(index, 'key', e.target.value)}
              placeholder="사양 항목"
              sx={{ flex: 1 }}
            />
            <Input
              value={spec.value}
              onChange={(e) => handleChange(index, 'value', e.target.value)}
              placeholder="값"
              sx={{ flex: 2 }}
            />
            <IconButton onClick={() => handleRemove(index)} color="error">
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>
          </Stack>
        ))}

        <Button
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleAdd}
          variant="soft"
          color="success"
        >
          사양 추가
        </Button>
      </Stack>
    </Card>
  );
}
