import {getProductData} from "../api";
import IngredientsResponse from "../../utils/ingredients-response";

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';
export const SET_SELECTED_ITEM = 'SET_SELECTED_ITEM';

export function getItems() {
  return function (dispatch: (arg0: { type: string; items?: any; }) => void) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    getProductData().then(res => {
      if (res && res.ok) {
        let result = res.json() as Promise<IngredientsResponse>;
        result.then(r => {
          dispatch({
            type: GET_ITEMS_SUCCESS,
            items: r.data
          });
        })
      } else {
        dispatch({
          type: GET_ITEMS_FAILED
        });
      }
    }).catch(reason => {
      console.error("Error in getting data", reason)
      dispatch({
        type: GET_ITEMS_FAILED
      });
    });
  };
}
