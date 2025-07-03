import { createTheme } from '@mui/material/styles';

const PRIMARY_COLOR = '#1976d2';
const SIDEBAR_LINK_COLOR = PRIMARY_COLOR;
const SIDEBAR_LINK_ACTIVE_BG = '#e3f2fd';
const BUTTON_COLOR = PRIMARY_COLOR;

const theme = createTheme({
  palette: {
    primary: { main: PRIMARY_COLOR },
    background: { default: '#f4f6fa' },
  },
  typography: {
    fontFamily: 'Roboto, Arial',
    h6: { fontWeight: 700 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-containedPrimary': {
            color: '#fff',
            backgroundColor: PRIMARY_COLOR,
            borderColor: PRIMARY_COLOR,
            '&:hover': {
              backgroundColor: '#115293',
              borderColor: PRIMARY_COLOR,
            },
          },
          '&.MuiButton-outlinedPrimary': {
            color: PRIMARY_COLOR,
            borderColor: PRIMARY_COLOR,
            backgroundColor: '#fff',
            '&:hover': {
              backgroundColor: SIDEBAR_LINK_ACTIVE_BG,
              borderColor: PRIMARY_COLOR,
            },
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: SIDEBAR_LINK_COLOR,
          '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: SIDEBAR_LINK_ACTIVE_BG,
            color: PRIMARY_COLOR,
          },
          '&:hover': {
            backgroundColor: SIDEBAR_LINK_ACTIVE_BG,
            color: PRIMARY_COLOR,
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: SIDEBAR_LINK_COLOR,
        },
      },
    },
  },
});

export default theme; 