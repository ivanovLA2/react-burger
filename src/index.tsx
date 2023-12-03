import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {rootReducer} from "./services/reducers";
import {configureStore} from "@reduxjs/toolkit";
import {initialConstructorState} from "./services/reducers/burger-consrtuctor";
import {BrowserRouter} from "react-router-dom";
import {socketMiddleware} from "./services/middleware";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START, WS_CONNECTION_START_SECURE,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE
} from "./services/actions/ws-action-types";
import WsActions from "./utils/ws-actions";
import {WS_FEED} from "./services/api";

const wsActions: WsActions = {
  wsInit: WS_CONNECTION_START,
  wsSecureInit: WS_CONNECTION_START_SECURE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};


const store = configureStore({
  reducer: rootReducer,
  preloadedState: {burgerConstructor: initialConstructorState},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(socketMiddleware(WS_FEED, wsActions))
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
