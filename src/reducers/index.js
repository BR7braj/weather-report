import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import  {locationReducer} from  "./locationReducer";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    weather : locationReducer
    //add other reducers
  });

export default rootReducer;
