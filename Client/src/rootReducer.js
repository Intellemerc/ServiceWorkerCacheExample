import { combineReducers } from "redux";

const nav = (state = { loading: true }, action) => {
  if (action.type === "nav/loading") {
    return {
      ...state,
      loading: true
    };
  }
  if (action.type === "nav/load") {
    return {
      ...state,
      loading: false,
      data: action.data
    };
  }
  return state;
};
const reducers = {
  nav
};
const rootApp = combineReducers(reducers);

export default rootApp;
