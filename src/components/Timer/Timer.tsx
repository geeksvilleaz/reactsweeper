import React, { useEffect, useState } from 'react';
import NumberDisplay from '../NumberDisplay/NumberDisplay';

interface IProps {
  isGameActive: boolean;
}

const Timer: React.FC<IProps> = ({ isGameActive }) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let interval: any = null;

    if (isGameActive) {
      interval = setInterval(() => {
        setCount((count: number) => count + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setCount(0);
    }

    return () => clearInterval(interval);
  }, [isGameActive]);

  return (
    <NumberDisplay display={count} />
  );
};

export default Timer;
