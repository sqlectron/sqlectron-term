import 'react';
import blessed from 'blessed';
import { render } from 'react-blessed';

import routes from './routes';
import history from './history';


const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  dockBorders: true,
  title: 'SQLectron',
});


screen.key(['escape'], () => {
  try {
    history.goBack();
  } catch (error) {
    process.exit(0);
  }
});


screen.key(['tab'], () => {
  screen.focusNext();
});


screen.key(['q'], () => {
  process.exit(0);
});


render(routes, screen);
