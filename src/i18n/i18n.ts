import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en.json';
import plTranslation from './locales/pl.json';

// Konfiguracja i18next
i18n
  // Wykrywanie języka przeglądarki
  .use(LanguageDetector)
  // Integracja z React
  .use(initReactI18next)
  // Inicjalizacja i18next
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      pl: {
        translation: plTranslation
      }
    },
    fallbackLng: 'en', // Język domyślny, gdy wykryty język nie jest obsługiwany
    debug: process.env.NODE_ENV === 'development', // Włącz tryb debugowania w środowisku deweloperskim
    
    interpolation: {
      escapeValue: false, // Nie escapuj wartości HTML, React robi to domyślnie
    },

    detection: {
      order: ['localStorage', 'navigator'], // Kolejność wykrywania języka
      caches: ['localStorage'], // Zapisuje wybór w localStorage
    }
  });

export default i18n;