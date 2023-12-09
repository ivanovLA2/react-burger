import type {CombinedState, Middleware, MiddlewareAPI} from 'redux';

import FeedOrder from "../../utils/feed-order";
import {RootState} from "../../index";
import BurgerConstructorState from "../../utils/burger-constructor-state";
import AuthState from "../../utils/auth-state";
import {AppDispatch, TWSStoreActions} from "../types";

export const socketMiddleware = (wsUrl: string, wsActions: TWSStoreActions): Middleware<CombinedState<{
  burgerConstructor: BurgerConstructorState;
  order: never;
  auth: AuthState;
  feed: unknown;
}>> => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: any) => {

      const {dispatch} = store;
      const {type, payload} = action;
      const {wsInit, onOpen, onClose, onError, onMessage} = wsActions;
      if (type === wsInit) {
        if (payload !== '') {

          socket = new WebSocket(`${wsUrl}${payload}`);

        } else {
          const token = localStorage.getItem('accessToken');
          if (token) {
            const valid = token.replace('Bearer ', '');
            socket = new WebSocket(`${wsUrl}?token=${valid}`);
          }
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
  }) as Middleware<CombinedState<BurgerConstructorState>>;
};