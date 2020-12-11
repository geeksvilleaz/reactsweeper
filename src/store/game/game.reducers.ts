import { Action } from './game.actions';

const initialState: RS.Game = {
  cells: [],
  height: 0,
  numMines: 0,
  timer: 0,
  width: 0,
  isGameOver: false
};

function game(state = initialState, action: Action) {
  switch (action.type) {
    case 'init.game':
      return {
        ...state,
        ...action,
        isGameOver: false
      };

    case 'game.over':
      return {
        ...state,
        isGameOver: true
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

    default:
      return state;
  }
}

export default game;