import 'react';
import blessed from 'blessed';
import { render } from 'react-blessed';

import routes from './routes';


const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'SQLectron',
});


screen.key(['q', 'C-c'], () => {
  process.exit(0);
});


render(routes, screen);
