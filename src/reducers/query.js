import * as types from '../actions/db';


export default function (state = reset(), action) {
  switch (action.type) {
  case types.DB_CONNECT_SUCCESS: {
    return reset();
  }
  case types.DB_EXECUTE_QUERY_REQUEST: {
    return { ...state, isExecuting: true, didInvalidate: false, error: null };
  }
  case types.DB_EXECUTE_QUERY_SUCCESS: {
    return {
      ...state,
      isExecuting: false,
      didInvalidate: false,
      query: action.query,
      result: action.result,
      error: null,
    };
  }
  case types.DB_EXECUTE_QUERY_FAILURE: {
    return {
      ...state,
      isExecuting: false,
      didInvalidate: true,
      error: action.error,
    };
  }
  default : return state;
  }
}


function reset () {
  return {
    isExecuting: false,
    didInvalidate: true,
    query: '',
    result: null,
    error: null,
  };
}
