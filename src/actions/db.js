import * as service from '../services/db';

export const DB_CONNECT_REQUEST = 'DB_CONNECT_REQUEST';
export const DB_CONNECT_SUCCESS = 'DB_CONNECT_SUCCESS';
export const DB_CONNECT_FAILURE = 'DB_CONNECT_FAILURE';

export const DB_FETCH_TABLES_REQUEST = 'DB_FETCH_TABLES_REQUEST';
export const DB_FETCH_TABLES_SUCCESS = 'DB_FETCH_TABLES_SUCCESS';
export const DB_FETCH_TABLES_FAILURE = 'DB_FETCH_TABLES_FAILURE';

export const DB_EXECUTE_QUERY_REQUEST = 'DB_EXECUTE_QUERY_REQUEST';
export const DB_EXECUTE_QUERY_SUCCESS = 'DB_EXECUTE_QUERY_SUCCESS';
export const DB_EXECUTE_QUERY_FAILURE = 'DB_EXECUTE_QUERY_FAILURE';


export function connect (serverId, database) {
  return async (dispatch, getState) => {
    const { servers } = getState();
    const server = servers.servers[parseInt(serverId, 10)];

    dispatch({ type: DB_CONNECT_REQUEST, server, database });
    try {
      await service.connect(server, database);
      dispatch({ type: DB_CONNECT_SUCCESS, server, database });
    } catch (error) {
      dispatch({ type: DB_CONNECT_FAILURE, server, database, error });
    }
  };
}


export function executeQueryIfNeeded (query) {
  return (dispatch, getState) => {
    if (shouldExecuteQuery(query, getState())) {
      return dispatch(executeQuery(query));
    }
  };
}


export function fetchTablesIfNeeded () {
  return (dispatch, getState) => {
    if (shouldFetchTables(getState())) {
      return dispatch(fetchTables());
    }
  };
}


function shouldFetchTables (state) {
  const tables = state.tables;
  if (!tables) return true;
  if (tables.isFetching) return false;
  return tables.didInvalidate;
}


function fetchTables () {
  return async dispatch => {
    dispatch({ type: DB_FETCH_TABLES_REQUEST });
    try {
      const tables = await service.listTables();
      dispatch({ type: DB_FETCH_TABLES_SUCCESS, tables });
    } catch (error) {
      dispatch({ type: DB_FETCH_TABLES_FAILURE, error });
    }
  };
}


function shouldExecuteQuery (query, state) {
  if (!state.query) return true;
  if (state.query.isExecuting) return false;
  return state.query.didInvalidate;
}


function executeQuery (query) {
  return async dispatch => {
    dispatch({ type: DB_EXECUTE_QUERY_REQUEST });
    try {
      const result = await service.executeQuery(query);
      dispatch({ type: DB_EXECUTE_QUERY_SUCCESS, query, result });
    } catch (error) {
      dispatch({ type: DB_EXECUTE_QUERY_FAILURE, error });
    }
  };
}
