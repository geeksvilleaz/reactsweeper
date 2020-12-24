type InitGame = {
  type: 'init.game';
  width: number;
  height: number;
  numMines: number;
  numMinesRemaining: number;
  cells: RS.Cell[];
  difficultyLevel: string;
}

type GameStart = {
  type: 'game.start';
}

type GameOver = {
  type: 'game.over';
  cells: RS.Cell[];
}

type GameWon = {
  type: 'game.won';
}

type CheckCell = {
  type: 'check.cell';
  cellId: number;
  state: string;
}

type UpdateCells = {
  type: 'update.cells';
  cells: RS.Cell[];
}

export type Action = InitGame 
  | GameOver 
  | CheckCell
  | UpdateCells
  | GameStart
  | GameWon;