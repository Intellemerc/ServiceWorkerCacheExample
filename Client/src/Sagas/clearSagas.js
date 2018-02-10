import { put, call, takeLatest } from "redux-saga/effects";
import API from "./API";

//event to clear cache triggered from the server side
function* navClearServerCacheSaga() {
  //let rest of the app know I am clearing cache
  yield put({ type: "nav/clearingServerCache" });

  //call the api to call the even via service worker
  yield call(API.GET, "/api/serverClear");
}

//clear the cache triggered from the client side
export function* navClearCacheSaga() {
  yield put({ type: "nav/clearingCache" });

  //call into the service worker asking it to clear cache
  const result = yield call(window.send_message_to_sw, {
    action: "clearCache",
    cacheEntry: "api/nav"
  });

  //response from the service worker, just loging for now
  console.log(result);

  //put message into redux that cache clearing finished
  yield put({
    type: "nav/cacheCleared"
  });
}

//watch for events to clear
export default function* watchClearSaga() {
  yield takeLatest("nav/clearCache", navClearCacheSaga);
  yield takeLatest("nav/clearServerCache", navClearServerCacheSaga);
}
