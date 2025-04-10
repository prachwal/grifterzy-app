import React from 'react';
import { useTranslation } from 'react-i18next';
import Counter from './components/Counter';
import LanguageSwitcher from './components/LanguageSwitcher';

const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>{t('app.title')}</h1>
        <p>{t('app.welcome')}</p>
        <LanguageSwitcher />
      </header>
      <main>
        <p>{t('app.description')}</p>
        <Counter />
      </main>
    </div>
  );
};

export default App;