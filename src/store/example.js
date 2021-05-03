import { reducer, reducerTwo } from "./reducer";
import logger from "../middleware/logger";
import { combineReducers, createStore, applyMiddleware } from "../mini-redux";

const combineReducer = combineReducers({
  add: reducer,
  multy: reducerTwo,
});
const store = createStore(combineReducer, applyMiddleware(logger)); //创建store

store.dispatch({ type: "plus" }); //执行加法操作,给count加1

export default store