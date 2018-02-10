import { call, takeLatest } from "redux-saga/effects";
import { navClearCacheSaga } from "./clearSagas";
import { navLoadingSaga } from "./navSagas";

//listen for any server events that are dispatched
export function* serverEventSaga(evt) {
  console.log("Server Event", evt);

  //server sent a clear cache event
  if (evt.data.action === "clearCache") {
    //call exist clear saga
    yield call(navClearCacheSaga);
    //call existing reload nav saga
    yield call(navLoadingSaga);
  } else {
    //if we get any events we don't reconize
    console.log("Missed Event", evt);
  }
}

export default function* watchServerEventSaga() {
  yield takeLatest("serverEvent", serverEventSaga);
}
