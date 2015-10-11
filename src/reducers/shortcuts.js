import * as types from '../actions/shortcuts';


export default function (
  state = [],
  action
) {
  switch (action.type) {
  case types.ADD_SHORTCUTS:
    return [ ...state, ...action.shortcuts ];
  case types.REMOVE_SHORTCUTS:
    return state.filter(
      shortcut => !action.shortcuts.find(
        actionShortcut => shortcut.key === actionShortcut.key
      )
    );
  default : return state;
  }
}
