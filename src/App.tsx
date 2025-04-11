import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Import styles
import './assets/styles/scss/main.scss';

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId="802826185441-kjjlcqbn5ftspjn2urv7jidhcvjk7543.apps.googleusercontent.com">
      <ThemeProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;