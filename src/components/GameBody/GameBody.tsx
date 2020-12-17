import React from 'react';
import { useSelector } from 'react-redux';
import Cell from '../Cell/Cell';
import './GameBody.scss';

interface IProps {
  width: number;
  height: number;
}

const CELL_WIDTH = 16;

const GameBody: React.FC<IProps> = ({ width, height }) => {
  const { cells } = useSelector((state: RS.Store) => state.game);

  console.log('rendering game body');
  const style = {
    width: CELL_WIDTH * width
  };

  return (
    <div className="game-body bevel-down" style={style}>
      {cells.map((cell, i) => (
        <Cell key={i} id={i} cell={cell} />
      ))}
    </div>
  );
};

export default React.memo(GameBody);
