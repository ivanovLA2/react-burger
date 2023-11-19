import BurgerIngredientModel from "./burger-ingredient-model";

interface BurgerConstructorState {

  items: BurgerIngredientModel[],

  itemsRequest: boolean,
  itemsFailed: boolean,

  selectedItem: BurgerIngredientModel | null,
}

export default BurgerConstructorState
