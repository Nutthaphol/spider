import { combineReducers } from "redux";
import details from "./details";
import spider from "./spider";

const appReducer = combineReducers({ details, spider });

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
