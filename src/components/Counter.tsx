import React from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { increment, decrement, reset } from '../redux/slices/counterSlice';

const Counter: React.FC = () => {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="counter-container">
      <h2>Redux Counter Test</h2>
      <div className="counter-display">
        <p className="counter-value">{count}</p>
      </div>
      <div className="counter-controls">
        <button 
          className="counter-button decrement"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <button 
          className="counter-button reset"
          onClick={() => dispatch(reset())}
        >
          Reset
        </button>
        <button 
          className="counter-button increment"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;