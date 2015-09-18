import * as types from '../actions/status';


export default function (
  state = { status: null },
  action
) {
  switch (action.type) {
  case types.SET_STATUS: {
    const status = action.status instanceof Error
      ? `ERROR: ${action.status.message}`
      : action.status.toString();
    return { ...state, status };
  }
  case types.CLEAR_STATUS:
    return { ...state, status: null };
  default : return state;
  }
}
