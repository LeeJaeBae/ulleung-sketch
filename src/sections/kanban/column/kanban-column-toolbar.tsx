/**
 * @file src/sections/kanban/column/kanban-column-toolbar.tsx
 * @description 칸반 컬럼의 상단 툴바 컴포넌트
 * @purpose
 * - 컬럼 제목 및 작업 개수 표시
 * - 컬럼 관리 메뉴 제공 (삭제, 초기화 등)
 * - 새 작업 추가 기능 제공
 * @related-components
 * - KanbanColumn: 상위 컬럼 컴포넌트
 * - CustomPopover: 메뉴 팝오버
 */

import type { BoxProps } from '@mui/material/Box';

import { varAlpha } from 'minimal-shared/utils';
import { useBoolean, usePopover } from 'minimal-shared/hooks';
import { useId, useRef, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';

import { KanbanInputName } from '../components/kanban-input-name';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  handleProps?: any;
  totalTasks?: number;
  columnName: string;
  onClearColumn?: () => void;
  onDeleteColumn?: () => void;
  onToggleAddTask?: () => void;
  onUpdateColumn?: (inputName: string) => void;
};

/**
 * @component KanbanColumnToolbar
 * @description 칸반 컬럼의 상단 툴바를 렌더링하는 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.name - 컬럼 이름
 * @param {number} props.taskCount - 컬럼 내 작업 개수
 * @param {Function} props.onDelete - 컬럼 삭제 핸들러
 * @param {Function} props.onClear - 컬럼 초기화 핸들러
 * @param {Function} props.onAddTask - 새 작업 추가 핸들러
 */

export function KanbanColumnToolBar({
  sx,
  columnName,
  totalTasks,
  handleProps,
  onClearColumn,
  onToggleAddTask,
  onDeleteColumn,
  onUpdateColumn,
}: Props) {
  const inputId = useId();

  const renameRef = useRef<HTMLInputElement>(null);

  const menuActions = usePopover();
  const confirmDialog = useBoolean();

  const [name, setName] = useState(columnName);

  useEffect(() => {
    if (menuActions.open) {
      if (renameRef.current) {
        renameRef.current.focus();
      }
    }
  }, [menuActions.open]);

  const handleChangeName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);

  const handleKeyUpUpdateColumn = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        if (renameRef.current) {
          renameRef.current.blur();
        }
        onUpdateColumn?.(name);
      }
    },
    [name, onUpdateColumn]
  );

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
    >
      <MenuList>
        <MenuItem onClick={menuActions.onClose}>
          <Iconify icon="solar:pen-bold" />
          Rename
        </MenuItem>

        <MenuItem
          onClick={() => {
            onClearColumn?.();
            menuActions.onClose();
          }}
        >
          <Iconify icon="solar:eraser-bold" />
          Clear
        </MenuItem>

        <MenuItem
          onClick={() => {
            confirmDialog.onTrue();
            menuActions.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Delete"
      content={
        <>
          Are you sure want to delete column?
          <Box sx={{ typography: 'caption', color: 'error.main', mt: 2 }}>
            <strong> NOTE: </strong> All tasks related to this category will also be deleted.
          </Box>
        </>
      }
      action={
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            onDeleteColumn?.();
            confirmDialog.onFalse();
          }}
        >
          Delete
        </Button>
      }
    />
  );

  return (
    <>
      <Box sx={[{ display: 'flex', alignItems: 'center' }, ...(Array.isArray(sx) ? sx : [sx])]}>
        <Label
          sx={[
            (theme) => ({
              borderRadius: '50%',
              borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.24),
            }),
          ]}
        >
          {totalTasks}
        </Label>

        <KanbanInputName
          inputRef={renameRef}
          placeholder="Column name"
          value={name}
          onChange={handleChangeName}
          onKeyUp={handleKeyUpUpdateColumn}
          inputProps={{ id: `${columnName}-${inputId}-column-input` }}
          sx={{ mx: 1 }}
        />

        <IconButton size="small" color="inherit" onClick={onToggleAddTask}>
          <Iconify icon="solar:add-circle-bold" />
        </IconButton>

        <IconButton
          size="small"
          color={menuActions.open ? 'inherit' : 'default'}
          onClick={menuActions.onOpen}
        >
          <Iconify icon="solar:menu-dots-bold-duotone" />
        </IconButton>

        <IconButton size="small" {...handleProps}>
          <Iconify icon="nimbus:drag-dots" />
        </IconButton>
      </Box>

      {renderMenuActions()}
      {renderConfirmDialog()}
    </>
  );
}
