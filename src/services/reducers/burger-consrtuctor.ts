import {GET_ITEMS_FAILED, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, SET_SELECTED_ITEM} from "../actions/burger-consrtuctor";
import BurgerConstructorState from '../../utils/burger-constructor-state'
import BurgerIngredientModel from "../../utils/burger-ingredient-model";

export const initialConstructorState: BurgerConstructorState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
  selectedItem: null
}

export const burgerConstructorReducer = (state = initialConstructorState, action: {
  type: string;
  items: BurgerIngredientModel[];
  item: BurgerIngredientModel
}) => {
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
    default: {
      return state;
    }
  }
}
