import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import GameHead from '../GameHead/GameHead';
import GameBody from '../GameBody/GameBody';
import useGame from '../../hooks/useGame';
import './Gameboard.scss';

const Gameboard: React.FC = () => {
  const game = useSelector((state: RS.Store) => {
    return state.game;
  });

  const { initGameCB } = useGame();
  useEffect(() => {
    const difficultyLevel = 'beginner';
    initGameCB(difficultyLevel);
  }, [initGameCB]);

  return (
    <div className="gameboard bevel-up">
      <GameHead />

      <GameBody cells={game.cells} width={game.width} height={game.height} />
    </div>
  )
};

export default Gameboard;