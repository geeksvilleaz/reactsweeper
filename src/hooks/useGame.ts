import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import gameConst from '../constants/gameConst';
import { Action } from '../store/game/game.actions';
import cellConst from '../constants/cellConst';

const useGame = () => {
  const dispatch = useDispatch();
  const game = useSelector((state: RS.Store) => state.game);

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
      width: level.width,
      cells
    };

    dispatch(toDispatch);
  }, [dispatch]);

  const gameOverCB = useCallback(() => {}, []);

  const checkCellCB = useCallback((cell: RS.Cell) => {
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
      // expansion
    }
  }, [dispatch, game]);

  return {
    initGameCB,
    gameOverCB,
    checkCellCB
  };
};

export default useGame;