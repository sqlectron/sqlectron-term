import { loadServerListFromFile } from '../services/servers';


export const LOAD_SERVER_LIST_REQUEST = 'LOAD_SERVER_LIST_REQUEST';
export const LOAD_SERVER_LIST_SUCCESS = 'LOAD_SERVER_LIST_SUCCESS';
export const LOAD_SERVER_LIST_FAILURE = 'LOAD_SERVER_LIST_FAILURE';


export function loadServerList() {
  return async dispatch => {
    dispatch({ type: LOAD_SERVER_LIST_REQUEST });
    try {
      const data = await loadServerListFromFile();
      dispatch({
        type: LOAD_SERVER_LIST_SUCCESS,
        servers: data.servers,
      });
    } catch (e) {
      dispatch({ type: LOAD_SERVER_LIST_FAILURE, error: e });
    }
  };
}
