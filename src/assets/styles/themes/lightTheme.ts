import { ThemeOptions } from '@mui/material/styles';

const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#2c3e50',
      light: '#3e5771',
      dark: '#1e2b38',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#3498db',
      light: '#5dade2',
      dark: '#2980b9',
      contrastText: '#ffffff',
    },
    success: {
      main: '#27ae60',
      light: '#2ecc71',
      dark: '#219955',
    },
    error: {
      main: '#e74c3c',
      light: '#f5b7b1',
      dark: '#c0392b',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    divider: '#e0e0e0',
  },
  typography: {
    fontFamily: 
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
};

export default lightTheme;
