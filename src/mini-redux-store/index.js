import reducers from "../reducers/reducers-mini-redux";
import logger from "../middleware/logger";
import { createStore, applyMiddleware } from "../mini-redux";

const initState = {
  colorReducer: { yellow: 100, name: "Mini的store" },
  countReducer: {
    count: 100,
    name: "Mini的store",
  },
};
const store = createStore(reducers, initState, applyMiddleware(logger)); //创建store

store.dispatch({ type: "plus" }); //执行加法操作,给count加1
store.dispatch({
  type: "subtract",
});

export default store;
