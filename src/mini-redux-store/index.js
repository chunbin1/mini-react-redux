import reducers from "../reducers/reducers-mini-redux";
import logger from "../middleware/logger";
import { createStore, applyMiddleware } from "../mini-redux";

const store = createStore(reducers, applyMiddleware(logger)); //创建store

store.dispatch({ type: "plus" }); //执行加法操作,给count加1

export default store;
