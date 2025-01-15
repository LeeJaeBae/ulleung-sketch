import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const StyledArrow = styled('span')(({ theme }) => ({
  width: 24,
  height: 24,
  position: 'absolute',
  '&:before': {
    width: '100%',
    height: '100%',
    zIndex: -1,
    content: '""',
    display: 'block',
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    transform: 'rotate(45deg)',
    boxShadow: theme.shadows[1],
  },
}));
