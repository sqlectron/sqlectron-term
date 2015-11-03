import { db as service } from 'sqlectron-core';

export const DB_CONNECT_REQUEST = 'DB_CONNECT_REQUEST';
export const DB_CONNECT_SUCCESS = 'DB_CONNECT_SUCCESS';
export const DB_CONNECT_FAILURE = 'DB_CONNECT_FAILURE';


export function connectIfNeeded (serverId, database) {
  const id = parseInt(serverId, 10);

  return (dispatch, getState) => {
    if (shouldConnect(id, database, getState())) {
      return dispatch(connect(id, database));
    }
  };
}


function shouldConnect(serverId, database, state) {
  const { connections } = state;

  if (!connections) return true;
  if (!connections.server) return true;
  if (connections.isConnecting) return false;
  if (connections.server.id !== serverId || connections.database !== database) {
    return true;
  }

  return state.connections.didInvalidate;
}


function connect (serverId, database) {
  return async (dispatch, getState) => {
    const { servers } = getState();
    const server = {
      ...servers.servers[serverId],
      id: serverId,
    };

    dispatch({ type: DB_CONNECT_REQUEST, server, database });
    try {
      await service.connect(server, database);
      dispatch({ type: DB_CONNECT_SUCCESS, server, database });
    } catch (error) {
      dispatch({ type: DB_CONNECT_FAILURE, server, database, error });
    }
  };
}
