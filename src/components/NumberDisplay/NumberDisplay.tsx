import React from 'react';
import Digit from '../Digit/Digit';
import './NumberDisplay.scss';

interface IProps {
  display: number;
}

const NumberDisplay: React.FC<IProps> = ({ display }) => {
  const displayArr = display.toString().padStart(3, '0').split('');

  return (
    <div className="number-display bevel-down">
      {displayArr.map((digit: string, i: number) => (
        <Digit display={Number(digit)} key={i} />
      ))}
    </div>
  );
};

export default NumberDisplay;
