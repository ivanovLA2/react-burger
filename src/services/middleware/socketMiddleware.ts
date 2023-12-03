import type {CombinedState, Middleware, MiddlewareAPI} from 'redux';

import FeedOrder from "../../utils/feed-order";
import WsActions from "../../utils/ws-actions";
import {AppDispatch, RootState} from "../../index";
import BurgerConstructorState from "../../utils/burger-constructor-state";
import AuthState from "../../utils/auth-state";

export const socketMiddleware = (wsUrl: string, wsActions: WsActions): Middleware<CombinedState<{
  burgerConstructor: BurgerConstructorState;
  order: never;
  auth: AuthState;
  feed: unknown;
}>> => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: any) => {
      const {dispatch} = store;
      const {type} = action;
      const {wsInit, onOpen, onClose, onError, onMessage} = wsActions;
      if (type === wsInit) {
        if (localStorage.getItem('accessToken')) {
          socket = new WebSocket(`${wsUrl}?token=${localStorage.getItem('accessToken')}`);
        } else {
          socket = new WebSocket(`${wsUrl}`);
        }
      }
      if (type === onClose && socket) {
        socket.close();
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({type: onOpen, payload: event});
        };

        socket.onerror = event => {
          dispatch({type: onError, payload: event});
        };

        socket.onmessage = event => {
          const {data} = event;
          const parsedData: FeedOrder = JSON.parse(data);
          dispatch({type: onMessage, payload: parsedData});
        };

        socket.onclose = event => {
          dispatch({type: onClose, payload: event});
        };
      }

      next(action);
    };
  }) as Middleware<CombinedState<{
    burgerConstructor: BurgerConstructorState;
    order: never;
    auth: AuthState;
    feed: unknown;
  }>>;
};