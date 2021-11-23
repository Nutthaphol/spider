import { combineReducers } from "redux";
// import spider from "./spider";
import family from "./family";
import genus from "./genus";
import auth from "./auth";
import species from "./species";
import province from "./province";
import district from "./district";
import detail from "./detail";
import location from "./location";
import address from "./address";

const appReducer = combineReducers({
  family,
  genus,
  auth,
  species,
  province,
  district,
  detail,
  location,
  address,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
