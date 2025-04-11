# Wytyczne dotyczące adaptacji komponentów do obsługi motywów

## Przegląd

Aplikacja Grifterzy obsługuje zarówno jasny jak i ciemny motyw. Wszystkie komponenty powinny być odpowiednio dostosowane, aby zapewnić spójne działanie przy zmianie motywu.

## Podstawowa implementacja motywów

Obsługa motywów jest zaimplementowana przy użyciu:

- `ThemeProvider` z Material UI
- Własnego kontekstu React w `src/context/ThemeContext.tsx`
- Komponentu przełącznika `ThemeToggler` w `src/components/common/ThemeToggler.tsx`

## Dostosowanie komponentów Material UI

Komponenty Material UI automatycznie reagują na zmianę motywu, ale muszą być zagnieżdżone wewnątrz `ThemeProvider`:

```tsx
import { ThemeProvider } from './context/ThemeContext';

const App = () => (
  <ThemeProvider>
    {/* Komponenty MUI będą automatycznie reagować na zmianę motywu */}
    <Button>Przycisk</Button>
  </ThemeProvider>
);
```

## Dostosowanie własnych stylów CSS/SCSS

### Używanie zmiennych MUI

Aby style SCSS reagowały na zmiany motywu, używaj zmiennych CSS eksportowanych przez MUI:

```scss
.custom-element {
  /* Podstawowe kolory */
  background-color: var(--mui-palette-background-paper);
  color: var(--mui-palette-text-primary);
  
  /* Kolory akcji */
  border-color: var(--mui-palette-primary-main);
  
  /* Różne stany */
  &:hover {
    background-color: var(--mui-palette-action-hover);
  }
}
```

### Specyficzne nadpisania dla motywów

Możesz użyć selektora `[data-theme='dark']` do nadpisania stylów specyficznych dla ciemnego motywu:

```scss
/* Styl domyślny (jasny) */
.custom-card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Specyficzne dla ciemnego motywu */
[data-theme='dark'] .custom-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
```

## Lista kontrolna dostosowania komponentów

Przy dostosowywaniu komponentów do obsługi motywów upewnij się, że:

- [ ] Komponenty są zagnieżdżone w `ThemeProvider`
- [ ] Style SCSS używają zmiennych MUI zamiast stałych kolorów
- [ ] Elementy niestandardowe mają odpowiednie style dla obu motywów
- [ ] Tekst jest czytelny zarówno na jasnym jak i ciemnym tle (wystarczający kontrast)
- [ ] Przejścia między motywami są płynne (używaj `transition`)
- [ ] Ikony i obrazy są odpowiednio widoczne w obu motywach

## Testowanie motywów

Testuj komponenty w obu motywach:

1. Przełącz motyw za pomocą `ThemeToggler`
2. Sprawdź czy wszystkie elementy są widoczne i użyteczne
3. Upewnij się, że kontrast tekstu jest wystarczający
4. Zweryfikuj czy kolorystyka jest spójna z resztą aplikacji

## Przykład pełnego dostosowania komponentu

```tsx
// Komponent React
import React from 'react';
import { Card, Typography } from '@mui/material';
import './CustomCard.scss';

const CustomCard = ({ title, content }) => (
  <Card className="custom-card">
    <Typography variant="h5">{title}</Typography>
    <Typography variant="body1">{content}</Typography>
  </Card>
);

// SCSS
// CustomCard.scss
.custom-card {
  padding: 16px;
  border-left: 4px solid var(--mui-palette-primary-main);
  margin-bottom: 16px;
  
  h5 {
    color: var(--mui-palette-text-primary);
  }
}

[data-theme='dark'] .custom-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}
```
