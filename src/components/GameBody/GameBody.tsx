import React from 'react';
import Cell from '../Cell/Cell';
import './GameBody.scss';

interface IProps {
  cells: RS.Cell[];
  width: number;
  height: number;
}

const CELL_WIDTH = 16;

const GameBody: React.FC<IProps> = ({ cells, width, height }) => {
  const numCells = width * height;
  
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

export default GameBody;
