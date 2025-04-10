import serverless from 'serverless-http';
import app from '../../src/api/app';

// Wrappowanie aplikacji Express w handler funkcji Netlify
export const handler = serverless(app);