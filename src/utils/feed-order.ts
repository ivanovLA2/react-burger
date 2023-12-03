
export default interface FeedOrder {
  success: boolean,
  orders: OrderInfo[],
  total: number,
  totalToday: number

}

export interface OrderInfo {
  ingredients: string[],
  _id: string,
  status: string,
  number: number,
  name: string,
  createdAt: Date,
  updatedAt: Date,
}