import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from '@mui/material';

const Counter: React.FC = () => {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div>
      <Typography variant="h6">{t('counter.title')}</Typography>
      <Typography variant="body1">{t('counter.currentValue', { value: count })}</Typography>
      <Button variant="contained" onClick={increment}>
        {t('counter.increment')}
      </Button>
      <Button variant="contained" onClick={decrement}>
        {t('counter.decrement')}
      </Button>
    </div>
  );
};

export default Counter;