import {getProductData} from "../api";
import IngredientsResponse from "../../utils/ingredients-response";
import {AppDispatch, AppThunkAction} from "../types";
import checkResponse from "../../utils/check-response";

export const GET_ITEMS_REQUEST: 'GET_ITEMS_REQUEST' = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS: 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED: 'GET_ITEMS_FAILED' = 'GET_ITEMS_FAILED';
export const SET_SELECTED_ITEM: 'SET_SELECTED_ITEM' = 'SET_SELECTED_ITEM';

export const getItems = (): AppThunkAction => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_ITEMS_REQUEST
  });
  getProductData().then(checkResponse).then(res => {
    let result = res as IngredientsResponse;
    dispatch({
      type: GET_ITEMS_SUCCESS,
      items: result.data
    });
  }).catch(reason => {
    console.error("Error in getting data", reason)
    dispatch({
      type: GET_ITEMS_FAILED
    });
  });
}
