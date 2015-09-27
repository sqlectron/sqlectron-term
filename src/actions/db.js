import * as service from '../services/db';

export const CONNECT_TUNNEL_REQUEST = 'CONNECT_TUNNEL_REQUEST';
export const CONNECT_TUNNEL_SUCCESS = 'CONNECT_TUNNEL_SUCCESS';
export const CONNECT_TUNNEL_FAILURE = 'CONNECT_TUNNEL_FAILURE';

export const CONNECT_SERVER_REQUEST = 'CONNECT_SERVER_REQUEST';
export const CONNECT_SERVER_SUCCESS = 'CONNECT_SERVER_SUCCESS';
export const CONNECT_SERVER_FAILURE = 'CONNECT_SERVER_FAILURE';

export const LOAD_DB_TABLES_REQUEST = 'LOAD_DB_TABLES_REQUEST';
export const LOAD_DB_TABLES_SUCCESS = 'LOAD_DB_TABLES_SUCCESS';
export const LOAD_DB_TABLES_FAILURE = 'LOAD_DB_TABLES_FAILURE';


export function loadTables (serverId, databaseName) {
  return async (dispatch, getState) => {
    const { servers } = getState();
    const server = servers.servers[parseInt(serverId, 10)];

    const handlers = handleEvents(dispatch, {
      onListTablesRequest: () =>
        dispatch({ type: LOAD_DB_TABLES_REQUEST, serverId, databaseName }),
    });

    try {
      const tables = await service.listTables(server, databaseName, handlers);
      dispatch({ type: LOAD_DB_TABLES_SUCCESS, serverId, databaseName, tables });
    } catch (error) {
      dispatch({ type: LOAD_DB_TABLES_FAILURE, serverId, databaseName, error });
    }
  };
}


const handleEvents = (dispatch, handlers) => ({
  onTunnelConnecting: () => dispatch({ type: CONNECT_TUNNEL_REQUEST }),
  onTunnelConnected: () => dispatch({ type: CONNECT_TUNNEL_SUCCESS }),
  onTunnelError: error => dispatch({ type: CONNECT_TUNNEL_FAILURE, error }),
  onServerConnecting: () => dispatch({ type: CONNECT_SERVER_REQUEST }),
  onServerConnected: () => dispatch({ type: CONNECT_SERVER_SUCCESS }),
  onServerError: error => dispatch({ type: CONNECT_SERVER_FAILURE, error }),
  ...handlers,
});
