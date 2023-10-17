import BurgerIngredientModel from "./burger-ingredient-model";

interface OrderState {

  orderNumber: string | null,

  orderRequest: boolean,
  orderFailed: boolean,
  orderItems: BurgerIngredientModel[],
  bun: BurgerIngredientModel | null,

}

export default OrderState
