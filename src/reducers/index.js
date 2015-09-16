import { combineReducers } from 'redux';

import { types } from '../actions';


export function screenId (state = 'connections', action) {
  if (action.screenId) return action.screenId;
  return state;
}


export function connections (
  state = { loading: true },
  action
) {
  switch (action.type) {
  case types.LOAD_CONNECTIONS_REQUEST:
    return { loading: true };
  case types.LOAD_CONNECTIONS_SUCCESS:
    return { loading: false, connections: action.connections };
  case types.LOAD_CONNECTIONS_FAILURE:
    return { loading: false, error: action.error };
  default : return state;
  }
}


export default combineReducers({
  screenId,
  connections,
});
