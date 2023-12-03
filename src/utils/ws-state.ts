import FeedOrder, {OrderInfo} from "./feed-order";

export default interface WsState {
  wsConnected: boolean;
  feed: FeedOrder | null;
  order: OrderInfo | null;
  orderRequest: boolean;
  orderFailed: boolean;
  error?: Event;
}