import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import gameConst from '../constants/gameConst';
import { Action } from '../store/game/game.actions';
import cellConst from '../constants/cellConst';

const useGame = () => {
  const dispatch = useDispatch();
  const game = useSelector((state: RS.Store) => state.game);

  /**
   * 
   */
  const initGameCB = useCallback((difficultyLevel: string = 'beginner') => {
    console.log('init game cb');
    const level = gameConst[difficultyLevel];

    const minesArr = Array(level.numMines).fill({ isMine: true });
    const safeArr = Array(level.width * level.height - level.numMines).fill({ isMine: false });

    const cellsArr = [...minesArr, ...safeArr].sort(() => Math.random() - 0.5);
    // caution level
    const cells = cellsArr.map((cell: RS.Cell, i: number) => {
      const isTop = i < level.width;
      const isRight = i > 0 && (i + 1) % level.width === 0;
      const isBottom = i >= (level.width - 1) * level.height;
      const isLeft = i % level.width === 0;

      const n = i - level.width;
      const ne = i - level.width + 1;
      const e = i + 1;
      const se = i + level.width + 1;
      const s = i + level.width;
      const sw = i + level.width - 1;
      const w = i - 1;
      const nw = i - level.width - 1;
      
      let count = 0;
      if (!isTop && cellsArr[n]?.isMine) {
        count++;
      }

      if (!isTop && !isRight && cellsArr[ne]?.isMine) {
        count++;
      }

      if (!isRight && cellsArr[e]?.isMine) {
        count++;
      }

      if (!isRight && !isBottom && cellsArr[se]?.isMine) {
        count++;
      }

      if (!isBottom && cellsArr[s]?.isMine) {
        count++;
      }

      if (!isBottom && !isLeft && cellsArr[sw]?.isMine) {
        count++;
      }

      if (!isLeft && cellsArr[w]?.isMine) {
        count++;
      }

      if (!isTop && !isLeft && cellsArr[nw]?.isMine) {
        count++;
      }

      return {
        ...cell,
        count,
        id: i,
        state: cellConst.states.untouched
      };
    });

    const toDispatch: Action = {
      type: 'init.game',
      height: level.height,
      numMines: level.numMines,
      numMinesRemaining: level.numMines,
      width: level.width,
      cells
    };

    dispatch(toDispatch);
  }, [dispatch]);

  /**
   * 
   */
  const gameOverCB = useCallback((cell: RS.Cell) => {
    const gameOverCells = game.cells.map((gCell: RS.Cell) => {
      if (gCell.state === cellConst.states.flagged) {
        return gCell;
      }

      return {
        ...gCell,
        state: cell.id === gCell.id 
          ? cellConst.states.exploded
          : cellConst.states.checked
      };
    });

    console.log({gameOverCells})

    const toDispatch: Action = {
      type: 'game.over',
      cells: gameOverCells
    };
    dispatch(toDispatch);
  }, [dispatch, game]);

  /**
   * 
   */
  const checkCellCB = useCallback((cell: RS.Cell) => {
    // debugger;
    // start the game if it isn't started
    if (!game.isGameActive && !game.isGameOver) {
      const toStartGameDispatch: Action = {
        type: 'game.start'
      };
      dispatch(toStartGameDispatch);
    }

    let localCells: RS.Cell[] = [...game.cells];
    const isGameOver = checkCellState(cell);

    function checkCellState(cell: RS.Cell) {      
      if (cell.state === cellConst.states.checked) {
        return false;
      }
      
      if (cell.isMine) {
        console.error(' BOOM! ');
        gameOverCB(cell);
        return true;
      }
      
      if (game.isGameOver) {
        return true;
      }
      
      if (cell.state === cellConst.states.flagged || cell.state === cellConst.states.unknown) {
        return false;
      }

      // update our cell in the localCells array with a checked state
      localCells = localCells.map((lCell: RS.Cell) => (
        lCell.id === cell.id 
          ? {...lCell, state: cellConst.states.checked} 
          : lCell
        )
      );
      
      // if count is 0
      if (cell.count === 0) {
        checkCellAround(cell);
      }
    }

    function checkCellAround(cell: RS.Cell) {
      const isTop = cell.id < game.width;
      const isRight = cell.id > 0 && (cell.id + 1) % game.width === 0;
      const isBottom = cell.id >= (game.width - 1) * game.height;
      const isLeft = cell.id % game.width === 0;
  
      const n = cell.id - game.width;
      const ne = cell.id - game.width + 1;
      const e = cell.id + 1;
      const se = cell.id + game.width + 1;
      const s = cell.id + game.width;
      const sw = cell.id + game.width - 1;
      const w = cell.id - 1;
      const nw = cell.id - game.width - 1;
  
      if (!isTop) {
        checkCellState(localCells[n]);
      }

      if (!isTop && !isRight) {
        checkCellState(localCells[ne]);
      }

      if (!isRight) {
        checkCellState(localCells[e]);
      }

      if (!isRight && !isBottom) {
        checkCellState(localCells[se]);
      }

      if (!isBottom) {
        checkCellState(localCells[s]);
      }

      if (!isBottom && !isLeft) {
        checkCellState(localCells[sw]);
      }

      if (!isLeft) {
        checkCellState(localCells[w]);
      }

      if (!isLeft && !isTop) {
        checkCellState(localCells[nw]);
      }
    }

    const youWin = checkWinConditions(localCells);

    // check our win conditions
    function checkWinConditions(cells: RS.Cell[]) {
      // 1. if all flags are used && all flags are on mines
      // 2. if all cells are checked
      let numMines = 0;
      let numFlags = 0;
      let numChecked = 0;
      let flaggedMines = 0;

      cells.forEach((cell: RS.Cell) => {
        if (cell.state === cellConst.states.flagged) {
          numFlags++;

          if (cell.isMine) {
            flaggedMines++;
          }
        }

        if (cell.isMine) {
          numMines++;
        }

        if (cell.state === cellConst.states.checked) {
          numChecked++;
        }
      });

      return numMines === flaggedMines
        || cells.length - numMines === numChecked;
    }

    if (!isGameOver) {
      const toDispatch: Action = {
        type: 'update.cells',
        cells: localCells
      };
      dispatch(toDispatch);
    }

    if (youWin) {
      const toDispatch: Action = {
        type: 'win.game'
      }
      dispatch(toDispatch);
    }
  }, [dispatch, game, gameOverCB]);

  /**
   * 
   */
  const getNumMinesRemainingCB = useCallback((cells: RS.Cell[], numMines: number): number => {
    const numFlags = cells.reduce((prev, curr) => {
      return curr.state === cellConst.states.flagged
        ? prev + 1
        : prev;
    }, 0);
  
    return numMines - numFlags;
  }, []);

  /**
   * 
   */
  const setFlagStateCB = useCallback((cell: RS.Cell) => {
    let cellState = cell.state;

    const numMinesRemaining = getNumMinesRemainingCB(game.cells, game.numMines);

    switch (cell.state) {
      case cellConst.states.untouched:
        if (numMinesRemaining === 0) {
          return;
        }
        cellState = cellConst.states.flagged;
        break;

      case cellConst.states.flagged:
        cellState = cellConst.states.unknown;
        break;

      case cellConst.states.unknown:
        cellState = cellConst.states.untouched;
        break;
    }

    const toDispatch: Action = {
      type: 'check.cell',
      cellId: cell.id,
      state: cellState
    };

    dispatch(toDispatch);
  }, [dispatch, game, getNumMinesRemainingCB]);

  return {
    initGameCB,
    gameOverCB,
    checkCellCB,
    setFlagStateCB,
    getNumMinesRemainingCB
  };
};

export default useGame;