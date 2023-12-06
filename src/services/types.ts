import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootState} from "..";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE
} from "./actions/ws-action-types";
import FeedOrder, {OrderInfo} from "../utils/feed-order";
import {ORDER_INFO_FAILED, ORDER_INFO_REQUEST, ORDER_INFO_SUCCESS} from "./actions/order-action-types";
import {
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  TOKEN_FAILED,
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS
} from "./actions/auth";
import {GET_ITEMS_FAILED, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, SET_SELECTED_ITEM} from "./actions/burger-consrtuctor";
import BurgerIngredientModel from "../utils/burger-ingredient-model";
import {
  ADD_INGREDIENT,
  CHANGE_POSITION,
  CREATE_ORDER_FAILED,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  REMOVE_INGREDIENT
} from "./actions/order";

export interface ICreateOrderRequestAction {
  readonly type: typeof CREATE_ORDER_REQUEST;
}

export interface ICreateOrderSuccessAction {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  readonly orderNumber: number;
}

export interface ICreateOrderFailedAction {
  readonly type: typeof CREATE_ORDER_FAILED;
}

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly item: BurgerIngredientModel;
}

export interface IChangePositionAction {
  readonly type: typeof CHANGE_POSITION;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export interface IRemoveIngredientAction {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly id: string;
}

export type TCreateOrderActions =
    | ICreateOrderRequestAction
    | ICreateOrderSuccessAction
    | IAddIngredientAction
    | IChangePositionAction
    | IRemoveIngredientAction
    | ICreateOrderFailedAction;

export interface IGetItemsRequestAction {
  readonly type: typeof GET_ITEMS_REQUEST;
}

export interface IGetItemsSuccessAction {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly items: BurgerIngredientModel[];
}

export interface IGetItemsFailedAction {
  readonly type: typeof GET_ITEMS_FAILED;
}

export interface ISetSelectedItemAction {
  readonly type: typeof SET_SELECTED_ITEM;
  readonly item: BurgerIngredientModel;
}

export type TGetItemsActions =
    | IGetItemsRequestAction
    | IGetItemsSuccessAction
    | ISetSelectedItemAction
    | IGetItemsFailedAction;

export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly name: string;
  readonly email: string;
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}

export type TGetUserActions =
    | IGetUserRequestAction
    | IGetUserSuccessAction
    | IGetUserFailedAction;

export interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly name: string;
  readonly email: string;
}

export interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
}

export type TUpdateUserActions =
    | IUpdateUserRequestAction
    | IUpdateUserSuccessAction
    | IUpdateUserFailedAction;

export interface IRegisterRequestAction {
  readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface IRegisterFailedAction {
  readonly type: typeof REGISTER_FAILED;
}

export type TRegisterActions =
    | IRegisterRequestAction
    | IRegisterSuccessAction
    | IRegisterFailedAction;


export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
}

export type TLogoutActions =
    | ILogoutRequestAction
    | ILogoutSuccessAction
    | ILogoutFailedAction;


export interface IForgotPasswordRequestAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export type TForgotPasswordActions =
    | IForgotPasswordRequestAction
    | IForgotPasswordSuccessAction
    | IForgotPasswordFailedAction;

export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export type TResetPasswordActions =
    | IResetPasswordRequestAction
    | IResetPasswordSuccessAction
    | IResetPasswordFailedAction;


export interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
}

export type TLoginActions =
    | ILoginRequestAction
    | ILoginSuccessAction
    | ILoginFailedAction;

export interface ITokenRequestAction {
  readonly type: typeof TOKEN_REQUEST;
}

export interface ITokenSuccessAction {
  readonly type: typeof TOKEN_SUCCESS;
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface ITokenFailedAction {
  readonly type: typeof TOKEN_FAILED;
}

export type TTokenActions =
    | ITokenRequestAction
    | ITokenSuccessAction
    | ITokenFailedAction;


export interface IOrderInfoRequestAction {
  readonly type: typeof ORDER_INFO_REQUEST;
}

export interface IOrderInfoSuccessAction {
  readonly type: typeof ORDER_INFO_SUCCESS;
  readonly order: OrderInfo;
}

export interface IOrderInfoFailedAction {
  readonly type: typeof ORDER_INFO_FAILED;
}

export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload?: string;
}

export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: FeedOrder;
}

export type TOrderInfoActions =
    | IOrderInfoRequestAction
    | IOrderInfoSuccessAction
    | IOrderInfoFailedAction;

export type TWSActions =
    | IWSConnectionStart
    | IWSConnectionSuccessAction
    | IWSConnectionErrorAction
    | IWSConnectionClosedAction
    | IWSGetMessageAction
    | TOrderInfoActions;

export type TAuthActions =
    | TLoginActions
    | TRegisterActions
    | TLogoutActions
    | TTokenActions
    | TForgotPasswordActions
    | TResetPasswordActions
    | TGetUserActions
    | TUpdateUserActions;

export type TOrderActions =
    | TCreateOrderActions
    ;

export type BurgerConstructorActions =
    | TGetItemsActions;

type AppActions = TWSActions
    | TOrderActions
    | TAuthActions
    | TResetPasswordActions
    | BurgerConstructorActions;

export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;

export type TWSStoreActions = {
  wsInit: typeof WS_CONNECTION_START,
  onOpen: typeof WS_CONNECTION_SUCCESS,
  onClose: typeof WS_CONNECTION_CLOSED,
  onError: typeof WS_CONNECTION_ERROR,
  onMessage: typeof WS_GET_MESSAGE,
};
