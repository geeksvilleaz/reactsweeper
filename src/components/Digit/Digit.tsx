import React from 'react';
import './Digit.scss';

interface IProps {
  display: number;
}

const WIDTH = 13;

const Digit: React.FC<IProps> = ({ display }) => {
  const style = {
    backgroundPositionX: -WIDTH * display
  };

  return (
    <div className="digit" style={style} />
  );
};

export default Digit;
