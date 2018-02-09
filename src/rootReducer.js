import { combineReducers } from "redux";

const nav = (state = {}, action) => {
  if (action.type === "nav/load") {
    return action.data;
  }
  return state;
};
const reducers = {
  nav
};
const rootApp = combineReducers(reducers);

export default rootApp;
