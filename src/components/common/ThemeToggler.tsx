import React from 'react';
import { IconButton, Tooltip, useTheme as useMuiTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const ThemeToggler: React.FC = () => {
  const { mode, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const muiTheme = useMuiTheme();
  
  // Use the current mui theme which has all properties fully resolved
  // This avoids TypeScript errors with the theme options object
  const buttonColor = mode === 'light' 
    ? muiTheme.palette.secondary.main
    : muiTheme.palette.primary.main;

  return (
    <Tooltip 
      title={
        mode === 'light' 
          ? t('theme.switchToDark', 'Przełącz na ciemny motyw') 
          : t('theme.switchToLight', 'Przełącz na jasny motyw')
      }
    >
      <IconButton 
        onClick={toggleTheme} 
        sx={{
          color: buttonColor,
          backgroundColor: muiTheme.palette.action.hover,
          '&:hover': {
            backgroundColor: muiTheme.palette.action.selected,
          }
        }}
      >
        {mode === 'light' 
          ? <Brightness4Icon /> 
          : <Brightness7Icon />
        }
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggler;
