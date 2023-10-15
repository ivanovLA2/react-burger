import {GET_ITEMS_FAILED} from "../actions/burger-consrtuctor";
import BurgerConstructorState from '../../utils/burger-constructor-model'
import {CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS} from "../actions/order";
import {initialState} from "./burger-consrtuctor";

export const orderReducer = (state = initialState, action: { type: any; orderNumber: number; item: any }) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderNumber: null
      };
    }
    case CREATE_ORDER_SUCCESS: {
      return {...state, orderFailed: false, orderNumber: action.orderNumber, orderRequest: false, orderItems: []};
    }
    case GET_ITEMS_FAILED: {
      return {...state, orderFailed: true, orderRequest: false};
    }
    default: {
      return state;
    }
  }
}