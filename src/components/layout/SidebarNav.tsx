import React, { useState } from 'react';
import { 
  List, 
  ListItem, 
  ListItemButton,
  ListItemIcon, 
  ListItemText, 
  Collapse,
  Divider,
  Box,
  Toolbar,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import PieChartIcon from '@mui/icons-material/PieChart';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';

interface SidebarNavProps {
  onItemClick?: () => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ onItemClick }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const location = useLocation();
  const [reportsOpen, setReportsOpen] = useState(location.pathname.startsWith('/reports'));

  const handleReportsClick = () => {
    setReportsOpen(!reportsOpen);
  };

  const handleNavClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
          Grifterzy
        </Typography>
      </Toolbar>
      <Divider />
      
      {/* Main Navigation */}
      <List>
        <ListItem disablePadding>
          <ListItemButton 
            component={Link} 
            to="/dashboard"
            selected={location.pathname === '/dashboard'}
            onClick={handleNavClick}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={t('nav.dashboard', 'Dashboard')} />
          </ListItemButton>
        </ListItem>
        
        <ListItem disablePadding>
          <ListItemButton 
            component={Link} 
            to="/search"
            selected={location.pathname === '/search'}
            onClick={handleNavClick}
          >
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary={t('nav.search', 'Search')} />
          </ListItemButton>
        </ListItem>
        
        <ListItem disablePadding>
          <ListItemButton 
            onClick={handleReportsClick}
            selected={location.pathname.startsWith('/reports')}
          >
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary={t('nav.reports', 'Reports')} />
            {reportsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        
        <Collapse in={reportsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton 
              sx={{ pl: 4 }} 
              component={Link}
              to="/reports/sales"
              selected={location.pathname === '/reports/sales'}
              onClick={handleNavClick}
            >
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary={t('nav.reports.sales', 'Sales')} />
            </ListItemButton>
            
            <ListItemButton 
              sx={{ pl: 4 }}
              component={Link}
              to="/reports/trends"
              selected={location.pathname === '/reports/trends'}
              onClick={handleNavClick}
            >
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText primary={t('nav.reports.trends', 'Trends')} />
            </ListItemButton>
            
            <ListItemButton 
              sx={{ pl: 4 }}
              component={Link}
              to="/reports/analytics"
              selected={location.pathname === '/reports/analytics'}
              onClick={handleNavClick}
            >
              <ListItemIcon>
                <PieChartIcon />
              </ListItemIcon>
              <ListItemText primary={t('nav.reports.analytics', 'Analytics')} />
            </ListItemButton>
          </List>
        </Collapse>
        
        <ListItem disablePadding>
          <ListItemButton 
            component={Link}
            to="/users"
            selected={location.pathname === '/users'}
            onClick={handleNavClick}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={t('nav.users', 'Users')} />
          </ListItemButton>
        </ListItem>
      </List>
      
      <Divider />
      
      <List>
        <ListItem disablePadding>
          <ListItemButton 
            component={Link}
            to="/about"
            selected={location.pathname === '/about'}
            onClick={handleNavClick}
          >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={t('nav.about', 'About Us')} />
          </ListItemButton>
        </ListItem>
        
        <ListItem disablePadding>
          <ListItemButton 
            component={Link}
            to="/login"
            selected={location.pathname === '/login'}
            onClick={handleNavClick}
          >
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary={t('nav.login', 'Login')} />
          </ListItemButton>
        </ListItem>
      </List>
      
      {/* Settings at the bottom */}
      <Box sx={{ 
        position: 'absolute', 
        bottom: 0, 
        width: '100%',
        borderTop: `1px solid ${theme.palette.divider}`
      }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton 
              component={Link}
              to="/settings"
              selected={location.pathname === '/settings'}
              onClick={handleNavClick}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={t('nav.settings', 'Settings')} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default SidebarNav;
