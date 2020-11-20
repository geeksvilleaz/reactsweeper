declare module RS {
  interface Game {
    width: number;
    height: number;
    numMines: number;
    timer: number;
    cells: Cell[];
  }

  interface Cell {
    id: number;
    state: string;
    isMine: boolean;
  }

  interface Store {
    game: Game;
  }
}