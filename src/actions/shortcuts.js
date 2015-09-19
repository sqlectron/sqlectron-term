export const SET_SHORTCUTS = 'SET_SHORTCUTS';
export const CLEAR_SHORTCUTS = 'CLEAR_SHORTCUTS';


export function setShortcuts (shortcuts) {
  return { type: SET_SHORTCUTS, shortcuts };
}


export function clearShortcuts () {
  return { type: CLEAR_SHORTCUTS };
}
