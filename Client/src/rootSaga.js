import { put, all, call, takeLatest } from "redux-saga/effects";
import API from "./API";
//import { Action } from "redux";

function* watchNavReloadSaga() {
  yield takeLatest("nav/reload", navLoadingSaga);
  yield takeLatest("nav/clearCache", navClearCacheSaga);
}

function* navLoadingSaga() {
  const action = { type: "nav/loading" };
  yield put(action);

  var result = yield call(API.GET, "/api/nav");

  yield put({
    type: "nav/load",
    data: result
  });
}

function* navClearCacheSaga() {
  const action = { type: "nav/clearingCache" };
  yield put(action);

  const result = yield call(window.send_message_to_sw, {
    action: "clearCache",
    cacheEntry: "api/nav"
  });

  console.log(result);

  yield put({
    type: "nav/cacheCleared"
  });
}

function* rootSaga() {
  yield all([navLoadingSaga(), watchNavReloadSaga()]);
}

export default rootSaga;
