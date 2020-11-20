import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import gameConst from '../constants/gameConst';
import { Action } from '../store/game/game.actions';

const useGame = () => {
  const dispatch = useDispatch();

  const initGameCB = useCallback((difficultyLevel: string) => {
    console.log('init game cb');
    const level = gameConst[difficultyLevel];

    const minesArr = Array(level.numMines).fill({ isMine: true });
    const safeArr = Array(level.width * level.height - level.numMines).fill({ isMine: false });

    const cellsArr = [...minesArr, ...safeArr].sort(() => Math.random() - 0.5);
    // caution level
    const cells = cellsArr.map((cell: RS.Cell, i: number) => {
      const isTop = i < level.width;
      const isRight = i % level.width - 1 === 0;
      const isBottom = i > (level.width - 1) * level.height;
      const isLeft = i % level.width === 0;

      let count = 0;
      if (!isTop && cellsArr[i - level.width].isMine) {
        count++;
      }

      if (!isTop && !isRight && cellsArr[i - level.width + 1].isMine) {
        count++;
      }

      if (!isRight && cellsArr[i + 1].isMine) {
        count++;
      }

      if (!isRight && !isBottom && cellsArr[i + level.width + 1].isMine) {
        count++;
      }

      if (!isBottom && cellsArr[i + level.width].isMine) {
        count++;
      }


      return cell;
    });

    console.log({ cellsArr });

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

  return {
    initGameCB,
    gameOverCB
  };
};

export default useGame;