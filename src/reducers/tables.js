import { DB_CONNECT_SUCCESS } from '../actions/connections';
import {
  DB_FETCH_TABLES_REQUEST,
  DB_FETCH_TABLES_SUCCESS,
  DB_FETCH_TABLES_FAILURE,
} from '../actions/tables';


const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  error: null,
};


export default function (state = initialState, action) {
  switch (action.type) {
  case DB_CONNECT_SUCCESS: {
    return { ...state, items: [], didInvalidate: true };
  }
  case DB_FETCH_TABLES_REQUEST: {
    return { ...state, isFetching: true, didInvalidate: false, error: null };
  }
  case DB_FETCH_TABLES_SUCCESS: {
    return { ...state, isFetching: false, items: action.tables };
  }
  case DB_FETCH_TABLES_FAILURE: {
    return {
      ...state,
      items: [],
      isFetching: false,
      didInvalidate: true,
      error: action.error,
    };
  }
  default : return state;
  }
}
