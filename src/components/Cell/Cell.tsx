import React from 'react';
import useGame from '../../hooks/useGame';
import cellConst from '../../constants/cellConst';
import './Cell.scss';

interface IProps {
  id: number;
  cell: RS.Cell;
}

interface flagStates {
  [key: string]: flagState;
}

interface flagState {
  state: string;
  x: number;
  y: number;
}

const CELL_STATES: flagStates = {
  UNTOUCHED: {
    state: 'untouched',
    x: 0,
    y: -39
  },
  EMPTY: {
    state: 'empty',
    x: 0,
    y: -23
  },
  FLAGGED: {
    state: 'flag',
    x: -16,
    y: -39
  },
  UNKNOWN: {
    state: 'unknown',
    x: -80,
    y: -39
  },
  EXPLODED: {
    state: 'exploded',
    x: -32,
    y: -39
  }
};

const MINE_X_POSITION = -64;
const MINE_Y_POSITION = -39;
const CELL_WIDTH = 16;
const NUMBER_Y_POSITION = -23;

const Cell: React.FC<IProps> = ({ id, cell }) => {
  const { checkCellCB, setFlagStateCB } = useGame();

  const handleRightClick = (event: React.SyntheticEvent) => {
    event.preventDefault();

    setFlagStateCB(cell);
  };

  const handleClick = () => {
    checkCellCB(cell);
  };

  function getX(): number {
    switch (cell.state) {
      case cellConst.states.untouched:
      case cellConst.states.flagged:
      case cellConst.states.unknown:
      case cellConst.states.exploded:
        return CELL_STATES[cell.state].x;
    }

    if (cell.isMine) {
      return MINE_X_POSITION;
    }

    if (cell.count > 0) {
      return -CELL_WIDTH * cell.count;
    }

    return 0;
  }

  function getY(): number {
    switch (cell.state) {
      case cellConst.states.untouched:
      case cellConst.states.flagged:
      case cellConst.states.unknown:
      case cellConst.states.exploded:
        return CELL_STATES[cell.state].y;
    }

    if (cell.isMine) {
      return MINE_Y_POSITION;
    }

    return NUMBER_Y_POSITION;
  }

  const style = {
    backgroundPositionX: getX(),
    backgroundPositionY: getY(),
    color: cell.isMine ? 'red' : 'black'
  }

  return (
    <div 
      className="cell" 
      onContextMenu={handleRightClick}
      onClick={handleClick}
      style={style}
    >
      {/* {cell.id}:{cell.count} */}
    </div>
  );
};

export default Cell;
