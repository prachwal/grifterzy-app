# Wytyczne dotyczące SCSS

## Przegląd

W projekcie Grifterzy App wykorzystujemy SCSS (Sass) do stylizacji komponentów. Ze względu na przyszłe wersje Dart Sass 3.0.0, należy korzystać z nowszych metod manipulowania kolorami i innymi funkcjami.

## Ważne zasady stylistyczne

1. **Używamy tylko plików SCSS, nie CSS**:
   - Wszystkie style powinny być pisane w plikach .scss
   - Nie twórz nowych plików .css
   - Główny plik stylów projektu to `src/main.scss`
   - Dla komponentów twórz pliki .scss w ich folderach

2. **Struktura stylów**:
   - Globalne style i zmienne umieszczaj w `src/main.scss`
   - Style specyficzne dla komponentów trzymaj w plikach .scss w folderach komponentów
   - Używaj zagnieżdżonej struktury SCSS dla poprawy czytelności

## Funkcje przestarzałe vs. nowe

### Moduły Sass

Najważniejsza zmiana to korzystanie z modułów Sass zamiast globalnych funkcji:

```scss
// Dodaj na początku pliku:
@use "sass:color";
@use "sass:math";
@use "sass:string";
@use "sass:list";
@use "sass:map";
```

### Manipulacja kolorami

| ❌ Przestarzałe funkcje | ✅ Zalecane funkcje |
|------------------------|-------------------|
| `lighten($color, 10%)` | `color.adjust($color, $lightness: 10%)` |
| `darken($color, 10%)` | `color.adjust($color, $lightness: -10%)` |
| `saturate($color, 20%)` | `color.adjust($color, $saturation: 20%)` |
| `desaturate($color, 20%)` | `color.adjust($color, $saturation: -20%)` |
| `fade-in($color, 0.1)` | `color.adjust($color, $alpha: 0.1)` |
| `fade-out($color, 0.1)` | `color.adjust($color, $alpha: -0.1)` |
| `mix($color1, $color2, 50%)` | `color.mix($color1, $color2, 50%)` |

### Operacje matematyczne

| ❌ Przestarzałe | ✅ Zalecane |
|----------------|-----------|
| `$width / 2` | `math.div($width, 2)` |
| `$value * 2` | `math.mul($value, 2)` |

## Przykład użycia

Stary sposób (przestarzały):

```scss
.element {
  background-color: lighten($primary-color, 10%);
  border-color: darken($primary-color, 5%);
  width: $container-width / 2;
}
```

Nowy sposób (zalecany):

```scss
@use "sass:color";
@use "sass:math";

.element {
  background-color: color.adjust($primary-color, $lightness: 10%);
  border-color: color.adjust($primary-color, $lightness: -5%);
  width: math.div($container-width, 2);
}
```

## Mixiny i funkcje

Dobrą praktyką jest tworzenie własnych mixinów i funkcji, które wykorzystują nowe metody:

```scss
@mixin color-variant($base-color, $lightness: 10%) {
  background-color: color.adjust($base-color, $lightness: $lightness);
  border-color: color.adjust($base-color, $lightness: -5%);
  color: if(color.lightness($base-color) > 50%, #000, #fff);
}

.button-primary {
  @include color-variant($primary-color);
}

.button-secondary {
  @include color-variant($secondary-color, 15%);
}
```

## Obsługa motywów w SCSS

Aby zapewnić prawidłową obsługę motywów w SCSS, używaj zmiennych CSS dostarczanych przez Material UI:

```scss
.element {
  /* Podstawowe kolory z MUI */
  background-color: var(--mui-palette-background-paper);
  color: var(--mui-palette-text-primary);
  border-color: var(--mui-palette-divider);
  
  /* Kolory semantyczne */
  &.error {
    color: var(--mui-palette-error-main);
  }
}
```

### Dostosowanie dla ciemnego motywu

Używaj selektora atrybutu `data-theme` do określania stylów specyficznych dla danego motywu:

```scss
/* Styl domyślny (zwykle jasny) */
.card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Styl dla ciemnego motywu */
[data-theme='dark'] .card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}
```

### Płynne przejścia między motywami

Dodaj właściwość `transition` dla elementów, które zmieniają wygląd:

```scss
.element {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```

## Komunikaty o przestarzałych funkcjach

Jeśli zobaczysz komunikat podobny do tego:

```text
Deprecation Warning: Global built-in functions are deprecated and will be removed in Dart Sass 3.0.0.
Use color.adjust instead.
```

Należy znaleźć wszystkie wystąpienia przestarzałych funkcji i zamienić je na nowsze odpowiedniki.

## Automatyzacja

W razie potrzeby można użyć narzędzia do automatycznej migracji, które dostępne jest pod adresem: <https://sass-lang.com/d/import>
Rozważ użycie narzędzi do lintingu SCSS, np. Stylelint.

## Lista kontrolna

- [ ] Używaj importów modułów Sass na początku pliku
- [ ] Używaj funkcji `color.adjust()` zamiast `lighten()`, `darken()` itp.
- [ ] Używaj funkcji matematycznych z modułu `math`
- [ ] Twórz własne mixiny wykorzystujące nowe metody
- [ ] Regularnie sprawdzaj komunikaty o przestarzałych funkcjach w trakcie kompilacji
- [ ] **Nie twórz plików CSS** - używaj tylko SCSS
- [ ] Używaj zmiennych CSS dla wsparcia tematów

## Korzyści

1. Uniknięcie ostrzeżeń o przestarzałych funkcjach
2. Lepsza kompatybilność z przyszłymi wersjami Sass
3. Bardziej czytelny i zorganizowany kod
4. Lepsze wsparcie narzędzi i edytorów (lepsze podpowiedzi)
5. **Spójność interfejsu dzięki używaniu komponentów z biblioteki MUI (Material UI)**.
