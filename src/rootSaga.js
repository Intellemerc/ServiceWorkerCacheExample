import { put } from "redux-saga/effects";
import { Action } from "redux";

function* testSaga() {
  const action = { type: "testtt" };
  yield put(action);
}

// tslint:disable-next-line:no-any
function* rootSaga() {
  yield [testSaga()];
}

export default rootSaga;
