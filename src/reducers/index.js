import { combineReducers } from 'redux';


export default combineReducers({
  connections: require('./connections'),
  databases: require('./databases'),
  queries: require('./queries'),
  saveServer: require('./save-server'),
  status: require('./status'),
  servers: require('./servers'),
  shortcuts: require('./shortcuts'),
  tables: require('./tables'),
});
