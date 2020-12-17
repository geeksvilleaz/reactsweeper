import React from 'react';
import NumberDisplay from '../NumberDisplay/NumberDisplay';
import Smiley from '../Smiley/Smiley';
import './GameHead.scss';

interface IProps {
  numMinesRemaining: number;
}

const GameHead: React.FC<IProps> = ({ numMinesRemaining }) => {
  return (
    <div className="game-head bevel-down">
      <NumberDisplay display={numMinesRemaining} />

      <Smiley />
      
      <NumberDisplay display={999} />
    </div>
  );
};

export default GameHead;
