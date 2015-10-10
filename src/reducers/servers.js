import * as types from '../actions/servers';


export default function (state = { loading: true }, action) {
  switch (action.type) {
  case types.LOAD_SERVER_LIST_REQUEST: {
    return { loading: true };
  }
  case types.LOAD_SERVER_LIST_SUCCESS: {
    const servers = action.servers.map(
      (server, idx) => ({ ...server, id: idx })
    );
    return { loading: false, servers };
  }
  case types.LOAD_SERVER_LIST_FAILURE: {
    return { loading: false, error: action.error };
  }
  case types.ADD_SERVER_SUCCESS: {
    const servers = [ ...(state.servers || []) ];
    servers.push({ ...action.server, id: servers.length });
    return { ...state, servers };
  }
  case types.UPDATE_SERVER_SUCCESS: {
    const servers = [ ...state.servers || [] ];
    servers[action.id] = { ...action.server, id: action.id };
    return { ...state, servers };
  }
  case types.REMOVE_SERVER: {
    const servers = [
      ...state.servers.slice(0, action.id),
      ...state.servers.slice(action.id + 1),
    ];
    servers.forEach((server, idx) => server.id = idx);
    return { ...state, servers };
  }
  default : return state;
  }
}
