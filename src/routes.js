import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';

import history from './history';
import configureStore from './store';


const store = configureStore();


export default
  <Provider store={store}>
    <Router history={history}>
      <Route component={require('./containers/app')}>
        <Route path="server/list"
          component={require('./containers/server-list')} />
        <Route path="server/add"
          component={require('./containers/server-add')} />
        <Route path="server/:id/edit"
          component={require('./containers/server-edit')} />
        <Route path="server/:id/remove"
          component={require('./containers/server-remove')} />
        <Route path="server/:id/database/:database"
          component={require('./containers/database')}>
          <Route path="query"
            component={require('./containers/database-query')} />
        </Route>
      </Route>
    </Router>
  </Provider>
;
