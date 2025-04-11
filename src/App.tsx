import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes';

// Import styles
import './assets/styles/scss/main.scss';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
};

export default App;