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
    ```

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

- Loguj błędy po stronie serwera, używając np. biblioteki `debug`.

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

- Można rozważyć użycie DTO (Data Transfer Objects) do walidacji danych.

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

Przykłady odpowiedzi:

- Sukces:

```json
{
  "status": "success",
  "data": {
    "id": 123,
    "name": "Jan Kowalski",
    "email": "jan@example.com"
  }
}
```

- Błąd:

```json
{
  "status": "error",
  "message": "Użytkownik nie znaleziony",
  "code": "USER_NOT_FOUND"
}
```

## Rozszerzanie API

Podczas dodawania nowych endpointów:

1. Utwórz nowy plik routera w folderze `routes/` jeśli dotyczy nowego zasobu
2. Dodaj nowy kontroler lub zaktualizuj istniejący w folderze `controllers/`
3. Zarejestruj router w głównym pliku `routes/index.ts`
4. W razie potrzeby, dodaj model w folderze `models/`
5. Dodaj dokumentację nowego endpointu w tym pliku

## Integracja z interfejsem użytkownika

Podczas integracji API z interfejsem użytkownika:

1. **Wykorzystuj poprawne handlery zdarzeń dla komponentów MUI**:
   - Każdy typ komponentu MUI może wymagać innego typu zdarzenia:
     - `TextField` → `React.ChangeEvent<HTMLInputElement>`
     - `Select` → `SelectChangeEvent` z MUI
     - Nie używaj wspólnych handlerów dla różnych typów komponentów

2. **Przykład implementacji formularza z poprawnymi handlerami**:

   ```tsx
   import { SelectChangeEvent } from '@mui/material';
   
   // Dla TextField
   const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     // implementacja dla pól tekstowych
   };
   
   // Dla Select
   const handleSelectChange = (e: SelectChangeEvent) => {
     // implementacja dla selektów
   };
   ```

3. **Obsługa odpowiedzi z API**:
   - Zawsze uwzględniaj obsługę stanów ładowania oraz błędów
   - Po operacji na API (np. dodanie, usunięcie) odświeżaj dane
   - W przypadku błędu wyświetlaj odpowiedni komunikat użytkownikowi

4. **Walidacja danych po stronie klienta**:
   - Przed wysłaniem żądania do API waliduj dane również po stronie klienta
   - Używaj właściwości `required`, `minLength`, itp. dla pól formularza
   - Rozważ użycie bibliotek do walidacji, np. Formik, React Hook Form

5. W interfejsie użytkownika zawsze korzystaj z komponentów z biblioteki MUI (Material UI), aby zachować spójność wizualną.

6. **Używaj prawidłowej składni dla Grid**:
   - W projekcie używamy niestandardowej składni dla komponentu Grid
   - Zamiast atrybutów `xs`, `sm`, i `md` używaj atrybutu `size`:
   
   ```tsx
   <Grid container spacing={3}>
     <Grid size={{ xs: 12, sm: 6, md: 3 }}>
       {/* Zawartość */}
     </Grid>
   </Grid>
   ```
