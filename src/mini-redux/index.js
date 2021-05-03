// enhance可以增强一下dispatch
export const createStore = (reducer, initialState, enhancer) => {
  // 如果initialState为函数 且没有enhancer
  if (!enhancer && typeof initialState === "function") {
    enhancer = initialState;
    initialState = undefined;
  }

  // 把createStore增强
  if (enhancer && typeof enhancer === "function") {
    console.log(typeof enhancer(createStore));
    return enhancer(createStore)(reducer, initialState);
  }

  let store = initialState;
  let observers = []; // 观察者队列

  function getState() {
    return store;
  }
  function dispatch(action) {
    // 优化 加锁
    console.log("type", action.type);
    store = reducer(store, action);
    observers.forEach((listener) => listener());
    return action;
  }
  function subscribe(listener) {
    observers.push(listener);
    return function unsubscribe() {
      const index = observers.indexOf(listener);
      observers.splice(index, 1);
    };
  }
  // 初始化数据
  dispatch({ type: "@@INIT" });
  return { getState, dispatch, subscribe };
};

// 把多个reducer结合起来
// combineReducers({
//   todos,
//   counter
// })
export const combineReducers = (reducers) => {
  const finalReducers = {};
  const reducerKeys = Object.keys(reducers);

  // 收集所有的 reducer 函数
  reducerKeys.forEach((reducerKey) => {
    if (typeof reducers[reducerKey] === "function") {
      finalReducers[reducerKey] = reducers[reducerKey];
    }
  });

  const finalReducerKeys = Object.keys(finalReducers);

  return function combination(state = {}, action) {
    let hasChanged = false;
    let nextState = {};
    finalReducerKeys.forEach((key) => {
      const reducer = finalReducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);

      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    });
    return hasChanged ? nextState : state;
  };
};

const compose = (...funcs) => {
  if (!funcs) {
    return (args) => args;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((f1, f2) => (...args) => f1(f2(...args)));
};

export const applyMiddleware = (...middlewares) => {
  return (createStore) => (reducer, initState, enhancer) => {
    const store = createStore(reducer, initState, enhancer);
    let dispatch = () => {
      throw new Error(
        "Dispatching while constructing your middleware is not allowed. " +
          "Other middleware would not be applied to this dispatch."
      );
    };

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action),
    };
    let chain = middlewares.map((middleware) => middleware(middlewareAPI));
    // 修改dispatch
    dispatch = compose(...chain)(store.dispatch);
    return {
      ...store,
      dispatch,
    };
  };
};
