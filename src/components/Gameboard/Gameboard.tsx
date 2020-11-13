import React from 'react';
import GameHead from '../GameHead/GameHead';
import GameBody from '../GameBody/GameBody';
import './Gameboard.scss';

interface IProps {
}

const Gameboard: React.FC = () => {
  return (
    <div className="gameboard bevel-up">
      <GameHead />
      <GameBody />
    </div>
  )
};

export default Gameboard;