import FeedOrder, {OrderInfo} from "../../utils/feed-order";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE
} from "../actions/ws-action-types";
import WsState from "../../utils/ws-state";
import {ORDER_INFO_FAILED, ORDER_INFO_REQUEST, ORDER_INFO_SUCCESS} from "../actions/order-action-types";

const initialState: WsState = {
  wsConnected: false,
  feed: null,
  order: null,
  orderFailed: false,
  orderRequest: false
};

export const wsReducer = (state = initialState, action: { type: string, payload: FeedOrder, order?: OrderInfo }) => {
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

    case ORDER_INFO_REQUEST:
      return {
        ...state,
        orderRequest: true,
        orderFailed: false
      };
    case ORDER_INFO_SUCCESS:
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        order: action.order
      }
    case ORDER_INFO_FAILED:
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      }

    default:
      return state;
  }
};