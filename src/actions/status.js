export const SET_STATUS = 'SET_STATUS';
export const CLEAR_STATUS = 'CLEAR_STATUS';


export function setStatus (status) {
  return { type: SET_STATUS, status };
}


export function clearStatus () {
  return { type: CLEAR_STATUS };
}
