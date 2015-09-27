import { wait } from '../utils';


export async function listTables (server, databaseName, eventHandler) {
  eventHandler.onTunnelConnecting();
  await wait(1000);
  eventHandler.onTunnelConnected();
  eventHandler.onServerConnecting();
  await wait(1000);
  eventHandler.onServerConnected();
  await wait(1000);
  eventHandler.onListTablesRequest();
  await wait(1000);

  return ['a', 'b', 'c'];
}
