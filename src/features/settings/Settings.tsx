import React, { useState } from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Tabs, 
  Tab, 
  Divider, 
  FormControlLabel, 
  Switch,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Stack
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ThemeToggler from '../../components/common/ThemeToggler';
import LanguageSwitcher from '../../components/common/LanguageSwitcher';

const Settings: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('settings.title', 'Settings')}
      </Typography>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label={t('settings.tabs.general', 'General')} />
          <Tab label={t('settings.tabs.account', 'Account')} />
          <Tab label={t('settings.tabs.notifications', 'Notifications')} />
          <Tab label={t('settings.tabs.appearance', 'Appearance')} />
          <Tab label={t('settings.tabs.privacy', 'Privacy')} />
        </Tabs>
      </Paper>
      
      {/* General Settings */}
      {activeTab === 0 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            {t('settings.general.title', 'General Settings')}
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <List>
            <ListItem>
              <ListItemText 
                primary={t('settings.general.language', 'Language')}
                secondary={t('settings.general.languageDescription', 'Select your preferred language')}
              />
              <Box sx={{ minWidth: 200 }}>
                <LanguageSwitcher />
              </Box>
            </ListItem>
            
            <Divider component="li" />
            
            <ListItem>
              <ListItemText 
                primary={t('settings.general.theme', 'Theme')}
                secondary={t('settings.general.themeDescription', 'Toggle between light and dark mode')}
              />
              <ThemeToggler />
            </ListItem>
            
            <Divider component="li" />
            
            <ListItem>
              <ListItemText 
                primary={t('settings.general.timezone', 'Timezone')}
                secondary={t('settings.general.timezoneDescription', 'Set your local timezone')}
              />
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <Select
                  value="Europe/Warsaw"
                  onChange={() => {}}
                >
                  <MenuItem value="Europe/Warsaw">Europe/Warsaw</MenuItem>
                  <MenuItem value="Europe/London">Europe/London</MenuItem>
                  <MenuItem value="America/New_York">America/New_York</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
          </List>
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained">
              {t('common.save', 'Save Changes')}
            </Button>
          </Box>
        </Paper>
      )}
      
      {/* Notifications Settings */}
      {activeTab === 2 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            {t('settings.notifications.title', 'Notification Settings')}
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <FormControlLabel
            control={
              <Switch 
                checked={notificationsEnabled} 
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              />
            }
            label={t('settings.notifications.enableAll', 'Enable all notifications')}
          />
          
          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
            {t('settings.notifications.channels', 'Notification Channels')}
          </Typography>
          
          <FormControlLabel
            disabled={!notificationsEnabled}
            control={
              <Switch 
                checked={emailNotifications} 
                onChange={() => setEmailNotifications(!emailNotifications)}
              />
            }
            label={t('settings.notifications.email', 'Email notifications')}
          />
          
          <FormControlLabel
            disabled={!notificationsEnabled}
            control={
              <Switch 
                checked={pushNotifications} 
                onChange={() => setPushNotifications(!pushNotifications)}
              />
            }
            label={t('settings.notifications.push', 'Push notifications')}
          />
          
          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
            {t('settings.notifications.types', 'Notification Types')}
          </Typography>
          
          <List>
            <ListItem sx={{ px: 0 }}>
              <ListItemText 
                primary={t('settings.notifications.system', 'System notifications')}
                secondary={t('settings.notifications.systemDescription', 'Updates and maintenance alerts')}
              />
              <Switch defaultChecked disabled={!notificationsEnabled} />
            </ListItem>
            
            <ListItem sx={{ px: 0 }}>
              <ListItemText 
                primary={t('settings.notifications.security', 'Security alerts')}
                secondary={t('settings.notifications.securityDescription', 'Login attempts and security warnings')}
              />
              <Switch defaultChecked disabled={!notificationsEnabled} />
            </ListItem>
            
            <ListItem sx={{ px: 0 }}>
              <ListItemText 
                primary={t('settings.notifications.marketing', 'Marketing')}
                secondary={t('settings.notifications.marketingDescription', 'Promotions and new features')}
              />
              <Switch disabled={!notificationsEnabled} />
            </ListItem>
          </List>
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained">
              {t('common.save', 'Save Changes')}
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Settings;
