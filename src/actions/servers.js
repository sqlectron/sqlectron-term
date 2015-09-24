import * as service from '../services/servers';


export const LOAD_SERVER_LIST_REQUEST = 'LOAD_SERVER_LIST_REQUEST';
export const LOAD_SERVER_LIST_SUCCESS = 'LOAD_SERVER_LIST_SUCCESS';
export const LOAD_SERVER_LIST_FAILURE = 'LOAD_SERVER_LIST_FAILURE';

export const ADD_SERVER_REQUEST = 'ADD_SERVER_REQUEST';
export const ADD_SERVER_SUCCESS = 'ADD_SERVER_SUCCESS';
export const ADD_SERVER_FAILURE = 'ADD_SERVER_FAILURE';

export const UPDATE_SERVER_REQUEST = 'UPDATE_SERVER_REQUEST';
export const UPDATE_SERVER_SUCCESS = 'UPDATE_SERVER_SUCCESS';
export const UPDATE_SERVER_FAILURE = 'UPDATE_SERVER_FAILURE';

export const REMOVE_SERVER = 'REMOVE_SERVER';


export function loadServerList() {
  return async dispatch => {
    dispatch({ type: LOAD_SERVER_LIST_REQUEST });
    try {
      const data = await service.loadServerListFromFile();
      dispatch({
        type: LOAD_SERVER_LIST_SUCCESS,
        servers: data.servers,
      });
    } catch (e) {
      dispatch({ type: LOAD_SERVER_LIST_FAILURE, error: e });
    }
  };
}


export function addServer (server) {
  return async dispatch => {
    dispatch({ type: ADD_SERVER_REQUEST, server });
    try {
      const added = await service.addServer(server);
      dispatch({
        type: ADD_SERVER_SUCCESS,
        server: added,
      });
    } catch (error) {
      dispatch({ type: ADD_SERVER_FAILURE, error });
    }
  };
}


export function updateServer (id, server) {
  return async dispatch => {
    dispatch({ type: UPDATE_SERVER_REQUEST, id, server });
    try {
      const updated = await service.updateServer(id, server);
      dispatch({
        type: UPDATE_SERVER_SUCCESS,
        id,
        server: updated,
      });
    } catch (error) {
      dispatch({ type: UPDATE_SERVER_FAILURE, id, error });
    }
  };
}


export function removeServer (id) {
  return async dispatch => {
    try {
      await service.removeServer(id);
    } finally {
      dispatch({ type: REMOVE_SERVER, id });
    }
  };
}
