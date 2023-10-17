export default interface OrderResponse {
  name: string,
  order: OrderDetails,
  success: boolean
}

export interface OrderDetails {
  number: number
}