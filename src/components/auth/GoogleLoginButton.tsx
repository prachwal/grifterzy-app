import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Box, Typography } from '@mui/material';

const GoogleLoginButton: React.FC<{ onSuccess: (response: any) => void; onError: () => void }> = ({ onSuccess, onError }) => {
  return (
    <Box sx={{ textAlign: 'center', mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Sign in with Google
      </Typography>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
      />
    </Box>
  );
};

export default GoogleLoginButton;
