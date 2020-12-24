import React, { useState, useEffect } from 'react';
import NumberDisplay from '../NumberDisplay/NumberDisplay';
import './Timer.scss';

interface IProps {
  isGameActive: boolean;
}

const Timer: React.FC<IProps> = ({ isGameActive }) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    console.log({isGameActive})
    let interval: any = null;

    if (isGameActive) {
      interval = setInterval(() => {
        setCount((count: number) => count + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isGameActive]);

  return (
    <NumberDisplay display={count} />
  );
};

export default Timer;
