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

const unsubscribe = store.subscribe(() => {
  console.log("subscribe发生了");
});
store.dispatch({ type: "plus" }); //执行加法操作,给count加1
unsubscribe();
store.dispatch({
  type: "subtract",
});

export default store;
