import React from 'react';
import blessed from 'blessed';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { render } from 'react-blessed';

import createHistory from './history/create-term-history';
import configureStore from './store';

import App from './containers/app';


const history = createHistory('/server/list');
const store = configureStore();


const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'SQLectron',
});


screen.key(['q', 'C-c'], () => {
  process.exit(0);
});


render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={App}>
        <Route path="/server/list"
          component={require('./containers/server-list')} />
        <Route path="/server/add"
          component={require('./containers/server-add')} />
      </Route>
    </Router>
  </Provider>
  ,
  screen
);
