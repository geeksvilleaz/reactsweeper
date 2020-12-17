import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import gameConst from '../constants/gameConst';
import { Action } from '../store/game/game.actions';
import cellConst from '../constants/cellConst';

const useGame = () => {
  const dispatch = useDispatch();
  const game = useSelector((state: RS.Store) => state.game);
  let cellsChecked: any = {};

  const initGameCB = useCallback((difficultyLevel: string) => {
    console.log('init game cb');
    const level = gameConst[difficultyLevel];

    const minesArr = Array(level.numMines).fill({ isMine: true });
    const safeArr = Array(level.width * level.height - level.numMines).fill({ isMine: false });

    const cellsArr = [...minesArr, ...safeArr].sort(() => Math.random() - 0.5);
    // caution level
    const cells = cellsArr.map((cell: RS.Cell, i: number) => {
      const isTop = i < level.width;
      const isRight = i > 0 && i + 1 % level.width === 0;
      const isBottom = i >= (level.width - 1) * level.height;
      const isLeft = i > 0 && i % level.width === 0;

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
      cells
    };

    dispatch(toDispatch);
  }, [dispatch]);

  const gameOverCB = useCallback(() => {}, []);

  const checkCellCB = useCallback((cell: RS.Cell) => {
    cellsChecked[cell.id] = true;

    console.log({ cell });
    // is mine
    if (cell.isMine) {
      console.error(' BOOM! ');
      return;
    }

    // is game over
    if (game.isGameOver) {
      return;
    }

    // if flagged || unknown
    if (cell.state === cellConst.states.flagged || cell.state === cellConst.states.unknown) {
      return;
    }

    // if count > 0
    // change cell state to 'checked'
    const toDispatch: Action = {
      type: 'check.cell',
      cellId: cell.id,
      state: cellConst.states.checked
    };
    dispatch(toDispatch);

    // if count is 0
    if (cell.count === 0) {
      checkCell(cell);
    }

    cellsChecked = {};

    function checkCell(cell: RS.Cell) {
      console.log('checking cell id', cell.id);
      const isTop = cell.id < game.width;
      const isRight = cell.id > 0 && cell.id + 1 % game.width === 0;
      const isBottom = cell.id >= (game.width - 1) * game.height;
      const isLeft = cell.id > 0 && cell.id % game.width === 0;
  
      const n = cell.id - game.width;
      const ne = cell.id - game.width + 1;
      const e = cell.id + 1;
      const se = cell.id + game.width + 1;
      const s = cell.id + game.width;
      const sw = cell.id + game.width - 1;
      const w = cell.id - 1;
      const nw = cell.id - game.width - 1;
  
      const { cells } = game;
      if (!isTop && cells[n].count === 0 && cellsChecked[n]) {
        checkCellCB(cells[n]);
      }

      if (!isTop && !isRight && cells[ne].count === 0 && cellsChecked[ne]) {
        checkCellCB(cells[ne]);
      }

      if (!isRight && cells[e].count === 0 && cellsChecked[e]) {
        checkCellCB(cells[e]);
      }

      if (!isRight && !isBottom && cells[se].count === 0 && cellsChecked[se]) {
        checkCellCB(cells[se]);
      }

      if (!isBottom && cells[s].count === 0 && cellsChecked[s]) {
        checkCellCB(cells[s]);
      }

      if (!isBottom && !isLeft && cells[sw].count === 0 && cellsChecked[sw]) {
        checkCellCB(cells[sw]);
      }

      if (!isLeft && cells[w].count === 0 && cellsChecked[w]) {
        checkCellCB(cells[w]);
      }

      if (!isLeft && !isTop && cells[nw].count === 0 && cellsChecked[nw]) {
        checkCellCB(cells[nw]);
      }
    }
  }, [dispatch, game, cellsChecked]);

  

  const getNumMinesRemainingCB = useCallback((cells: RS.Cell[], numMines: number): number => {
    const numFlags = cells.reduce((prev, curr) => {
      return curr.state === cellConst.states.flagged
        ? prev + 1
        : prev;
    }, 0);
  
    return numMines - numFlags;
  }, []);


  const setFlagStateCB = useCallback((cell: RS.Cell) => {
    console.log({ cell })
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