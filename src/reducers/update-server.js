import * as types from '../actions/servers';


export default function (state = { loading: false }, action) {
  switch (action.type) {
  case types.UPDATE_SERVER_REQUEST:
    return { loading: true, id: action.id };
  case types.UPDATE_SERVER_SUCCESS:
    return { loading: false, id: action.id, server: action.server };
  case types.UPDATE_SERVER_FAILURE:
    return { loading: false, id: action.id, error: action.error };
  default : return state;
  }
}
