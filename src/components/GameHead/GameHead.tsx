import React from 'react';
import NumberDisplay from '../NumberDisplay/NumberDisplay';
import Timer from '../Timer/Timer';
import Smiley from '../Smiley/Smiley';
import './GameHead.scss';

interface IProps {
  numMinesRemaining: number;
  isGameActive: boolean;
  isGameOver: boolean;
  isWon: boolean;
}

const GameHead: React.FC<IProps> = ({ isGameOver, numMinesRemaining, isGameActive, isWon }) => {
  return (
    <div className="game-head bevel-down">
      <NumberDisplay display={numMinesRemaining} />

      <Smiley isGameOver={isGameOver} isWon={isWon} />
      
      <Timer isGameActive={isGameActive} />
    </div>
  );
};

export default GameHead;
