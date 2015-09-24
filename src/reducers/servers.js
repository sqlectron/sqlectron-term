import * as types from '../actions/servers';


export default function (state = { loading: true }, action) {
  switch (action.type) {
  case types.LOAD_SERVER_LIST_REQUEST: {
    return { loading: true };
  }
  case types.LOAD_SERVER_LIST_SUCCESS: {
    return { loading: false, servers: action.servers };
  }
  case types.LOAD_SERVER_LIST_FAILURE: {
    return { loading: false, error: action.error };
  }
  case types.ADD_SERVER_SUCCESS: {
    const servers = [ ...(state.servers || []), action.server ];
    return { ...state, servers };
  }
  case types.UPDATE_SERVER_SUCCESS: {
    const servers = [ ...state.servers || [] ];
    servers[action.id] = action.server;
    return { ...state, servers };
  }
  default : return state;
  }
}
