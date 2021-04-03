export const loadState = ():any => {
  try {
    const serializedState = localStorage.getItem('AYTDA');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
export const saveState = (state:any):any => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('AYTDA', serializedState);
  } catch (err) {
    //ignoring write erros
  }
};