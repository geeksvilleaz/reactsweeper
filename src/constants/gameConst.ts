interface GameConst {
  [key: string]: GameLevel;
}

interface GameLevel {
  width: number;
  height: number;
  numMines: number;
}

const gameConst: GameConst = {
  beginner: {
    width: 9,
    height: 9,
    numMines: 10
  },
  intermediate: {
    width: 9,
    height: 9,
    numMines: 10
  },
  boss: {
    width: 9,
    height: 9,
    numMines: 10
  }
};

export default gameConst;