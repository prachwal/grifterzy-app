# Wytyczne dotyczące internationalizacji (i18n)

## Przegląd

W projekcie Grifterzy App wykorzystujemy bibliotekę `react-i18next` do obsługi wielu języków. Aktualnie wspieramy dwa języki:
- 🇬🇧 Angielski (en) - język domyślny
- 🇵🇱 Polski (pl)

## Struktura plików

Wszystkie tłumaczenia są przechowywane w katalogu `src/i18n/locales/` w plikach JSON:
- `en.json` - tłumaczenia angielskie
- `pl.json` - tłumaczenia polskie

## Ważne zasady

1. **Zawsze dodawaj tłumaczenia do wszystkich plików językowych**
   - Każdy nowy tekst musi być dodany zarówno do `en.json` jak i `pl.json`
   - Nigdy nie zostawiaj brakujących kluczy w żadnym z plików językowych

2. **Używaj struktury zagnieżdżonej dla lepszej organizacji**
   ```json
   {
     "sekcja": {
       "podsekcja": {
         "klucz": "Wartość"
       }
     }
   }
   ```

3. **Używaj zmiennych w tłumaczeniach**
   - Format: `{{nazwaZmiennej}}`
   - Przykład: `"greeting": "Witaj, {{name}}!"`
   - W kodzie: `t('greeting', { name: 'Jan' })`

## Jak dodać nowy tekst

1. **Dodaj klucz do obu plików językowych**:

   W `en.json`:
   ```json
   {
     "feature": {
       "newKey": "English translation"
     }
   }
   ```

   W `pl.json`:
   ```json
   {
     "feature": {
       "newKey": "Polskie tłumaczenie"
     }
   }
   ```

2. **Użyj w komponencie React**:
   ```tsx
   import { useTranslation } from 'react-i18next';
   
   const MyComponent = () => {
     const { t } = useTranslation();
     
     return <div>{t('feature.newKey')}</div>;
   };
   ```

## Przykłady użycia

### Prosty tekst
```tsx
<p>{t('app.title')}</p>
```

### Tekst ze zmiennymi
```tsx
<p>{t('counter.currentValue', { value: count })}</p>
```

### Pluralizacja
```json
// W plikach json
{
  "items": "{{count}} item",
  "items_plural": "{{count}} items"
}
```

```tsx
// W komponencie
<p>{t('items', { count: 5 })}</p> // Wyświetli "5 items"
```

## Testowanie tłumaczeń

Zawsze testuj aplikację w obu językach:
1. Przełączaj języki za pomocą komponentu `LanguageSwitcher`
2. Sprawdź, czy wszystkie teksty są poprawnie przetłumaczone
3. Upewnij się, że układ strony nie jest uszkodzony przez dłuższe teksty w różnych językach

## Dodawanie nowego języka

Aby dodać nowy język:
1. Utwórz nowy plik w `src/i18n/locales/`, np. `de.json` dla niemieckiego
2. Dodaj język do konfiguracji w `src/i18n/i18n.ts`
3. Dodaj opcję wyboru języka w komponencie `LanguageSwitcher`