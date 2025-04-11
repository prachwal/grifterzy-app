import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper,
  Container
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <Container maxWidth="md">
      <Paper 
        sx={{ 
          p: 5, 
          mt: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 80, color: 'warning.main', mb: 2 }} />
        
        <Typography variant="h4" gutterBottom>
          {t('errors.notFound.title', '404 - Page Not Found')}
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ maxWidth: 500, mb: 4 }}>
          {t('errors.notFound.message', "Sorry, the page you're looking for doesn't exist or has been moved. Please check the URL or navigate back to the dashboard.")}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="contained"
            component={Link}
            to="/dashboard"
            startIcon={<HomeIcon />}
          >
            {t('errors.notFound.backToHome', 'Go to Dashboard')}
          </Button>
          
          <Button 
            variant="outlined"
            component={Link}
            to="/reports"
          >
            {t('errors.notFound.backToReports', 'Go to Reports')}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotFound;
