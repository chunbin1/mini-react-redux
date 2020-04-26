import { createStore, combineReducers } from "redux";
import { reducer, reducerTwo } from "../react-redux/reducer";
import logger from "../react-redux/middleware";

debugger
const combineReducer = combineReducers({
    add: reducer,
    multy: reducerTwo,
  });

const store = createStore(combineReducer,logger)
console.log(store.getState())
store.dispatch({ type: "plus" }); //执行加法操作,给count加1
