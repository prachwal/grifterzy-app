import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import serverless from 'serverless-http';
import logger from './middleware/logger';
import debugLib from 'debug';

// Initialize debug
const debug = debugLib('app');

// Inicjalizacja aplikacji Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Ensure JSON parsing is enabled
app.use(bodyParser.urlencoded({ extended: true })); // Add support for URL-encoded data

// Typy danych
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Przykładowe dane
const users: User[] = [
  { id: 1, name: "Jan Kowalski", email: "jan@example.com", role: "admin" },
  { id: 2, name: "Anna Nowak", email: "anna@example.com", role: "user" },
  { id: 3, name: "Piotr Wiśniewski", email: "piotr@example.com", role: "user" },
  { id: 4, name: "Marta Lis", email: "marta@example.com", role: "moderator" }
];

app.set('users', users);

// Konfiguracja routera dla funkcji Netlify
const router = express.Router();

// Logowanie zapytań
app.use(logger);

// Debug endpoint - sprawdza czy API działa
router.get('/', (_req: Request, res: Response) => {
  debug('Root endpoint hit');
  res.json({ message: "API działa poprawnie" });
});

// Pobierz wszystkich użytkowników
router.get('/users', (_req: Request, res: Response) => {
  debug('Fetching all users');
  res.json(users);
});

// Pobierz użytkownika po ID
router.get('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  debug(`Fetching user with ID: ${id}`);
  const user = users.find(u => u.id === id);
  
  if (!user) {
    debug(`User with ID: ${id} not found`);
    return res.status(404).json({ message: "Użytkownik nie został znaleziony" });
  }
  
  return res.json(user);
});

// Dodaj nowego użytkownika
router.post('/users', (req: Request, res: Response) => {
  // Log the received Content-Type header
  debug(`Received Content-Type: ${req.headers['content-type']}`);
  
  const userData = req.body;
  // Log the received body
  debug('Received req.body:', userData); 
  
  // Check if userData is a buffer/binary and try parsing if necessary
  // This is a diagnostic step, ideally bodyParser should handle this
  let parsedUserData = userData;
  if (Buffer.isBuffer(userData)) {
      debug('req.body is a Buffer, attempting manual JSON parse.');
      try {
          parsedUserData = JSON.parse(userData.toString());
          debug('Manual parse successful:', parsedUserData);
      } catch (e) {
          debug('Manual JSON parse failed:', e);
          return res.status(400).json({ message: "Invalid JSON format in request body" });
      }
  } else if (typeof userData === 'string') {
      debug('req.body is a string, attempting manual JSON parse.');
       try {
          parsedUserData = JSON.parse(userData);
          debug('Manual parse successful:', parsedUserData);
      } catch (e) {
          debug('Manual JSON parse failed:', e);
          return res.status(400).json({ message: "Invalid JSON format in request body" });
      }
  }


  debug('Adding new user with data:', parsedUserData);
  
  // Validacja danych using parsedUserData
  if (!parsedUserData || !parsedUserData.name || !parsedUserData.email) {
    debug('Validation failed: name or email missing');
    return res.status(400).json({ message: "Imię i email są wymagane" });
  }
  
  // Tworzenie nowego użytkownika using parsedUserData
  const newUser: User = {
    id: users.length + 1,
    name: parsedUserData.name,
    email: parsedUserData.email,
    role: parsedUserData.role || "user"
  };
  
  // Dodaj do kolekcji
  users.push(newUser);
  debug('User added successfully', newUser);
  
  return res.status(201).json(newUser);
});

// Aktualizuj użytkownika
router.put('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const userData = req.body;
  debug(`Updating user with ID: ${id}`, userData);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    debug(`User with ID: ${id} not found`);
    return res.status(404).json({ message: "Użytkownik nie został znaleziony" });
  }
  
  // Validacja danych
  if (!userData.name || !userData.email) {
    debug('Validation failed: name or email missing');
    return res.status(400).json({ message: "Imię i email są wymagane" });
  }
  
  // Aktualizuj użytkownika
  users[userIndex] = {
    ...users[userIndex],
    name: userData.name,
    email: userData.email,
    role: userData.role || users[userIndex].role
  };
  debug('User updated successfully', users[userIndex]);
  
  return res.json(users[userIndex]);
});

// Usuń użytkownika
router.delete('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  debug(`Deleting user with ID: ${id}`);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    debug(`User with ID: ${id} not found`);
    return res.status(404).json({ message: "Użytkownik nie został znaleziony" });
  }
  
  const deletedUser = users.splice(userIndex, 1)[0];
  debug('User deleted successfully', deletedUser);
  return res.json(deletedUser);
});

// Obsługa błędów
app.use((err: Error, _req: Request, res: Response, _next: any) => {
  debug('Server error:', err);
  res.status(500).json({ 
    message: "Wystąpił błąd wewnętrzny serwera",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Podłączenie routera do ścieżki /.netlify/functions/api
app.use('/.netlify/functions/api', router);

// Dla lokalnego rozwoju poza Netlify Functions
if (process.env.NODE_ENV === 'development') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    debug(`Serwer Express uruchomiony na porcie ${PORT}`);
  });
}

// Eksport aplikacji Express i handlera dla Netlify Functions
export default app;
export const handler = serverless(app);