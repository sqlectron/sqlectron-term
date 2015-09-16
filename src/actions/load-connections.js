import fs from 'fs';
import path from 'path';

import {
  LOAD_CONNECTIONS_REQUEST,
  LOAD_CONNECTIONS_SUCCESS,
  LOAD_CONNECTIONS_FAILURE,
} from './types';


// function wait (time) {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(), time);
//   });
// }


export default () => {
  return async dispatch => {
    dispatch({ type: LOAD_CONNECTIONS_REQUEST });
    // await wait(2000);
    try {
      const data = await loadAndCreateDescriptor();
      dispatch({
        type: LOAD_CONNECTIONS_SUCCESS,
        connections: data.connections,
      });
    } catch (e) {
      dispatch({ type: LOAD_CONNECTIONS_FAILURE, error: e });
    }
  };
};


async function loadAndCreateDescriptor () {
  const filename = path.join(homedir(), '.sqlectron.json');
  if (!await fileExists(filename)) {
    await createFile(filename, { connections: [] });
  }
  return await readFile(filename);
}


function fileExists (filename) {
  return new Promise(resolve => {
    fs.stat(filename, (err, stats) => {
      if (err) return resolve(false);
      resolve(stats.isFile());
    });
  });
}


function createFile (filename, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, JSON.stringify(data, null, 2), err => {
      if (err) return reject(err);
      resolve();
    });
  });
}


function readFile (filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) return reject(err);
      resolve(JSON.parse(data));
    });
  });
}


function homedir() {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}
