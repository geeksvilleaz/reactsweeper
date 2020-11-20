import { Action } from './game.actions';

const initialState: RS.Game = {
  cells: [],
  height: 0,
  numMines: 0,
  timer: 0,
  width: 0
};

function game(state = initialState, action: Action) {
  switch (action.type) {
    case 'init.game':
      return {
        ...state,
        ...action
      };

    case 'game.over':
      return state;

    default:
      return state;
  }
}

export default game;