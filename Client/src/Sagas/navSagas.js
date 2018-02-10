import { put, call, takeLatest } from "redux-saga/effects";
import API from "./API";

//load the nav from the server
export function* navLoadingSaga() {
  //let the UI know we are updating
  yield put({ type: "nav/loading" });

  //get nav from the server
  var result = yield call(API.GET, "/api/nav");

  //let any interested components know of change
  yield put({
    type: "nav/load",
    data: result
  });
}

//listen for anyone wanting to update the nav
export default function* watchNavReloadSaga() {
  yield takeLatest("nav/reload", navLoadingSaga);
}
