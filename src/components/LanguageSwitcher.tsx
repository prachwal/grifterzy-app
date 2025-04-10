import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="language-switcher">
      <p>{t('languageSwitcher.chooseLanguage')}</p>
      <div className="language-buttons">
        <button
          className={i18n.language === 'en' ? 'active' : ''}
          onClick={() => changeLanguage('en')}
        >
          {t('languageSwitcher.en')}
        </button>
        <button
          className={i18n.language === 'pl' ? 'active' : ''}
          onClick={() => changeLanguage('pl')}
        >
          {t('languageSwitcher.pl')}
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;