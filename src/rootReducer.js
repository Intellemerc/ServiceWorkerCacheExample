import { combineReducers } from "redux";

const test = (state = {}, action) => {
  return state;
};
const reducers = {
  test
};
const rootApp = combineReducers(reducers);

export default rootApp;
