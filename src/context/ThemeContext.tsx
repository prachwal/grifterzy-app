import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, PaletteMode, CssBaseline } from '@mui/material';
import lightTheme from '../assets/styles/themes/lightTheme';
import darkTheme from '../assets/styles/themes/darkTheme';

type ThemeContextType = {
  mode: PaletteMode;
  toggleTheme: () => void;
  currentTheme: typeof lightTheme; // Add the current theme object to the context
};

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleTheme: () => {},
  currentTheme: lightTheme,
});

export const useTheme = () => useContext(ThemeContext);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Get initial mode from localStorage or system preference
  const getInitialMode = (): PaletteMode => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      return savedMode as PaletteMode;
    }
    
    // Use system preference as fallback
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  };

  const [mode, setMode] = useState<PaletteMode>(getInitialMode);

  // Save theme preference and update data-theme attribute
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Get current theme config based on mode
  const currentThemeConfig = mode === 'light' ? lightTheme : darkTheme;
  
  // Create theme based on current mode
  const theme = createTheme(currentThemeConfig);

  // Export CSS variables for use in SCSS
  useEffect(() => {
    // Extract colors from theme and add as CSS variables on :root
    const root = document.documentElement;
    if (currentThemeConfig.palette) {
      const { palette } = currentThemeConfig;
      
      // Type-safe way to extract and set CSS variables
      // Primary colors
      if (palette.primary) {
        // Cast to any to bypass TypeScript type checking since we know these properties exist
        const primary = palette.primary as any;
        if (primary.main) root.style.setProperty('--theme-primary-main', primary.main);
        if (primary.light) root.style.setProperty('--theme-primary-light', primary.light);
        if (primary.dark) root.style.setProperty('--theme-primary-dark', primary.dark);
      }
      
      // Secondary colors
      if (palette.secondary) {
        const secondary = palette.secondary as any;
        if (secondary.main) root.style.setProperty('--theme-secondary-main', secondary.main);
        if (secondary.light) root.style.setProperty('--theme-secondary-light', secondary.light);
        if (secondary.dark) root.style.setProperty('--theme-secondary-dark', secondary.dark);
      }
      
      // Background colors
      if (palette.background) {
        const background = palette.background as any;
        if (background.default) root.style.setProperty('--theme-background-default', background.default);
        if (background.paper) root.style.setProperty('--theme-background-paper', background.paper);
      }
      
      // Text colors
      if (palette.text) {
        const text = palette.text as any;
        if (text.primary) root.style.setProperty('--theme-text-primary', text.primary);
        if (text.secondary) root.style.setProperty('--theme-text-secondary', text.secondary);
      }
    }
  }, [currentThemeConfig]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, currentTheme: currentThemeConfig }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
