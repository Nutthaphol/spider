import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import logger from "redux-logger";

var middlewares = null;

middlewares = applyMiddleware(thunk, logger);

const store = createStore(rootReducer, middlewares);

export default store;
