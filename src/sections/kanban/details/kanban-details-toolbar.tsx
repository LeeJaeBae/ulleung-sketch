/**
 * @file src/sections/kanban/details/kanban-details-toolbar.tsx
 * @description 칸반 태스크 상세 정보의 상단 툴바 컴포넌트
 * @purpose
 * - 태스크 상세 정보 페이지의 주요 기능 제공
 * - 태스크 삭제, 복사 등의 관리 기능
 * - 태스크 상태 변경 기능
 * @related-components
 * - KanbanDetails: 상위 상세 정보 컴포넌트
 * - CustomPopover: 메뉴 팝오버
 */

import type { BoxProps } from '@mui/material/Box';

import { useState, useCallback } from 'react';
import { useBoolean, usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  liked: boolean;
  taskName: string;
  taskStatus: string;
  onDelete: () => void;
  onLikeToggle: () => void;
  onCloseDetails: () => void;
};

/**
 * @component KanbanDetailsToolbar
 * @description 태스크 상세 정보의 상단 툴바를 렌더링하는 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {Object} props.task - 태스크 정보
 * @param {Function} props.onClose - 상세 정보 닫기 핸들러
 * @param {Function} props.onDelete - 태스크 삭제 핸들러
 * @param {Function} props.onUpdateTask - 태스크 업데이트 핸들러
 */

export function KanbanDetailsToolbar({
  sx,
  liked,
  taskName,
  onDelete,
  taskStatus,
  onLikeToggle,
  onCloseDetails,
  ...other
}: Props) {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  const menuActions = usePopover();
  const confirmDialog = useBoolean();

  const [status, setStatus] = useState(taskStatus);

  const handleChangeStatus = useCallback(
    (newValue: string) => {
      menuActions.onClose();
      setStatus(newValue);
    },
    [menuActions]
  );

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'top-right' } }}
    >
      <MenuList>
        {['To do', 'In progress', 'Ready to test', 'Done'].map((option) => (
          <MenuItem
            key={option}
            selected={status === option}
            onClick={() => handleChangeStatus(option)}
          >
            {option}
          </MenuItem>
        ))}
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
          Are you sure want to delete <strong> {taskName} </strong>?
        </>
      }
      action={
        <Button variant="contained" color="error" onClick={onDelete}>
          Delete
        </Button>
      }
    />
  );

  return (
    <>
      <Box
        sx={[
          {
            display: 'flex',
            alignItems: 'center',
            p: theme.spacing(2.5, 1, 2.5, 2.5),
            borderBottom: `solid 1px ${theme.vars.palette.divider}`,
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        {!smUp && (
          <Tooltip title="Back">
            <IconButton onClick={onCloseDetails} sx={{ mr: 1 }}>
              <Iconify icon="eva:arrow-ios-back-fill" />
            </IconButton>
          </Tooltip>
        )}

        <Button
          size="small"
          variant="soft"
          endIcon={<Iconify icon="eva:arrow-ios-downward-fill" width={16} sx={{ ml: -0.5 }} />}
          onClick={menuActions.onOpen}
        >
          {status}
        </Button>

        <Box component="span" sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex' }}>
          <Tooltip title="Like">
            <IconButton color={liked ? 'default' : 'primary'} onClick={onLikeToggle}>
              <Iconify icon="ic:round-thumb-up" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete task">
            <IconButton onClick={confirmDialog.onTrue}>
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>
          </Tooltip>

          <IconButton>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Box>
      </Box>

      {renderMenuActions()}
      {renderConfirmDialog()}
    </>
  );
}
