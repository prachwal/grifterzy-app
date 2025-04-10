# Wytyczne dotyczące SCSS

## Przegląd

W projekcie Grifterzy App wykorzystujemy SCSS (Sass) do stylizacji komponentów. Ze względu na przyszłe wersje Dart Sass 3.0.0, należy korzystać z nowszych metod manipulowania kolorami i innymi funkcjami.

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

## Komunikaty o przestarzałych funkcjach

Jeśli zobaczysz komunikat podobny do tego:

```text
Deprecation Warning: Global built-in functions are deprecated and will be removed in Dart Sass 3.0.0.
Use color.adjust instead.
```

Należy znaleźć wszystkie wystąpienia przestarzałych funkcji i zamienić je na nowsze odpowiedniki.

## Automatyzacja

W razie potrzeby można użyć narzędzia do automatycznej migracji, które dostępne jest pod adresem: <https://sass-lang.com/d/import>

## Lista kontrolna

- [ ] Używaj importów modułów Sass na początku pliku
- [ ] Używaj funkcji `color.adjust()` zamiast `lighten()`, `darken()` itp.
- [ ] Używaj funkcji matematycznych z modułu `math`
- [ ] Twórz własne mixiny wykorzystujące nowe metody
- [ ] Regularnie sprawdzaj komunikaty o przestarzałych funkcjach w trakcie kompilacji

## Korzyści

1. Uniknięcie ostrzeżeń o przestarzałych funkcjach
2. Lepsza kompatybilność z przyszłymi wersjami Sass
3. Bardziej czytelny i zorganizowany kod
4. Lepsze wsparcie narzędzi i edytorów (lepsze podpowiedzi)
