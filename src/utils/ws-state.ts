import FeedOrder from "./feed-order";

export default interface WsState {
  wsConnected: boolean;
  feed: FeedOrder | null;
  error?: Event;
}