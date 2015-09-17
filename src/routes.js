import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';

import createHistory from './history/create-term-history';
import configureStore from './store';


const history = createHistory('/server/list');
const store = configureStore();


export default
  <Provider store={store}>
    <Router history={history}>
      <Route component={require('./containers/app')}>
        <Route path="/server/list"
          component={require('./containers/server-list')} />
        <Route path="/server/add"
          component={require('./containers/server-add')} />
      </Route>
    </Router>
  </Provider>
;
