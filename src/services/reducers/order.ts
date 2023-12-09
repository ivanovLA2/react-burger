import {
  ADD_INGREDIENT,
  CHANGE_POSITION,
  CREATE_ORDER_FAILED,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  REMOVE_INGREDIENT
} from "../actions/order";
import OrderState from "../../utils/order-state";
import {TOrderActions} from "../types";

export const initialOrderState: OrderState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
  orderItems: [],
  bun: null
}

export const orderReducer = (state = initialOrderState, action: TOrderActions) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderNumber: null
      };
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderNumber: action.orderNumber,
        orderRequest: false,
        orderItems: [],
        bun: null
      };
    }
    case CREATE_ORDER_FAILED: {
      return {...state, orderFailed: true, orderRequest: false};
    }
    case ADD_INGREDIENT: {
      if (action.item.type === "bun") {
        return {
          ...state, bun: action.item,
        }
      } else {
        return {
          ...state, orderItems: [
            ...state.orderItems,
            action.item
          ],
        }
      }
    }

    case REMOVE_INGREDIENT: {

      const items = [...state.orderItems];

      let index = items.findIndex(value => value._id === action.id);
      if (index >= 0) {
        items.splice(index, 1)
      }
      return {
        ...state, orderItems: items
      }
    }

    case CHANGE_POSITION: {
      const items = [...state.orderItems];
      let burgerIngredientModels = items.splice(action.dragIndex, 1);
      items.splice(action.hoverIndex, 0, ...burgerIngredientModels)
      return {
        ...state, orderItems: items
      }
    }

    default: {
      return state;
    }
  }
}
