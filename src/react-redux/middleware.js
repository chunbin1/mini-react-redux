// const logger = (createStore) => (reducer, initState, enhancer) => {
//   const store = createStore(reducer, initState, enhancer);
//   const dispatch = (action) => {
//     console.log(`action=${JSON.stringify(action)}`);
//     store.dispatch(action);
//     const state = store.getState();
//     console.log(`state=${JSON.stringify(state)}`);
//   };
//   return {
//     ...store,
//     dispatch,
//   };
// };

function logger({ getState }) {
  return function (dispatch) {
    return function (action) {
      console.log("dispatch 前：", getState());
      var returnValue = dispatch(action);
      console.log("dispatch 后：", getState(), "\n");
      return returnValue;
    };
  };
}

export default logger;
