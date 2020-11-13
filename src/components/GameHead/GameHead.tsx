import React from 'react';
import NumberDisplay from '../NumberDisplay/NumberDisplay';
import Smiley from '../Smiley/Smiley';
import './GameHead.scss';

interface IProps {}

const GameHead: React.FC = () => {
  return (
    <div className="game-head bevel-down">
      <NumberDisplay display={5} />

      <Smiley />
      
      <NumberDisplay display={999} />
    </div>
  );
};

export default GameHead;
