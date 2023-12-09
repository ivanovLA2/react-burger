import {OrderInfo} from "./feed-order";

export default interface OrderInfoResponse {
  orders: OrderInfo[]
  success: boolean
}
