import { combineReducers } from 'redux';


export default combineReducers({
  addServer: require('./add-server'),
  updateServer: require('./update-server'),
  status: require('./status'),
  servers: require('./servers'),
  session: require('./session'),
  shortcuts: require('./shortcuts'),
  tables: require('./tables'),
});
