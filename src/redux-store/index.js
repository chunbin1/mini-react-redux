import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers/reducers-mini-redux";
import logger from "../middleware/logger";

const initState = {
  colorReducer: { yellow: 100, name: "原生store" },
  countReducer: {
    count: 100,
    name: "原生store",
  },
};

const store = createStore(reducers, initState, applyMiddleware(logger)); //创建store

store.dispatch({ type: "plus" }); //执行加法操作,给count加1
store.dispatch({
  type: "multy",
});

export default store;
