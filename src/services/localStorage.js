const loadState = () => {
  try {
    const serializedState = localStorage.getItem('rejection-app');
    if (serializedState === null) {
      return undefined;
    }
    const state = JSON.parse(serializedState)
    return state;
  }
  catch (err) {
    return undefined;
  }
};

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('rejection-app', serializedState);
  }
  catch (err) {
    // Ignore Write Errors
  }
};

export { loadState, saveState }
