import {createBurgerOrder} from "../api";
import OrderResponse from "../../utils/order-response";
import {AppDispatch, AppThunkAction} from "../types";
import checkResponse from "../../utils/check-response";

export const CREATE_ORDER_REQUEST: 'CREATE_ORDER_REQUEST' = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS' = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED: 'CREATE_ORDER_FAILED' = 'CREATE_ORDER_FAILED';

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const CHANGE_POSITION: 'CHANGE_POSITION' = 'CHANGE_POSITION';

export const REMOVE_INGREDIENT: 'REMOVE_INGREDIENT' = 'REMOVE_INGREDIENT'

export const createOrder = (ingredients: string[]): AppThunkAction => (dispatch: AppDispatch) => {
  dispatch({
    type: CREATE_ORDER_REQUEST
  });

  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    createBurgerOrder({
          ingredients: ingredients,
          token: accessToken
        }
    ).then(checkResponse).then(res => {
      let result = res as OrderResponse;
      if (result.success) {
        dispatch({
          type: CREATE_ORDER_SUCCESS,
          orderNumber: result.order.number
        });
      } else {
        dispatch({
          type: CREATE_ORDER_FAILED
        });
      }
    }).catch(reason => {
      console.error("Error in creating order", reason)
      dispatch({
        type: CREATE_ORDER_FAILED
      });
    });
  }

}
