import { DB_CONNECT_SUCCESS } from '../actions/connections';
import {
  DB_FETCH_DATABASES_REQUEST,
  DB_FETCH_DATABASES_SUCCESS,
  DB_FETCH_DATABASES_FAILURE,
} from '../actions/databases';


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
  case DB_FETCH_DATABASES_REQUEST: {
    return { ...state, isFetching: true, didInvalidate: false, error: null };
  }
  case DB_FETCH_DATABASES_SUCCESS: {
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.databases,
      error: null,
    };
  }
  case DB_FETCH_DATABASES_FAILURE: {
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
