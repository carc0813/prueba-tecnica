import { combineReducers } from "redux";

import rootReducer from "./reducer";

const reducers = combineReducers({
  reducer: rootReducer,

});

export default reducers;
