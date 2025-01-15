'use client';

import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export type Ship = {
  id: string;
  name: string;
  type: string;
  capacity: number;
  status: 'active' | 'inactive' | 'maintenance';
};

type Props = {
  row: Ship;
  selected: boolean;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
};

export function ShipTableRow({ row, selected, onSelectRow, onDeleteRow, onEditRow }: Props) {
  const { name, type, capacity, status } = row;

  const confirm = useBoolean();
  const popover = usePopover();

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

    return <Chip label={label} color={color} size="small" />;
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>{name}</TableCell>

        <TableCell>{type}</TableCell>

        <TableCell>{capacity}명</TableCell>

        <TableCell>{renderStatus(status)}</TableCell>

        <TableCell align="right">
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        anchorEl={popover.anchorEl}
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          수정
        </MenuItem>

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          삭제
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="삭제"
        content="이 선박을 삭제하시겠습니까?"
        action={
          <IconButton color="error" onClick={onDeleteRow}>
            삭제
          </IconButton>
        }
      />
    </>
  );
}
