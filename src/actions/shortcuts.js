export const ADD_SHORTCUTS = 'ADD_SHORTCUTS';
export const REMOVE_SHORTCUTS = 'REMOVE_SHORTCUTS';


export function addShortcuts (shortcuts) {
  return { type: ADD_SHORTCUTS, shortcuts };
}


export function removeShortcuts (shortcuts) {
  return { type: REMOVE_SHORTCUTS, shortcuts };
}
