import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import websocketHandler from "./websocketHandler";

import reducer from "./rootReducer";
import sagaRoot from "./Sagas";

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

// Make sure websockets are connected
websocketHandler(store);

export const runSaga = () => {
  sagaMiddleware.run(sagaRoot);
};
