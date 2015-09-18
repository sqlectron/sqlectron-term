import { combineReducers } from 'redux';


export default combineReducers({
  app: require('./app'),
  servers: require('./servers'),
});
