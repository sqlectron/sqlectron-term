import * as types from '../actions/db';


export default function (state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
}, action) {
  switch (action.type) {
  case types.DB_CONNECT_SUCCESS: {
    return { ...state, items: [], didInvalidate: true };
  }
  case types.DB_FETCH_DATABASES_REQUEST: {
    return { ...state, isFetching: true, didInvalidate: false, error: null };
  }
  case types.DB_FETCH_DATABASES_SUCCESS: {
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: action.databases,
      error: null,
    };
  }
  case types.DB_FETCH_DATABASES_FAILURE: {
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
