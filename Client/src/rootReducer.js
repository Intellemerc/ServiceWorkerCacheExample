import { combineReducers } from "redux";

const nav = (state = { loading: true }, action) => {
  if (action.type === "nav/loading") {
    return {
      ...state,
      loading: true
    };
  }
  //nav finished loading populate data
  if (action.type === "nav/load") {
    return {
      ...state,
      loading: false,
      data: action.data
    };
  }
  return state;
};
const rootApp = combineReducers({
  nav
});

export default rootApp;
