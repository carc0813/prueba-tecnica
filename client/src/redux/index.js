import { combineReducers } from "redux";
import userStoriesReducer from './reducer';

const rootReducer = combineReducers({
  userStories: userStoriesReducer,
});

export default rootReducer;
