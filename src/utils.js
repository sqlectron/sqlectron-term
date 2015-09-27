import pf from 'portfinder';


export function homedir() {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}


export function wait (time) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time);
  });
}


export function getPort () {
  return new Promise((resolve, reject) => {
    pf.getPort((err, port) => {
      if (err) return reject(err);
      resolve(port);
    });
  });
}
