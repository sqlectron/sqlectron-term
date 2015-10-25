import {
  DB_CONNECT_REQUEST,
  DB_CONNECT_SUCCESS,
  DB_CONNECT_FAILURE,
} from '../actions/connections';
import { UPDATE_SERVER_SUCCESS } from '../actions/servers';


const initialState = {
  didInvalidate: true,
};


export default function (state = initialState, action) {
  switch (action.type) {
  case UPDATE_SERVER_SUCCESS: {
    const id = parseInt(action.id, 10);
    if (state.server && id === state.server.id) {
      return { ...state, didInvalidate: true };
    }
    return state;
  }
  case DB_CONNECT_REQUEST: {
    const { server, database } = action;
    return {
      isConnecting: true,
      isConnected: false,
      didInvalidate: false,
      server,
      database,
    };
  }
  case DB_CONNECT_SUCCESS: {
    return { ...state, isConnecting: false, isConnected: true, error: null };
  }
  case DB_CONNECT_FAILURE: {
    return {
      ...state,
      isConnecting: false,
      error: action.error,
    };
  }
  default : return state;
  }
}
