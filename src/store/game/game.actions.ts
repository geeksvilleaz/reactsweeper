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

type CheckCell = {
  type: 'check.cell';
  cellId: number;
  state: string;
}

export type Action = InitGame 
  | GameOver 
  | CheckCell;