import { createStore, applyMiddleware } from "redux";
import {routerMiddleware} from "connected-react-router"
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "../reducers";
import history from "./history";

export default function configureStore(initialState = {}) {
  return createStore(rootReducer(history), initialState, applyMiddleware(routerMiddleware(history),thunk, logger));
}