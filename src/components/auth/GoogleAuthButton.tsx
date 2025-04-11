import React, { useState, useEffect } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { 
  Box, 
  Button, 
  Typography, 
  Avatar, 
  Stack, 
  Alert
} from '@mui/material';
import { jwtDecode } from "jwt-decode";

// Update the interface to match Google's actual JWT structure
interface GoogleUser {
  name?: string;
  email?: string;
  picture?: string;
  sub?: string;
  given_name?: string;
  family_name?: string;
  exp?: number;
  iat?: number;
}

const GoogleAuthButton: React.FC = () => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pictureUrl, setPictureUrl] = useState<string | null>(null);

  // Check for existing token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('googleToken');
    if (storedToken) {
      try {
        const decodedUser = jwtDecode<GoogleUser>(storedToken);
        // Check if token is expired
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedUser.exp && decodedUser.exp > currentTime) {
          setUser(decodedUser);
        } else {
          // Token expired
          localStorage.removeItem('googleToken');
          setUser(null);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('googleToken');
      }
    }
  }, []);

  // Effect to handle and validate the picture URL
  useEffect(() => {
    if (user?.picture) {
      // Log the picture URL for debugging
      console.log('Picture URL from token:', user.picture);
      
      // Create a new Image to verify the URL is valid
      const img = new Image();
      img.onload = () => {
        console.log('Image loaded successfully');
        setPictureUrl(user.picture || null);
      };
      img.onerror = () => {
        console.error('Failed to load image from:', user.picture);
        setPictureUrl(null);
      };
      img.src = user.picture;
    } else {
      setPictureUrl(null);
    }
  }, [user]);

  const handleLoginSuccess = (credentialResponse: any) => {
    try {
      const token = credentialResponse.credential;
      localStorage.setItem('googleToken', token);
      
      // Decode the JWT token
      const decodedUser = jwtDecode<GoogleUser>(token);
      
      // Log the entire decoded user object to debug
      console.log('Decoded user full data:', JSON.stringify(decodedUser, null, 2));
      
      setUser(decodedUser);
      setError(null);
    } catch (error) {
      console.error('Error handling login success:', error);
      setError('Failed to process login information');
    }
  };

  const handleLoginError = () => {
    console.error('Google Login Failed');
    setError('Google login failed. Please try again.');
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('googleToken');
    setUser(null);
  };

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {user ? (
        <Box>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Avatar 
              src={pictureUrl || undefined} 
              alt={user.name || 'User'} 
              sx={{ 
                width: 56, 
                height: 56,
                bgcolor: !pictureUrl ? 'primary.main' : undefined 
              }}
            >
              {!pictureUrl && (user.name?.charAt(0) || 'U')}
            </Avatar>
            <Box>
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          </Stack>
          
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleLogout}
            fullWidth
          >
            Sign Out
          </Button>
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Please sign in with your Google account to continue
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin 
              onSuccess={handleLoginSuccess} 
              onError={handleLoginError}
              theme="outline"
              size="large"
              width="250px"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default GoogleAuthButton;
