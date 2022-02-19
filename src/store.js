import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import logger from "redux-logger";

var middlewares = null;

// middlewares = applyMiddleware(thunk, logger);
middlewares = applyMiddleware(thunk);
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   rootReducer,
//   /* preloadedState, */ composeEnhancers(middlewares)
// );

const store = createStore(rootReducer, middlewares);

export default store;
