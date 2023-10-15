import {createBurgerOrder} from "../api";
import OrderResponse from "../../utils/order-response";

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';

export function createOrder(ingredients: string[]) {
  return function (dispatch: (arg0: { type: string; orderNumber?: number; }) => void) {
    dispatch({
      type: CREATE_ORDER_REQUEST
    });

    createBurgerOrder({
      ingredients: ingredients
    }).then(res => {
      if (res && res.ok) {
        let result = res.json() as Promise<OrderResponse>;
        result.then(r => {
          dispatch({
            type: CREATE_ORDER_SUCCESS,
            orderNumber: r.order.number
          });
        })

      } else {
        dispatch({
          type: CREATE_ORDER_ERROR
        });
      }
    }).catch(reason => {
      console.error("Error in creating order", reason)
      dispatch({
        type: CREATE_ORDER_ERROR
      });
    });
  };
}