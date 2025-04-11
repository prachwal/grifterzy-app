import React from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';
import GoogleAuthButton from '../../components/auth/GoogleAuthButton';
import Layout from '../../components/layout/Layout';

const Login: React.FC = () => {
  return (
    <Layout title="Authentication">
      <Box sx={{ py: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Authentication
        </Typography>
        
        <Typography variant="body1" paragraph>
          Sign in to access all features of the application.
        </Typography>
        
        <Paper sx={{ p: 3, mt: 3, maxWidth: 500 }}>
          <Typography variant="h6" gutterBottom>
            User Account
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <GoogleAuthButton />
        </Paper>
      </Box>
    </Layout>
  );
};

export default Login;
