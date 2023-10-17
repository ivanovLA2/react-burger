import OrderRequest from "../utils/order-request";

const API_ROOT = 'https://norma.nomoreparties.space/api';
const INGREDIENTS_API = '/ingredients'
const ORDERS_API = '/orders'

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