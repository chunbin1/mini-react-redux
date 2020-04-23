const logger = (createStore) => (reducer, initState, enhancer) => {
  const store = createStore(reducer, initState, enhancer);
  const dispatch = (action) => {
    console.log(`action=${JSON.stringify(action)}`);
    store.dispatch(action);
    const state = store.getState();
    console.log(`state=${JSON.stringify(state)}`);
  };
  return {
    ...store,
    dispatch,
  };
};

export default logger;
