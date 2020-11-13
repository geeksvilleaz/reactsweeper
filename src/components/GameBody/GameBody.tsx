import React from 'react';
import Cell from '../Cell/Cell';
import './GameBody.scss';

interface IProps {}

const CELL_WIDTH = 16;

const GameBody: React.FC = () => {
  // temp
  const width = 9;
  const height = 9;
  const numCells = width * height;
  // end temp

  const cellArr = [];
  for (let i = 0; i < numCells; i++) {
    cellArr.push(<Cell key={i} id={i} />);
  }

  const style = {
    width: CELL_WIDTH * width
  };

  return (
    <div className="game-body bevel-down" style={style}>
      {cellArr}
    </div>
  );
};

export default GameBody;
