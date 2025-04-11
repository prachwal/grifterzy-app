import React from 'react';
import { Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import UsersList from '../../components/users/UsersList';

const UsersManagement: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('users.title', 'Users Management')}
      </Typography>
      
      <Typography variant="body1" paragraph>
        {t('users.description', 'Manage users, assign roles, and control access to system features.')}
      </Typography>
      
      <UsersList />
    </Box>
  );
};

export default UsersManagement;
