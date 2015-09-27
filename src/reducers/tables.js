import * as types from '../actions/db';


export default function (state = { loading: false }, action) {
  switch (action.type) {
  case types.LOAD_DB_TABLES_REQUEST: {
    return { loading: true };
  }
  case types.LOAD_DB_TABLES_SUCCESS: {
    return { loading: false, tables: action.tables };
  }
  case types.LOAD_DB_TABLES_FAILURE: {
    return { loading: false, error: action.error };
  }
  default : return state;
  }
}
