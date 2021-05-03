import { createStore, combineReducers,applyMiddleware } from "redux";
import { reducer, reducerTwo } from "../react-redux/reducer";
import logger from "../react-redux/middleware";

const combineReducer = combineReducers({
  add: reducer,
  multy: reducerTwo,
});
const store = createStore(combineReducer, applyMiddleware(logger)); //创建store

store.dispatch({ type: "plus" }); //执行加法操作,给count加1

export default store