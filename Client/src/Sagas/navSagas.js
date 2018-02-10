import { put, call, takeLatest } from "redux-saga/effects";
import API from "./API";

export function* navLoadingSaga() {
  yield put({ type: "nav/loading" });

  var result = yield call(API.GET, "/api/nav");

  yield put({
    type: "nav/load",
    data: result
  });
}

export default function* watchNavReloadSaga() {
  yield takeLatest("nav/reload", navLoadingSaga);
}
