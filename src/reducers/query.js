import * as types from '../actions/db';


export default function (state = reset(), action) {
  switch (action.type) {
  case types.DB_CONNECT_SUCCESS: {
    return reset();
  }
  case types.DB_EXECUTE_QUERY_REQUEST: {
    return {
      ...reset(),
      isExecuting: true,
      didInvalidate: false,
      query: action.query,
    };
  }
  case types.DB_EXECUTE_QUERY_SUCCESS: {
    return {
      ...reset(),
      didInvalidate: false,
      query: action.query,
      result: action.result,
    };
  }
  case types.DB_EXECUTE_QUERY_FAILURE: {
    return {
      ...reset(),
      query: action.query,
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
