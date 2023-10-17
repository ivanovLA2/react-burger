import {combineReducers} from "redux";
import {burgerConstructorReducer} from "./burger-consrtuctor";
import {orderReducer} from "./order";

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer
});