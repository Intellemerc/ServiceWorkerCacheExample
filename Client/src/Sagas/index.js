import { all } from "redux-saga/effects";

import watchNavReloadSaga, { navLoadingSaga } from "./navSagas";

import watchClearSaga from "./clearSagas";

import serverEventSaga from "./serverEventSaga";

function* rootSaga() {
  yield all([
    watchNavReloadSaga(),
    watchClearSaga(),
    serverEventSaga(),
    navLoadingSaga()
  ]);
}

export default rootSaga;
