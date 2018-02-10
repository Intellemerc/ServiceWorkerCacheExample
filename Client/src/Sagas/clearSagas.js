import { put, call, takeLatest } from "redux-saga/effects";
import API from "./API";

//event to clear cache triggered from the server side
function* navClearServerCacheSaga() {
  const action = { type: "nav/clearingServerCache" };
  yield put(action);

  //call the api to call the even via service worker
  yield call(API.GET, "/api/serverClear");
}

//clear the cache triggered from the client side
export function* navClearCacheSaga() {
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

//watch for events to clear
export default function* watchClearSaga() {
  yield takeLatest("nav/clearCache", navClearCacheSaga);
  yield takeLatest("nav/clearServerCache", navClearServerCacheSaga);
}
