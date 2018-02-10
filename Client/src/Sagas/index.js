import { all } from "redux-saga/effects";

import watchNavReloadSaga, { navLoadingSaga } from "./navSagas";

import watchClearSaga from "./clearSagas";

import serverEventSaga from "./serverEventSaga";

function* rootSaga() {
  yield all([
    watchNavReloadSaga(),
    watchClearSaga(),
    serverEventSaga(),
    //run this saga to kick off loading nav
    navLoadingSaga()
  ]);
}

export default rootSaga;
