import createHistory from 'history/lib/createMemoryHistory';


export default function (options) {
  const history = createHistory(options);

  const prevListen = history.listen;
  history.listen = (listener) => {
    process.nextTick(() => history::prevListen(listener));
  };

  return history;
}
