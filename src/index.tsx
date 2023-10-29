import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {rootReducer} from "./services/reducers";
import {configureStore} from "@reduxjs/toolkit";
import {initialConstructorState} from "./services/reducers/burger-consrtuctor";
import {BrowserRouter} from "react-router-dom";

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {burgerConstructor: initialConstructorState},
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
