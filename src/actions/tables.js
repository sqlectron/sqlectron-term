import { db as service } from 'sqlectron-core';

export const DB_FETCH_TABLES_REQUEST = 'DB_FETCH_TABLES_REQUEST';
export const DB_FETCH_TABLES_SUCCESS = 'DB_FETCH_TABLES_SUCCESS';
export const DB_FETCH_TABLES_FAILURE = 'DB_FETCH_TABLES_FAILURE';


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
