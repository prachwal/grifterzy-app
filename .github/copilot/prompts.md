# Grifterzy App - Komendy dla GitHub Copilot

## Komponenty

/component [nazwa] - Wygeneruj nowy komponent React

```javascript
import React from 'react';

const {{nazwa}} = () => {
  return (
    <div>
      <h1>{{nazwa}} Component</h1>
    </div>
  );
};

export default {{nazwa}};
```

## API

/api [endpoint] - Wygeneruj nowy endpoint API

```javascript
// API endpoint dla {{endpoint}}
export const {{endpoint}}Api = async (params) => {
  try {
    const response = await fetch(`/api/{{endpoint}}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
```

## Styl

/style [komponent] - Wygeneruj szablon CSS dla komponentu

```css
.{{komponent}} {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 0.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.{{komponent}}__header {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.{{komponent}}__content {
  font-size: 1rem;
}
```

## Testy

/test [funkcja] - Wygeneruj testy dla funkcji

```javascript
import { {{funkcja}} } from './{{funkcja}}';

describe('{{funkcja}}', () => {
  test('powinna działać poprawnie z prawidłowymi parametrami', () => {
    // Arrange
    const testParams = {};
    
    // Act
    const result = {{funkcja}}(testParams);
    
    // Assert
    expect(result).toBeDefined();
  });
  
  test('powinna obsłużyć nieprawidłowe parametry', () => {
    // Arrange
    const invalidParams = null;
    
    // Act & Assert
    expect(() => {{funkcja}}(invalidParams)).toThrow();
  });
});
```

## Hook React

/hook [nazwa] - Wygeneruj niestandardowy hook React

```javascript
import { useState, useEffect } from 'react';

export function use{{nazwa}}(initialValue) {
  const [value, setValue] = useState(initialValue);
  
  useEffect(() => {
    // Logika hooka
  }, []);
  
  const updateValue = (newValue) => {
    setValue(newValue);
  };
  
  return {
    value,
    updateValue,
  };
}
```

// Zamiast CommonJS:
// const something = require('something');
// module.exports = something;

// Będziesz używać ES Modules:
import something from 'something';
export default something;
