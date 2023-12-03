import {getOrderInfo} from "../api";
import {OrderInfo} from "../../utils/feed-order";

export const ORDER_INFO_REQUEST: 'ORDER_INFO_REQUEST' = 'ORDER_INFO_REQUEST';
export const ORDER_INFO_SUCCESS: 'ORDER_INFO_SUCCESS' = 'ORDER_INFO_SUCCESS';
export const ORDER_INFO_FAILED: 'ORDER_INFO_FAILED' = 'ORDER_INFO_FAILED';

export function orderInfo(id: string) {
  return function (dispatch: (arg0: { type: string; order?: OrderInfo; }) => void) {
    dispatch({
      type: ORDER_INFO_REQUEST
    });
    getOrderInfo(id).then(res => {
      if (res && res.ok) {
        let result = res.json() as Promise<OrderInfo>;
        result.then(r => {
          dispatch({
            type: ORDER_INFO_SUCCESS,
            order: r
          });
        })
      } else {
        dispatch({
          type: ORDER_INFO_FAILED
        });
      }
    }).catch(reason => {
      console.error("Error in getting data", reason)
      dispatch({
        type: ORDER_INFO_FAILED
      });
    });
  };
}
