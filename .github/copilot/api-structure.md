# Dokumentacja API Express

## Architektura API

API aplikacji Grifterzy jest zbudowane przy użyciu Express.js i jest zorganizowane według następujących zasad:

## Struktura plików

```text
src/api/
  ├── app.ts                    # Główna konfiguracja Express
  ├── middleware/               # Middleware aplikacji
  ├── routes/                   # Definicje tras (routing)
  │   ├── index.ts              # Główny plik routera
  │   ├── users.ts              # Trasy związane z użytkownikami
  │   └── ...                   # Inne moduły tras
  ├── controllers/              # Kontrolery obsługujące logikę biznesową
  │   ├── userController.ts     # Kontroler użytkowników
  │   └── ...                   # Inne kontrolery
  ├── models/                   # Modele danych
  │   ├── User.ts               # Model użytkownika
  │   └── ...                   # Inne modele
  └── utils/                    # Narzędzia pomocnicze
```

## Konwencje endpoint API

### Organizacja endpointów

- **Każdy zasób powinien mieć własny plik routera** w folderze `routes/`
- **Każdy kontroler powinien być w osobnym pliku** w folderze `controllers/`
- Stosuj RESTful API design:
  - `GET /resource` - Lista zasobów
  - `GET /resource/:id` - Pojedynczy zasób
  - `POST /resource` - Tworzenie zasobu
  - `PUT /resource/:id` - Pełna aktualizacja zasobu
  - `PATCH /resource/:id` - Częściowa aktualizacja zasobu
  - `DELETE /resource/:id` - Usunięcie zasobu

### Przykładowa struktura endpointu

Dla każdego endpointu należy zachować poniższy wzorzec:

1. **Router (routes/users.ts)**:

    ```typescript
    import express from 'express';
    import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController';

    const router = express.Router();

    router.get('/', getUsers);
    router.get('/:id', getUserById);
    router.post('/', createUser);
    router.put('/:id', updateUser);
    router.delete('/:id', deleteUser);

    export default router;
    ```

2. **Kontroler (controllers/userController.ts)**:

    ```typescript
    import { Request, Response } from 'express';
    import User from '../models/User';

    // Pobierz wszystkich użytkowników
    export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
    };

// Implementacja pozostałych metod...

### Obsługa błędów

- Używaj odpowiednich kodów HTTP do sygnalizowania błędów
- Zawsze zwracaj obiekt JSON z informacją o błędzie
- Standaryzuj format odpowiedzi błędów:

```typescript
{
  "status": "error",
  "message": "Szczegółowy opis błędu",
  "code": "USER_NOT_FOUND" // Opcjonalny kod błędu
}
```

### Walidacja danych wejściowych

- Zawsze waliduj dane wejściowe od użytkownika
- Używaj middleware do walidacji przed przesłaniem do kontrolera
- Przykład z użyciem express-validator:

```typescript
import { body, validationResult } from 'express-validator';

// Walidacja dla tworzenia użytkownika
const validateUserCreation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('role').isIn(['user', 'admin', 'moderator']).withMessage('Invalid role'),
  
  // Middleware sprawdzające wyniki walidacji
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Użycie w routerze
router.post('/', validateUserCreation, createUser);
```

## Format odpowiedzi API

Standardowy format odpowiedzi:

```json
{
  "status": "success",
  "data": { /* dane odpowiedzi */ }
}
```

W przypadku błędu:

```json
{
  "status": "error",
  "message": "Opis błędu",
  "code": "KOD_BŁĘDU" // opcjonalnie
}
```

## Rozszerzanie API

Podczas dodawania nowych endpointów:

1. Utwórz nowy plik routera w folderze `routes/` jeśli dotyczy nowego zasobu
2. Dodaj nowy kontroler lub zaktualizuj istniejący w folderze `controllers/`
3. Zarejestruj router w głównym pliku `routes/index.ts`
4. W razie potrzeby, dodaj model w folderze `models/`
5. Dodaj dokumentację nowego endpointu w tym pliku
