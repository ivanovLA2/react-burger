import {combineReducers} from "redux";
import {burgerConstructorReducer} from "./burger-consrtuctor";
import {orderReducer} from "./order";
import {authReducer} from "./auth";
import {wsReducer} from "./wsReducer";

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  auth: authReducer,
  feed: wsReducer,
});
