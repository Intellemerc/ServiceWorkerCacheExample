import { call, takeLatest } from "redux-saga/effects";
import { delay } from "redux-saga";
import { navClearCacheSaga } from "./clearSagas";
import { navLoadingSaga } from "./navSagas";

export function* serverEventSaga(evt) {
  console.log("Server Event", evt);
  if (evt.data.action === "clearCache") {
    yield call(navClearCacheSaga);
    yield call(navLoadingSaga);
  } else if (evt.data.action === "reloadNav") {
    yield delay(1000);
    yield call(navClearCacheSaga);
    yield call(navLoadingSaga);
  } else {
    console.log("Missed Event", evt);
  }
}

export default function* watchServerEventSaga() {
  yield takeLatest("serverEvent", serverEventSaga);
}
