
export default interface FeedOrder {
  success: boolean,
  orders: Order[],
  total: number,
  totalToday: number

}

interface Order {
  ingredients: string[],
  _id: string,
  status: string,
  number: number,
  name: string,
  createdAt: Date,
  updatedAt: Date,
}