import {
  SAVE_SERVER_PREPARE,
  SAVE_SERVER_REQUEST,
  SAVE_SERVER_SUCCESS,
  SAVE_SERVER_FAILURE,
} from '../actions/servers';


const initialState = {
  isSaving: false,
  server: null,
  error: null,
};


export default function (state = initialState, action) {
  switch (action.type) {
  case SAVE_SERVER_PREPARE:
    return { ...initialState, server: action.server || null };
  case SAVE_SERVER_REQUEST:
    return { ...initialState, isSaving: true, server: action.server };
  case SAVE_SERVER_SUCCESS:
    return { ...state, isSaving: false };
  case SAVE_SERVER_FAILURE:
    return { ...state, isSaving: false, error: action.error.validationErrors };
  default : return state;
  }
}
