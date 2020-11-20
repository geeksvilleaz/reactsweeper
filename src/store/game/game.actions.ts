type InitGame = {
  type: 'init.game';
  width: number;
  height: number;
  numMines: number;
  cells: RS.Cell[];
}

type GameOver = {
  type: 'game.over';
}

export type Action = InitGame | GameOver;