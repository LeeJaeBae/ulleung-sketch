'use client';

import { memo } from 'react';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';

import { CustomPopoverProps } from './types';
import { StyledArrow } from './styles';

// ----------------------------------------------------------------------

function CustomPopover({ open, children, arrow, sx, ...other }: CustomPopoverProps) {
  const arrowStyle = {
    [arrow!]: {
      width: 24,
      height: 24,
      position: 'absolute',
      ...(arrow === 'top-left' && {
        top: 0,
        left: 24,
        transform: 'translate(-50%, -50%) rotate(45deg)',
      }),
      ...(arrow === 'top-right' && {
        top: 0,
        right: 24,
        transform: 'translate(50%, -50%) rotate(45deg)',
      }),
      ...(arrow === 'bottom-left' && {
        bottom: 0,
        left: 24,
        transform: 'translate(-50%, 50%) rotate(45deg)',
      }),
      ...(arrow === 'bottom-right' && {
        bottom: 0,
        right: 24,
        transform: 'translate(50%, 50%) rotate(45deg)',
      }),
      ...(arrow === 'left-top' && {
        top: 24,
        left: 0,
        transform: 'translate(-50%, -50%) rotate(45deg)',
      }),
      ...(arrow === 'right-top' && {
        top: 24,
        right: 0,
        transform: 'translate(50%, -50%) rotate(45deg)',
      }),
    },
  };

  return (
    <Popover
      open={open}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: {
          width: 'auto',
          overflow: 'inherit',
          ...sx,
        },
      }}
      {...other}
    >
      {arrow && <StyledArrow sx={arrowStyle} />}

      {children}
    </Popover>
  );
}

export default memo(CustomPopover);
