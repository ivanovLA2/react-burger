import {getOrderInfo} from "../api";
import OrderInfoResponse from "../../utils/order-info-response";
import {AppDispatch, AppThunkAction} from "../types";

export const ORDER_INFO_REQUEST: 'ORDER_INFO_REQUEST' = 'ORDER_INFO_REQUEST';
export const ORDER_INFO_SUCCESS: 'ORDER_INFO_SUCCESS' = 'ORDER_INFO_SUCCESS';
export const ORDER_INFO_FAILED: 'ORDER_INFO_FAILED' = 'ORDER_INFO_FAILED';


export const orderInfo = (id: string): AppThunkAction => (dispatch: AppDispatch) => {
  dispatch({
    type: ORDER_INFO_REQUEST
  });

  getOrderInfo(id).then(res => {
    if (res && res.ok) {
      let result = res.json() as Promise<OrderInfoResponse>;
      result.then(r => {
        dispatch({
          type: ORDER_INFO_SUCCESS,
          order: r.orders[0]
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
