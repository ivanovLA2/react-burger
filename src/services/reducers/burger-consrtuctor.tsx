import {
  ADD_INGREDIENT,
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  SET_SELECTED_ITEM
} from "../actions/burger-consrtuctor";
import BurgerConstructorState from '../../utils/burger-constructor-model'

export const initialState: BurgerConstructorState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
  orderRequest: false,
  orderFailed: false,
  selectedItem: null,
  orderItems: [],
  orderNumber: null

}

export const burgerConstructorReducer = (state = initialState, action: { type: any; items: any; item: any }) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {...state, itemsFailed: false, items: action.items, itemsRequest: false};
    }
    case GET_ITEMS_FAILED: {
      return {...state, itemsFailed: true, itemsRequest: false};
    }
    case SET_SELECTED_ITEM: {
      return {...state, selectedItem: action.item};
    }
    case ADD_INGREDIENT: {
      return {...state, orderItems: [
          ...state.orderItems,
          action.item
          ]
        }
    }
    default: {
      return state;
    }
  }
}