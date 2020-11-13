type InitGame = {
  type: 'init.game';
  width: number;
  height: number;
  numMines: number;
}

export type Action = InitGame;