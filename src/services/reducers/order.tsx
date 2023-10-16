import {GET_ITEMS_FAILED} from "../actions/burger-consrtuctor";
import {
  ADD_INGREDIENT,
  CHANGE_POSITION,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  REMOVE_INGREDIENT
} from "../actions/order";
import OrderState from "../../utils/order-state";

export const initialOrderState: OrderState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
  orderItems: []
}

export const orderReducer = (state = initialOrderState, action: { type: any; orderNumber: number; item: any; id: string; hoverIndex: number; dragIndex: number }) => {
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
    case ADD_INGREDIENT: {
      if (action.item.ingredient.type === "bun") {
        let items = state.orderItems.filter(value => value.type !== "bun");
        items.push(action.item.ingredient);
        return {
          ...state, orderItems: items
        }
      } else {
        return {
          ...state, orderItems: [
            ...state.orderItems,
            action.item.ingredient
          ]
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
      let burgerIngredientModels = items.splice(action.dragIndex + 1, 1);
      items.splice(action.hoverIndex + 1, 0, ...burgerIngredientModels)
      return {
        ...state, orderItems: items
      }
    }

    default: {
      return state;
    }
  }
}
