import { db as service } from 'sqlectron-core';

export const DB_EXECUTE_QUERY_REQUEST = 'DB_EXECUTE_QUERY_REQUEST';
export const DB_EXECUTE_QUERY_SUCCESS = 'DB_EXECUTE_QUERY_SUCCESS';
export const DB_EXECUTE_QUERY_FAILURE = 'DB_EXECUTE_QUERY_FAILURE';


export function executeQueryIfNeeded (query) {
  return (dispatch, getState) => {
    if (shouldExecuteQuery(query, getState())) {
      return dispatch(executeQuery(query));
    }
  };
}


function shouldExecuteQuery (query, state) {
  if (!state.query) return true;
  if (state.query.isExecuting) return false;
  if (state.query.query !== query) return true;
  return state.query.didInvalidate;
}


function executeQuery (query) {
  return async dispatch => {
    dispatch({ type: DB_EXECUTE_QUERY_REQUEST, query });
    try {
      const result = await service.executeQuery(query);
      dispatch({ type: DB_EXECUTE_QUERY_SUCCESS, query, result });
    } catch (error) {
      dispatch({ type: DB_EXECUTE_QUERY_FAILURE, query, error });
    }
  };
}
