import * as types from '../actions/db';


export default function (
  state = {
    tunnel: { connecting: false, connected: false, error: null },
    server: { connecting: false, connected: false, error: null },
  }
  , action) {
  switch (action.type) {
  case types.CONNECT_TUNNEL_REQUEST: {
    return {
      ...state,
      tunnel: { connecting: true, connected: false, error: null },
    };
  }
  case types.CONNECT_TUNNEL_SUCCESS: {
    return {
      ...state,
      tunnel: { connecting: false, connected: true, error: null },
    };
  }
  case types.CONNECT_TUNNEL_FAILURE: {
    return {
      ...state,
      tunnel: { connecting: false, connected: false, error: action.error },
    };
  }
  case types.CONNECT_SERVER_REQUEST: {
    return {
      ...state,
      server: { connecting: true, connected: false, error: null },
    };
  }
  case types.CONNECT_SERVER_SUCCESS: {
    return {
      ...state,
      server: { connecting: false, connected: true, error: null },
    };
  }
  case types.CONNECT_SERVER_FAILURE: {
    return {
      ...state,
      server: { connecting: false, connected: false, error: action.error },
    };
  }
  default : return state;
  }
}
