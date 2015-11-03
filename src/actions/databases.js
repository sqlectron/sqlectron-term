import { db as service } from 'sqlectron-core';

export const DB_FETCH_DATABASES_REQUEST = 'DB_FETCH_DATABASES_REQUEST';
export const DB_FETCH_DATABASES_SUCCESS = 'DB_FETCH_DATABASES_SUCCESS';
export const DB_FETCH_DATABASES_FAILURE = 'DB_FETCH_DATABASES_FAILURE';


export function fetchDatabasesIfNeeded () {
  return (dispatch, getState) => {
    if (shouldFetchDatabases(getState())) {
      return dispatch(fetchDatabases());
    }
  };
}


function shouldFetchDatabases (state) {
  const databases = state.databases;
  if (!databases) return true;
  if (databases.isFetching) return false;
  return databases.didInvalidate;
}


function fetchDatabases () {
  return async dispatch => {
    dispatch({ type: DB_FETCH_DATABASES_REQUEST });
    try {
      const databases = await service.listDatabases();
      dispatch({ type: DB_FETCH_DATABASES_SUCCESS, databases });
    } catch (error) {
      dispatch({ type: DB_FETCH_DATABASES_FAILURE, error });
    }
  };
}
