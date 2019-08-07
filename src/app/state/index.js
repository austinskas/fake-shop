import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { apiMiddleware } from "redux-api-middleware";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const logger = ({ getState, dispatch }) => next => action => {
  console.log(action.type);
  const prevState = getState();
  next(action);
  const nextState = getState();
};

//process.env.NODE_ENV

const middlewares = [logger, thunk, apiMiddleware];
const composedMiddlewares =
  process.env.NODE_ENV === "production"
    ? applyMiddleware(...middlewares)
    : composeWithDevTools(applyMiddleware(...middlewares));

const store = createStore(reducers, composedMiddlewares);

export default store;
