import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { increment, decrement, reset } from '../redux/slices/counterSlice';

const Counter: React.FC = () => {
  const { t } = useTranslation();
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="counter-container">
      <h2>{t('counter.title')}</h2>
      <div className="counter-display">
        <p className="counter-value">{t('counter.currentValue', { value: count })}</p>
      </div>
      <div className="counter-controls">
        <button 
          className="counter-button decrement"
          onClick={() => dispatch(decrement())}
        >
          {t('counter.decrement')}
        </button>
        <button 
          className="counter-button reset"
          onClick={() => dispatch(reset())}
        >
          {t('counter.reset')}
        </button>
        <button 
          className="counter-button increment"
          onClick={() => dispatch(increment())}
        >
          {t('counter.increment')}
        </button>
      </div>
    </div>
  );
};

export default Counter;