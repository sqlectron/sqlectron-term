import { servers as service } from 'sqlectron-core';

export const FETCH_SERVERS_REQUEST = 'FETCH_SERVERS_REQUEST';
export const FETCH_SERVERS_SUCCESS = 'FETCH_SERVERS_SUCCESS';
export const FETCH_SERVERS_FAILURE = 'FETCH_SERVERS_FAILURE';

export const SAVE_SERVER_PREPARE = 'SAVE_SERVER_PREPARE';
export const SAVE_SERVER_REQUEST = 'SAVE_SERVER_REQUEST';
export const SAVE_SERVER_SUCCESS = 'SAVE_SERVER_SUCCESS';
export const SAVE_SERVER_FAILURE = 'SAVE_SERVER_FAILURE';

export const REMOVE_SERVER = 'REMOVE_SERVER';


export function fetchServersIfNeeded () {
  return (dispatch, getState) => {
    if (shouldFetchServers(getState())) {
      return dispatch(fetchServers());
    }
  };
}


function shouldFetchServers (state) {
  const servers = state.servers;
  if (!servers) return true;
  if (servers.isFetching) return false;
  return servers.didInvalidate;
}


function fetchServers () {
  return async dispatch => {
    dispatch({ type: FETCH_SERVERS_REQUEST });
    try {
      await service.prepareConfiguration();
      const data = await service.getAll();
      dispatch({
        type: FETCH_SERVERS_SUCCESS,
        servers: data.servers,
      });
    } catch (error) {
      dispatch({ type: FETCH_SERVERS_FAILURE, error });
    }
  };
}


export function prepareSaveServer (server) {
  return {
    type: SAVE_SERVER_PREPARE,
    server,
  };
}


export function saveServer (server) {
  return async dispatch => {
    dispatch({ type: SAVE_SERVER_REQUEST, server });
    try {
      const saved = await service.addOrUpdate(server);
      dispatch({
        type: SAVE_SERVER_SUCCESS,
        server: saved,
      });
    } catch (error) {
      dispatch({ type: SAVE_SERVER_FAILURE, error });
    }
  };
}


export function removeServer (id) {
  return async dispatch => {
    try {
      await service.removeById(id);
    } finally {
      dispatch({ type: REMOVE_SERVER, id });
    }
  };
}
