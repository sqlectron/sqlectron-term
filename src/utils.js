import fs from 'fs';


export function homedir () {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}


export function wait (time) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time);
  });
}


export function readFile (filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}
