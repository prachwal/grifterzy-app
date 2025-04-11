import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

const ApiEndpoints: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box mt={4} className="api-endpoints">
      <Typography variant="h6" component="h3" gutterBottom>
        {t('api.endpoints.title', 'API Endpoints')}
      </Typography>
      <Box component="ul" sx={{ listStyleType: 'none', padding: 0 }}>
        <Box component="li">
          <code>GET /.netlify/functions/api/users</code> - {t('api.endpoints.getAll', 'Get all users')}
        </Box>
        <Box component="li">
          <code>GET /.netlify/functions/api/users/:id</code> - {t('api.endpoints.getOne', 'Get user by ID')}
        </Box>
        <Box component="li">
          <code>POST /.netlify/functions/api/users</code> - {t('api.endpoints.create', 'Create new user')}
        </Box>
        <Box component="li">
          <code>PUT /.netlify/functions/api/users/:id</code> - {t('api.endpoints.update', 'Update user')}
        </Box>
        <Box component="li">
          <code>DELETE /.netlify/functions/api/users/:id</code> - {t('api.endpoints.delete', 'Delete user')}
        </Box>
      </Box>
    </Box>
  );
};

export default ApiEndpoints;
