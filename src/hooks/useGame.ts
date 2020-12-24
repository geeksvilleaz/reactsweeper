import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import gameConst from '../constants/gameConst';
import { Action } from '../store/game/game.actions';
import cellConst from '../constants/cellConst';

const useGame = () => {
  const dispatch = useDispatch();
  const game = useSelector((state: RS.Store) => state.game);

  function checkWinState(cells: RS.Cell[]): boolean {
    let numMinesFlagged = 0;
    let numMines = 0;
    let numChecked = 0;

    cells.forEach((cell: RS.Cell) => {
      if (cell.state === cellConst.states.flagged && cell.isMine) {
        numMinesFlagged++;
      }

      if (cell.isMine) {
        numMines++;
      }

      if (cell.state === cellConst.states.checked) {
        numChecked++;
      }
    });

    console.log({ numMines, numMinesFlagged, numChecked})

    // 1. number of flags === number of mines && flag === isMine
    // 2. all cells checked
    return numMines === numMinesFlagged
      || cells.length - numMines === numChecked;
  }

  const initGameCB = useCallback((difficultyLevel: string) => {
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

    console.log({ cells });

    const toDispatch: Action = {
      type: 'init.game',
      height: level.height,
      numMines: level.numMines,
      numMinesRemaining: level.numMines,
      width: level.width,
      cells,
      difficultyLevel
    };

    dispatch(toDispatch);
  }, [dispatch]);

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

  const checkCellCB = useCallback((cell: RS.Cell) => {
    if (!game.isGameActive && !game.isGameOver) {
      const toGameActiveDispatch: Action = {
        type: 'game.start'
      };
      dispatch(toGameActiveDispatch);
    }
    
    let localCells = [...game.cells];
    const isGameOver = checkCellState(cell);
    const isWinner = checkWinState(localCells);

    checkWinState(localCells);

    if (!isGameOver) {
      const toDispatch: Action = {
        type: 'update.cells',
        cells: localCells
      };
      dispatch(toDispatch);
    }

    if (isWinner) {
      const toDispatch: Action = {
        type: 'game.won'
      };
      dispatch(toDispatch);
    }

    /**
     * 
     */
    function checkCellState(cell: RS.Cell) {
      if (cell.state === cellConst.states.checked) {
        return false;
      }

      // is mine
      if (cell.isMine) {
        console.error(' BOOM! ');
        gameOverCB(cell);
        return true;
      }

      // is game over
      if (game.isGameOver) {
        return true;
      }

      // if flagged || unknown
      if (cell.state === cellConst.states.flagged || cell.state === cellConst.states.unknown) {
        return false;
      }

      localCells = localCells.map((localCell: RS.Cell) => {
        return localCell.id === cell.id
          ? {
              ...localCell,
              state: cellConst.states.checked
            }
          : localCell
      });

      // if count is 0
      if (cell.count === 0) {
        checkNearbyCells(cell);
      }
    }

    /**
     * 
     */
    function checkNearbyCells(cell: RS.Cell) {
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
  }, [dispatch, game, gameOverCB]);

  const getNumMinesRemainingCB = useCallback((cells: RS.Cell[], numMines: number): number => {
    const numFlags = cells.reduce((prev, curr) => {
      return curr.state === cellConst.states.flagged
        ? prev + 1
        : prev;
    }, 0);
  
    return numMines - numFlags;
  }, []);

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

    const localCells = game.cells.map((localCell: RS.Cell) => {
      if (localCell.id === cell.id) {
        return {
          ...localCell,
          state: cellState
        }
      }

      return localCell;
    });
    const isWinner = checkWinState(localCells);
    if (isWinner) {
      const toWinnnerDispatch: Action = {
        type: 'game.won'
      };
      dispatch(toWinnnerDispatch)
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