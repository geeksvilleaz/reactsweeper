import React from 'react';
import useGame from '../../hooks/useGame';
import cellConst from '../../constants/cellConst';
import './Cell.scss';

interface IProps {
  id: number;
  cell: RS.Cell;
}

interface CellStates {
  [key: string]: CellState;
}

interface CellState {
  state: string;
  x: number;
  y: number;
}

const CELL_STATES: CellStates = {
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
  FLAG: {
    state: 'flag',
    x: -16,
    y: -39
  },
  UNKNOWN: {
    state: 'unknown',
    x: -80,
    y: -39
  }
};

const MINE_X_POSITION = -64;
const MINE_Y_POSITION = -39;
const CELL_WIDTH = 16;
const NUMBER_Y_POSITION = -23;

const Cell: React.FC<IProps> = ({ id, cell }) => {
  const { checkCellCB } = useGame();

  // const handleRightClick = (event: React.SyntheticEvent) => {
  //   event.preventDefault();

  //   switch (cellState.state) {
  //     case CELL_STATES.UNTOUCHED.state:
  //       setCellState(CELL_STATES.FLAG);
  //       break;

  //     case CELL_STATES.FLAG.state:
  //       setCellState(CELL_STATES.UNKNOWN);
  //       break;

  //     case CELL_STATES.UNKNOWN.state:
  //       setCellState(CELL_STATES.UNTOUCHED);
  //       break;
  //   }
  // };

  const handleClick = () => {
    checkCellCB(cell);
  };

  function getX(): number {
    switch (cell.state) {
      case cellConst.states.untouched:
      case cellConst.states.flagged:
      case cellConst.states.unknown:
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
      // onContextMenu={handleRightClick}
      onClick={handleClick}
      style={style}
    >
      {/* {cell.id} */}
    </div>
  );
};

export default Cell;
