import { Action } from './game.actions';

const initialState: RS.Game = {
  cells: [],
  height: 0,
  numMines: 0,
  numMinesRemaining: 0,
  timer: 0,
  width: 0,
  isGameOver: false,
  isWon: false,
  isGameActive: false
};

function game(state = initialState, action: Action) {
  switch (action.type) {
    case 'init.game':
      return {
        ...state,
        ...action,
        isGameOver: false,
        isGameActive: false,
        isWon: false
      };

    case 'game.start':
      return {
        ...state,
        isGameActive: true
      };

    case 'game.over':
      return {
        ...state,
        isGameActive: false,
        isGameOver: true,
        cells: action.cells
      };

    case 'win.game':
      console.log('YOU WIN (from reducer');
      return {
        ...state,
        isGameActive: false,
        isGameOver: true,
        isWon: true
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
      console.log('reducer update.cells')
      return {
        ...state,
        cells: action.cells
      };
      
    default:
      return state;
  }
}

export default game;