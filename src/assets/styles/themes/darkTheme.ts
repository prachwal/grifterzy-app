import { ThemeOptions } from '@mui/material/styles';

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      light: '#bbdefb',
      dark: '#64b5f6',
      contrastText: '#000000',
    },
    secondary: {
      main: '#ce93d8',
      light: '#e1bee7',
      dark: '#ba68c8',
      contrastText: '#000000',
    },
    success: {
      main: '#66bb6a',
      light: '#81c784',
      dark: '#4caf50',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
    },
    background: {
      default: '#2d2d2d', // Changed to a dark gray
      paper: '#333333',   // Changed to a slightly lighter gray
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#aaaaaa',
    },
    divider: '#333333',
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
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    // Add specific styling for Select components
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: '#333333',
        },
        icon: {
          color: '#e0e0e0',
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#333333',
        },
        notchedOutline: {
          borderColor: '#555555',
        }
      }
    },
    // Ensure all menus have solid backgrounds
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#333333',
          boxShadow: '0 4px 20px #000000',
        },
        list: {
          padding: 0,
          backgroundColor: '#333333',
        }
      }
    },
  },
};

export default darkTheme;
