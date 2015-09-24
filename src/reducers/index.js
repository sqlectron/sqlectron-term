import { combineReducers } from 'redux';


export default combineReducers({
  addServer: require('./add-server'),
  updateServer: require('./update-server'),
  status: require('./status'),
  servers: require('./servers'),
  shortcuts: require('./shortcuts'),
});
