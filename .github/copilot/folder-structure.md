# Struktura folderów w projekcie Grifterzy

## Przegląd struktury katalogów

```text
src/
  ├── api/               # Kod backendowy API Express
  ├── components/        # Komponenty React
  │   ├── common/        # Współdzielone komponenty wielokrotnego użytku
  │   ├── ui/            # Podstawowe komponenty interfejsu użytkownika
  │   └── users/         # Komponenty związane z użytkownikami
  ├── hooks/             # Niestandardowe hooki React
  ├── i18n/              # Konfiguracja i pliki tłumaczeń
  │   └── locales/       # Pliki JSON z tłumaczeniami
  └── redux/             # Kod Redux (store, reducery, akcje)
      └── slices/        # Reducery Redux Toolkit
```

## Wytyczne dotyczące organizacji komponentów

1. **Komponenty należy grupować według funkcjonalności**:
   - Komponenty związane z użytkownikami umieszczamy w `src/components/users/`
   - Komponenty UI (przyciski, formularze, modalne) umieszczamy w `src/components/ui/`
   - Współdzielone komponenty wielokrotnego użytku umieszczamy w `src/components/common/`

2. **Dla większych komponentów twórz dedykowane podfoldery**:

   ```text
   src/components/users/
     ├── UsersList/
     │   ├── index.tsx        # Główny komponent (eksport)
     │   ├── UserCard.tsx     # Komponent podrzędny używany tylko w UsersList
     │   └── styles.scss      # Style CSS/SCSS specyficzne dla tego komponentu
     └── UserProfile/
         ├── index.tsx
         └── ...
   ```

3. **Względne importy**:
   - Podczas importowania plików z innych folderów, pamiętaj o poprawnej ścieżce względnej
   - Przykład: W komponentach w folderze `src/components/users/` import z folderu `hooks` powinien wyglądać:

     ```tsx
     // Poprawny import
     import { useUsers } from '../../hooks/useUsers';
     ```

4. **Twórz mniejsze pliki dedykowane jednej funkcjonalności**:
   - Każdy plik powinien koncentrować się na jednej, dobrze zdefiniowanej funkcjonalności
   - Unikaj tworzenia dużych plików z wieloma komponentami lub funkcjami

## Ważne zasady

- Nie duplikuj kodu ani komponentów - używaj już istniejących
- Zachowuj spójność stylów kodowania w całym projekcie
- Dla nowych funkcjonalności twórz nowe pliki zamiast rozbudowywać istniejące
