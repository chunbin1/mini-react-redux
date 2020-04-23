import { reducer, reducerTwo } from "./reducer";
import logger from "./middleware";

export const createStore = (reducer, initialState, enhancer) => {
  debugger;
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
  }
  function subscribe(listener) {
    observers.push(listener);
  }
  // 初始化数据
  dispatch({ type: "@@INIT" });
  return { getState, dispatch, subscribe };
};

// 使用
// combineReducers({
//   todos,
//   counter
// })
const combineReducers = (reducers) => {
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

const combineReducer = combineReducers({
  add: reducer,
  multy: reducerTwo,
});

const store = createStore(combineReducer, logger); //创建store
console.log(store.getState());

// store.subscribe(() => { console.log('组件1收到store的通知') })
// store.subscribe(() => { console.log('组件2收到store的通知') })
store.dispatch({ type: "plus" }); //执行加法操作,给count加1
console.log(store.getState()); //获取state
