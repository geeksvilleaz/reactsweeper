import { Action } from './game.actions';

const initialState: RS.Game = {
  cells: [],
  height: 0,
  numMines: 0,
  numMinesRemaining: 0,
  timer: 0,
  width: 0,
  isGameOver: false,
  isGameActive: false,
  isGameWon: false,
  difficultyLevel: 'beginner'
};

function game(state = initialState, action: Action) {
  switch (action.type) {
    case 'init.game':
      return {
        ...state,
        ...action,
        isGameOver: false,
        isGameActive: false,
        isGameWon: false,
        difficultyLevel: action.difficultyLevel
      };
    
    case 'game.start':
      return {
        ...state,
        isGameActive: true
      };

    case 'game.won':
      return {
        ...state,
        isGameActive: false,
        isGameOver: true,
        isGameWon: true
      };

    case 'game.over':
      return {
        ...state,
        isGameOver: true,
        isGameActive: false,
        isGameWon: false,
        cells: action.cells
      };

    case 'check.cell':
      return {
        ...state,
        cells: state.cells.map((cell: RS.Cell) => {
          if (cell.id === action.cellId) {
            return {
              ...cell,
              state: action.state
            };
          }

          return cell;
        })
      };

    case 'update.cells':
      return {
        ...state,
        cells: action.cells
      };

    default:
      return state;
  }
}

export default game;