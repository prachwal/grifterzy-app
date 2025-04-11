import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Select, 
  MenuItem, 
  SelectChangeEvent, 
  FormControl,
  InputLabel,
  Box,
  Typography,
  useTheme
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  // Determine background color based on theme
  const bgColor = isDarkMode ? '#333333' : '#ffffff';
  const menuBgColor = isDarkMode ? '#333333' : '#ffffff';

  const changeLanguage = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <LanguageIcon sx={{ mr: 1, color: 'text.secondary' }} fontSize="small" />
      <FormControl size="small" variant="outlined" sx={{ minWidth: 120 }}>
        <InputLabel id="language-select-label">
          {t('common.language', 'Language')}
        </InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={i18n.language}
          onChange={changeLanguage}
          label={t('common.language', 'Language')}
          sx={{
            backgroundColor: bgColor,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: isDarkMode ? '#555555' : '#e0e0e0',
            },
            "& .MuiSelect-select": {
              backgroundColor: bgColor
            },
            "& .MuiPaper-root": {
              backgroundColor: menuBgColor
            }
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: menuBgColor,
                boxShadow: isDarkMode ? '0 4px 20px #000000' : '0 2px 10px rgba(0, 0, 0, 0.1)',
                "& .MuiMenuItem-root": {
                  backgroundColor: menuBgColor,
                  "&:hover": {
                    backgroundColor: isDarkMode ? '#444444' : '#f5f5f5'
                  }
                },
                "& .Mui-selected": {
                  backgroundColor: isDarkMode ? '#133450' : 'rgba(25, 118, 210, 0.12)',
                }
              }
            }
          }}
        >
          <MenuItem value="en">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography component="span" sx={{ ml: 1 }}>English</Typography>
            </Box>
          </MenuItem>
          <MenuItem value="pl">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography component="span" sx={{ ml: 1 }}>Polski</Typography>
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSwitcher;