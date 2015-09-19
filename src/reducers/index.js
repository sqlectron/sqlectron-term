import { combineReducers } from 'redux';


export default combineReducers({
  status: require('./status'),
  servers: require('./servers'),
  shortcuts: require('./shortcuts'),
});
