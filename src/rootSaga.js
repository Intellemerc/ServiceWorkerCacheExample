import { put, all, call } from "redux-saga/effects";
import API from "./API";
//import { Action } from "redux";

function* navSaga() {
  const action = { type: "nav/loading" };
  yield put(action);

  var result = yield call(API.GET, "/nav.json");

  yield put({
    type: "nav/load",
    data: result
  });
}

// tslint:disable-next-line:no-any
function* rootSaga() {
  yield all([navSaga()]);
}

export default rootSaga;
