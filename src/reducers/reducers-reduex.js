import { combineReducers } from "redux";
import { countReducer, colorReducer } from "./reducers";

const combineReducer = combineReducers({
  countReducer,
  colorReducer,
});

export default combineReducer;
