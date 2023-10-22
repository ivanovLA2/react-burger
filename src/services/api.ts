import OrderRequest from "../utils/order-request";
import RegisterRequest from "../utils/auth/register-request";
import LoginRequest from "../utils/auth/login-request";
import TokenRequest from "../utils/auth/token-request";
import UserRequest from "../utils/auth/user-request";

const API_ROOT = 'https://norma.nomoreparties.space/api';
const INGREDIENTS_API = '/ingredients'
const ORDERS_API = '/orders'
const AUTH_LOGIN_API = '/auth/login'
const AUTH_REGISTER_API = '/auth/register'
const AUTH_LOGOUT_API = '/auth/logout'
const AUTH_TOKEN_API = '/auth/token'
const AUTH_USER_API = '/auth/user'

export const getProductData = async () => {
  return await fetch(API_ROOT + INGREDIENTS_API);
};

export const createBurgerOrder = async (request: OrderRequest) => {
  return await fetch(API_ROOT + ORDERS_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(request)
  })
};

export const register = async (request: RegisterRequest) => {
  return await fetch(API_ROOT + AUTH_REGISTER_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(request)
  })
};

export const login = async (request: LoginRequest) => {
  return await fetch(API_ROOT + AUTH_LOGIN_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(request)
  })
};

export const logout = async (request: TokenRequest) => {
  return await fetch(API_ROOT + AUTH_LOGOUT_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(request)
  })
};

export const refresh = async (request: TokenRequest) => {
  return await fetch(API_ROOT + AUTH_TOKEN_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(request)
  })
};

export const getUser = async (request: UserRequest) => {
  return await fetch(API_ROOT + AUTH_USER_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(request)
  })
};
