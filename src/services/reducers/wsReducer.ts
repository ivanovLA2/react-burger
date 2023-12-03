import FeedOrder from "../../utils/feed-order";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE
} from "../actions/wsActionTypes";
import WsState from "../../utils/ws-state";

const initialState: WsState = {
  wsConnected: false,
  feed: null,
};

export const wsReducer = (state = initialState, action: { type: string, payload: FeedOrder }) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        feed: action.payload
      };

    default:
      return state;
  }
};