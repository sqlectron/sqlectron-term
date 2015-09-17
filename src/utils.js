export function homedir() {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}


export function wait (time) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time);
  });
}
