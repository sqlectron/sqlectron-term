import { merge } from 'lodash';

import {
  FETCH_SERVERS_REQUEST,
  FETCH_SERVERS_SUCCESS,
  FETCH_SERVERS_FAILURE,
  SAVE_SERVER_SUCCESS,
  REMOVE_SERVER,
} from '../actions/servers';


const initialState = {
  isFetching: false,
  didInvalidate: true,
  items: [],
  error: null,
};


export default function (state = initialState, action) {
  switch (action.type) {
  case FETCH_SERVERS_REQUEST: {
    return { ...state, isFetching: true, didInvalidate: false, error: null };
  }
  case FETCH_SERVERS_SUCCESS: {
    return { ...state, isFetching: false, items: action.servers };
  }
  case FETCH_SERVERS_FAILURE: {
    return {
      ...initialState,
      error: action.error,
    };
  }
  case SAVE_SERVER_SUCCESS: {
    let found = false;
    const server = merge({}, action.server);
    const items = state.items.map(item => {
      if (item.id !== server.id) return item;
      found = true;
      return server;
    });
    if (!found) items.push(server);
    return { ...state, items };
  }
  case REMOVE_SERVER: {
    const items = state.items.filter(item => item.id !== action.id);
    return { ...state, items };
  }
  default : return state;
  }
}
