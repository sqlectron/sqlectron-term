import { DB_CONNECT_SUCCESS } from '../actions/connections';
import * as types from '../actions/db';


export default function (state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
}, action) {
  switch (action.type) {
  case DB_CONNECT_SUCCESS: {
    return { ...state, items: [], didInvalidate: true };
  }
  case types.DB_FETCH_TABLES_REQUEST: {
    return { ...state, isFetching: true, didInvalidate: false, error: null };
  }
  case types.DB_FETCH_TABLES_SUCCESS: {
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.tables,
      error: null,
    };
  }
  case types.DB_FETCH_TABLES_FAILURE: {
    return {
      ...state,
      isFetching: false,
      didInvalidate: true,
      error: action.error,
    };
  }
  default : return state;
  }
}
