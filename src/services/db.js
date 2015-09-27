import fs from 'fs';
import tunnelssh from 'tunnel-ssh';
import { wait, getPort } from '../utils';


export async function listTables (server, databaseName, eventHandler) {
  if (server.ssh) {
    let tunnel;
    try {
      tunnel = await connectTunnel(server, eventHandler);
    } catch (error) {
      eventHandler.onTunnelError(error);
      throw error;
    }
    const tunnelAddr = tunnel.address();
  }
  eventHandler.onServerConnecting();
  await wait(1000);
  eventHandler.onServerConnected();
  await wait(1000);
  eventHandler.onListTablesRequest();
  await wait(1000);

  return ['a', 'b', 'c'];
}


let currentTunnel = {};


function connectTunnel (serverDefinition, eventHandler) {
  // TODO: modify to support only one call at time
  return new Promise(async (resolve, reject) => {
    const key = [
      serverDefinition.host,
      serverDefinition.port,
      serverDefinition.ssh.host,
      serverDefinition.ssh.port,
    ].join(':');

    if (currentTunnel.key === key) return resolve(tunnel.server);
    if (currentTunnel.server) await closeServer(currentTunnel.server);

    currentTunnel.key = key;

    eventHandler.onTunnelConnecting();

    const localPort = await getPort();
    const config = {
      localPort,
      username: serverDefinition.ssh.user,
      port: serverDefinition.ssh.port,
      host: serverDefinition.ssh.host,
      dstPort: serverDefinition.port,
      dstHost: serverDefinition.host,
    };
    if (serverDefinition.ssh.password) {
      config.password = serverDefinition.ssh.password;
    }
    if (serverDefinition.ssh.privateKey) {
      // TODO load content in async mode
      config.privateKey = fs.readFileSync(serverDefinition.ssh.privateKey);
    }

    currentTunnel.server = tunnelssh(config);

    currentTunnel.server.on('listening', () => {
      eventHandler.onTunnelConnected(currentTunnel.server);
      resolve(currentTunnel.server);
    });

    currentTunnel.server.on('error', error => {
      currentTunnel = {};
      reject(error);
    });

    currentTunnel.server.on('close', () => {
      currentTunnel = {};
    });
  });
}


function closeServer (server) {
  return new Promise(resolve => {
    server.close(() => resolve());
  });
}
