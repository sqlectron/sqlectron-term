import * as types from '../actions/shortcuts';


export default function (
  state = [],
  action
) {
  switch (action.type) {
  case types.SET_SHORTCUTS: {
    return [].concat(action.shortcuts);
  }
  case types.CLEAR_SHORTCUTS:
    return [];
  default : return state;
  }
}
