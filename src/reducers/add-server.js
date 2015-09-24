import * as types from '../actions/servers';


export default function (state = { loading: false }, action) {
  switch (action.type) {
  case types.ADD_SERVER_REQUEST:
    return { loading: true };
  case types.ADD_SERVER_SUCCESS:
    return { loading: false, server: action.server };
  case types.ADD_SERVER_FAILURE:
    return { loading: false, error: action.error };
  default : return state;
  }
}
