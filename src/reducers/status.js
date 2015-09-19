import * as types from '../actions/status';


export default function (
  state = null,
  action
) {
  switch (action.type) {
  case types.SET_STATUS: {
    return action.status instanceof Error
      ? `ERROR: ${action.status.message}`
      : action.status.toString();
  }
  case types.CLEAR_STATUS:
    return null;
  default : return state;
  }
}
