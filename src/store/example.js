import { reducer, reducerTwo } from "./reducer";
import logger from "../middleware/logger";
import { combineReducers, createStore, applyMiddleware } from "../mini-redux";

const combineReducer = combineReducers({
  add: reducer,
  multy: reducerTwo,
});
const store = createStore(combineReducer, applyMiddleware(logger)); //创建store

console.log(store.getState());
// store.subscribe(() => { console.log('组件1收到store的通知') })
// store.subscribe(() => { console.log('组件2收到store的通知') })
store.dispatch({ type: "plus" }); //执行加法操作,给count加1

console.log(store.getState()); //获取state

export default store