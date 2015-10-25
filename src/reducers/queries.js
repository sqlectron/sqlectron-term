import { DB_CONNECT_SUCCESS } from '../actions/connections';
import {
  DB_EXECUTE_QUERY_REQUEST,
  DB_EXECUTE_QUERY_SUCCESS,
  DB_EXECUTE_QUERY_FAILURE,
} from '../actions/queries';


const initialState = {
  isExecuting: false,
  didInvalidate: true,
  query: '',
  result: null,
  error: null,
};


export default function (state = initialState, action) {
  switch (action.type) {
  case DB_CONNECT_SUCCESS: {
    return { ...initialState };
  }
  case DB_EXECUTE_QUERY_REQUEST: {
    return {
      ...initialState,
      isExecuting: true,
      didInvalidate: false,
      query: action.query,
    };
  }
  case DB_EXECUTE_QUERY_SUCCESS: {
    return {
      ...initialState,
      didInvalidate: false,
      query: action.query,
      result: action.result,
    };
  }
  case DB_EXECUTE_QUERY_FAILURE: {
    return {
      ...initialState,
      query: action.query,
      error: action.error,
    };
  }
  default : return state;
  }
}
