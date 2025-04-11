# Struktura folderów w projekcie Grifterzy

## Przegląd struktury katalogów

```text
src/
  ├── api/               # Kod backendowy API Express
  ├── assets/            # Statyczne zasoby
  │   ├── images/        # Pliki graficzne (.png, .jpg, .svg)
  │   ├── fonts/         # Pliki czcionek
  │   ├── styles/        # Style globalne
  │   │   ├── scss/      # Pliki SCSS
  │   │   └── themes/    # Konfiguracje motywów
  │   └── icons/         # Ikony (jeśli nie używamy MUI)
  ├── components/        # Komponenty React
  │   ├── common/        # Współdzielone komponenty wielokrotnego użytku
  │   ├── ui/            # Podstawowe komponenty interfejsu użytkownika
  │   └── users/         # Komponenty związane z użytkownikami
  ├── context/           # Konteksty React (np. ThemeContext)
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

   - Jeśli używane są aliasy ścieżek (path aliases), należy je również uwzględnić.

4. **Twórz mniejsze pliki dedykowane jednej funkcjonalności**:
   - Każdy plik powinien koncentrować się na jednej, dobrze zdefiniowanej funkcjonalności
   - Unikaj tworzenia dużych plików z wieloma komponentami lub funkcjami

5. **Używaj komponentów z biblioteki MUI**:
    - Zawsze, gdy to możliwe, używaj gotowych komponentów z biblioteki MUI (Material UI) przed tworzeniem własnych.
    - Pozwoli to zachować spójność interfejsu i przyspieszy proces developmentu.

## Wytyczne dotyczące organizacji stylów

1. **Używaj wyłącznie plików SCSS**:
   - Wszystkie style należy pisać w plikach z rozszerzeniem `.scss`
   - Nie twórz nowych plików `.css`
   - Główny plik stylów projektu to `src/assets/styles/scss/main.scss`
   - Zmienne i mixiny przechowuj w `src/assets/styles/scss/_variables.scss` i `src/assets/styles/scss/_mixins.scss`

2. **Organizuj style razem z komponentami**:
   - Dla komponentów twórz pliki `.scss` w ich folderach
   - Przykład:

   ```text
   src/components/users/UsersList/
     ├── index.tsx        # Główny komponent (eksport)
     ├── UsersTable.tsx   # Komponent podrzędny
     └── styles.scss      # Style dla wszystkich komponentów w folderze
   ```

3. **Organizacja zasobów statycznych**:
   - Obrazy i ikony umieszczaj w `src/assets/images/` lub `src/assets/icons/`
   - Czcionki umieszczaj w `src/assets/fonts/`
   - Importuj zasoby używając ścieżek względnych:

   ```tsx
   import logoImage from '../../../assets/images/logo.png';
   ```

4. **Importuj style w komponentach**:
   - W głównym pliku komponentu importuj jego plik stylów:

   ```tsx
   import './styles.scss';
   ```

5. **Implementuj wsparcie dla motywów**:
   - Używaj zmiennych CSS z MUI dla obsługi motywów jasny/ciemny
   - Szczegóły w dokumentacji tematów i SCSS

## Obsługa motywów (Theme)

1. **Struktura motywów**:
   - Logika obsługi motywów znajduje się w `src/context/ThemeContext.tsx`
   - Komponenty przełączające motywy w `src/components/common/ThemeToggler.tsx`
   - Aplikacja obsługuje motyw jasny (light) i ciemny (dark)

2. **Dostosowanie komponentów do obsługi motywów**:
   - Style CSS/SCSS powinny używać zmiennych MUI dla różnych motywów
   - Szczegółowa instrukcja dostosowania znajduje się w `.github/copilot/theme-adaptation.md`
   - Przykład adaptacji stylów do obsługi motywów:

   ```scss
   // Używanie zmiennych MUI
   .element {
     background-color: var(--mui-palette-background-paper);
     color: var(--mui-palette-text-primary);
   }
   
   // Opcjonalne nadpisanie dla ciemnego motywu
   [data-theme='dark'] .element {
     border-color: rgba(255, 255, 255, 0.1);
   }
   ```

3. **Dostęp do motywu w komponentach**:

   ```tsx
   import { useTheme } from '../../context/ThemeContext';
   
   const MyComponent = () => {
     const { mode, toggleTheme } = useTheme();
     
     return (
       <div>
         Current theme: {mode}
         <button onClick={toggleTheme}>Toggle theme</button>
       </div>
     );
   };
   ```

4. **Komponenty obsługujące motywy**:
   - Wszystkie komponenty Material UI automatycznie obsługują zmianę motywu
   - Własne komponenty powinny korzystać ze zmiennych CSS z MUI
   - Komponenty zagnieżdżone w `ThemeProvider` będą automatycznie aktualizowane

5. **Lista komponentów z dostosowanymi stylami motywów**:
   - `UsersList` - tabela użytkowników, formularze i sekcja API
   - `ThemeToggler` - przełącznik motywów
   - `App` - główny układ aplikacji
   - Wszystkie komponenty wykorzystujące Material UI

6. **Zasady obsługi motywów**:
   - Zawsze używaj zmiennych MUI zamiast stałych kolorów
   - Testuj komponenty w obu motywach
   - Zapewnij odpowiedni kontrast tekstu w obu motywach
   - Stosuj płynne przejścia między motywami (`transition`)

## Zasady tworzenia małych komponentów wielokrotnego użytku

1. **Dziel duże komponenty na mniejsze**:
   - Rozdzielaj logikę i UI na mniejsze, wyspecjalizowane komponenty
   - Każdy komponent powinien mieć jedną, jasno określoną odpowiedzialność (zasada Single Responsibility)
   - Idealna wielkość pliku komponentu to maksymalnie 150-200 linii kodu

2. **Struktura komponentów złożonych**:
   - Komponenty z wieloma podkomponentami umieszczaj w dedykowanych folderach:

   ```text
   src/components/users/UsersList/
     ├── index.tsx            # Główny komponent eksportujący
     ├── UsersTable.tsx       # Podkomponent tabeli
     ├── AddUserForm.tsx      # Podkomponent formularza dodawania
     ├── EditUserForm.tsx     # Podkomponent formularza edycji
     ├── ApiEndpoints.tsx     # Podkomponent wyświetlający endpointy
     └── styles.scss          # Style całego komponentu
   ```

3. **Korzyści z małych komponentów**:
   - Łatwiejsze testowanie i debugowanie
   - Prostsze zarządzanie stanem
   - Lepsza reużywalność kodu
   - Możliwość pracy równoległej nad różnymi komponentami
   - Szybsze renderowanie (odświeżane są tylko zmienione komponenty)

4. **Komunikacja między komponentami**:
   - Przekazuj dane i funkcje przez props
   - Dla globalnego stanu używaj kontekstu lub biblioteki zarządzania stanem (Redux)
   - Unikaj nadmiernego zagnieżdżania komponentów (props drilling)

5. **Organizacja kodu w komponentach**:
   - Na początku pliku umieszczaj importy i definicje typów/interfejsów
   - Następnie definiuj komponenty i hooki
   - Na końcu eksportuj komponenty

## Obsługa zdarzeń w komponentach React

1. **Dedykowane handlery dla różnych typów komponentów**:
   - Twórz odrębne funkcje obsługi zdarzeń dla różnych typów komponentów (np. TextField vs Select)
   - Przykład prawidłowej implementacji:

   ```tsx
   // Handler dla komponentów TextField (React.ChangeEvent<HTMLInputElement>)
   const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target;
     setFormData(prev => ({ ...prev, [name]: value }));
   };

   // Handler dla komponentów Select (SelectChangeEvent z MUI)
   const handleSelectInputChange = (e: SelectChangeEvent) => {
     const { name, value } = e.target;
     setFormData(prev => ({ ...prev, [name]: value }));
   };
   ```

2. **Właściwe typowanie eventów**:
   - Używaj odpowiednich typów dla eventów:
     - `React.ChangeEvent<HTMLInputElement>` dla TextField
     - `SelectChangeEvent` z MUI dla Select
     - `React.FormEvent` dla formularzy

3. **Obsługa formularzy**:
   - Dla formularzy używaj `handleSubmit` z `e.preventDefault()` aby zapobiec domyślnemu odświeżeniu strony
   - Grupuj logikę formularza w oddzielnych funkcjach

4. **Spójne nazewnictwo**:
   - Używaj konsekwentnych nazw dla handlerów zdarzeń, np. `handle[Element][Event]`
   - Dla elementów w trybie edycji dodawaj przedrostek, np. `handleEdit[Element][Event]`

## Wytyczne dotyczące Grid w MUI

Projekt używa niestandardowego podejścia do komponentu Grid z Material UI:

1. **Używanie atrybutu `size` zamiast atrybutów `xs`, `sm` i `md`**:

   ```tsx
   // ❌ NIE używaj tego podejścia
   <Grid item xs={12} sm={6} md={3}>
     <Content />
   </Grid>
   
   // ✅ Używaj tego podejścia
   <Grid size={{ xs: 12, sm: 6, md: 3 }}>
     <Content />
   </Grid>
   ```

2. **Elastyczność responsywna**:
   - `xs`: Rozmiar na małych ekranach (mobilne)
   - `sm`: Rozmiar na średnich ekranach (tablety)
   - `md`: Rozmiar na dużych ekranach (desktop)

3. **Kontener Grid**:
   - Zawsze używaj `<Grid container spacing={3}>` dla rodzica
   - Atrybut `spacing` określa odstęp między elementami (w jednostkach MUI)

4. **Pełny przykład**:

   ```tsx
   <Grid container spacing={3}>
     <Grid size={{ xs: 12, sm: 6, md: 4 }}>
       <Paper>Element 1</Paper>
     </Grid>
     <Grid size={{ xs: 12, sm: 6, md: 4 }}>
       <Paper>Element 2</Paper>
     </Grid>
     <Grid size={{ xs: 12, sm: 12, md: 4 }}>
       <Paper>Element 3</Paper>
     </Grid>
   </Grid>
   ```

## Ważne zasady

- Nie duplikuj kodu ani komponentów - używaj już istniejących
- Zachowuj spójność stylów kodowania w całym projekcie
- Dla nowych funkcjonalności twórz nowe pliki zamiast rozbudowywać istniejące
