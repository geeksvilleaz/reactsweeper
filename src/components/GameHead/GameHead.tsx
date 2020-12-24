import React from 'react';
import NumberDisplay from '../NumberDisplay/NumberDisplay';
import Smiley from '../Smiley/Smiley';
import Timer from '../Timer/Timer';
import './GameHead.scss';

interface IProps {
  numMinesRemaining: number;
  game: RS.Game;
}

const GameHead: React.FC<IProps> = ({ game, numMinesRemaining }) => {
  return (
    <div className="game-head bevel-down">
      <NumberDisplay display={numMinesRemaining} />

      <Smiley isGameOver={game.isGameOver} difficultyLevel={game.difficultyLevel} isGameWon={game.isGameWon} />
      
      <Timer isGameActive={game.isGameActive} />
    </div>
  );
};

export default GameHead;
