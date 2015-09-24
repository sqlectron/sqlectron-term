import { combineReducers } from 'redux';


export default combineReducers({
  addServer: require('./add-server'),
  status: require('./status'),
  servers: require('./servers'),
  shortcuts: require('./shortcuts'),
});
