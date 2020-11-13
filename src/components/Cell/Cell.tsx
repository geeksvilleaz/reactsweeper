import React, { useState } from 'react';
import './Cell.scss';

interface IProps {
  id: number;
}

const CELL_STATES = {
  EMPTY: {
    state: 'empty',
    x: 0
  },
  FLAG: {
    state: 'flag',
    x: -16,
  },
  UNKNOWN: {
    state: 'unknown',
    x: -80
  }
};

const Cell: React.FC<IProps> = ({ id }) => {
  const [cellState, setCellState] = useState(CELL_STATES.EMPTY);

  const handleRightClick = (event: React.SyntheticEvent) => {
    event.preventDefault();

    switch (cellState.state) {
      case CELL_STATES.EMPTY.state:
        setCellState(CELL_STATES.FLAG);
        break;

      case CELL_STATES.FLAG.state:
        setCellState(CELL_STATES.UNKNOWN);
        break;

      case CELL_STATES.UNKNOWN.state:
        setCellState(CELL_STATES.EMPTY);
        break;
    }
  };

  const handleClick = () => {};

  const style = {
    backgroundPositionX: cellState.x
  }

  return (
    <div 
      className="cell" 
      onContextMenu={handleRightClick}
      style={style}
    >
      {id}
    </div>
  );
};

export default Cell;
