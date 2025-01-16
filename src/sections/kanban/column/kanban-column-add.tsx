/**
 * @file src/sections/kanban/column/kanban-column-add.tsx
 * @description 새로운 칸반 컬럼을 추가하는 컴포넌트
 * @purpose
 * - 새로운 상태(컬럼) 추가 기능 제공
 * - 컬럼 이름 입력 폼 제공
 * - 컬럼 생성 취소 기능
 * @related-components
 * - KanbanColumn: 생성될 컬럼 컴포넌트
 */

import type { BoxProps } from '@mui/material/Box';

import { useState, useCallback } from 'react';
import { uuidv4 } from 'minimal-shared/utils';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { inputBaseClasses } from '@mui/material/InputBase';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { createColumn } from 'src/actions/kanban';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

/**
 * @component KanbanColumnAdd
 * @description 새로운 칸반 컬럼 추가 폼을 렌더링하는 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {Function} props.onAddColumn - 컬럼 추가 핸들러
 * @param {SxProps} props.sx - MUI 스타일 props
 */

export function KanbanColumnAdd({ sx, ...other }: BoxProps) {
  const [columnName, setColumnName] = useState('');

  const openAddColumn = useBoolean();

  const handleChangeName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setColumnName(event.target.value);
  }, []);

  const handleCreateColumn = useCallback(async () => {
    try {
      const columnData = { id: uuidv4(), name: columnName.trim() ? columnName : 'Untitled' };

      createColumn(columnData);

      setColumnName('');

      openAddColumn.onFalse();
    } catch (error) {
      console.error(error);
    }
  }, [columnName, openAddColumn]);

  const handleKeyUpCreateColumn = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleCreateColumn();
      }
    },
    [handleCreateColumn]
  );

  const handleCancel = useCallback(() => {
    setColumnName('');
    openAddColumn.onFalse();
  }, [openAddColumn]);

  return (
    <>
      <Box
        sx={[
          () => ({
            flex: '0 0 auto',
            width: 'var(--column-width)',
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        {openAddColumn.value ? (
          <ClickAwayListener onClickAway={handleCancel}>
            <TextField
              autoFocus
              fullWidth
              placeholder="Untitled"
              value={columnName}
              onChange={handleChangeName}
              onKeyUp={handleKeyUpCreateColumn}
              helperText="Press Enter to create the column."
              sx={{ [`& .${inputBaseClasses.input}`]: { typography: 'h6' } }}
            />
          </ClickAwayListener>
        ) : (
          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="mingcute:add-line" sx={{ mr: -0.5 }} />}
            onClick={openAddColumn.onTrue}
          >
            Add column
          </Button>
        )}
      </Box>

      <Box sx={{ width: '1px', flexShrink: 0 }} />
    </>
  );
}
