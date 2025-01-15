import { PopoverProps } from '@mui/material/Popover';

// ----------------------------------------------------------------------

export interface CustomPopoverProps extends Omit<PopoverProps, 'open'> {
  open: boolean;
  onClose: VoidFunction;
  arrow?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left-top' | 'right-top';
}
