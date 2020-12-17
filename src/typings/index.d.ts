declare module RS {
  interface Game {
    width: number;
    height: number;
    numMines: number;
    numMinesRemaining: number;
    timer: number;
    cells: Cell[];
    isGameOver: boolean;
  }

  interface Cell {
    id: number;
    state: string;
    isMine: boolean;
    count: number;
  }

  interface Store {
    game: Game;
  }
}