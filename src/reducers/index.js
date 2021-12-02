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
import image from "./image";
import paper from "./paper";

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
  image,
  paper,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
