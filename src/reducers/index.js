import { combineReducers } from "redux";
// import spider from "./spider";
import family from "./family";
import genus from "./genus";
import auth from "./auth";

const appReducer = combineReducers({ family, genus, auth });

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
