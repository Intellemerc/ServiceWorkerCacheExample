import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import reducer from "./rootReducer";
import sagaRoot from "./rootSaga";

const sagaMiddleware = createSagaMiddleware(/* {sagaMonitor} */);

const devTools = window.devToolsExtension
  ? compose(applyMiddleware(sagaMiddleware), window.devToolsExtension())
  : applyMiddleware(sagaMiddleware);

export const store = createStore(
  combineReducers({
    app: reducer
  }),
  devTools
);

export const runSaga = () => {
  sagaMiddleware.run(sagaRoot);
};
