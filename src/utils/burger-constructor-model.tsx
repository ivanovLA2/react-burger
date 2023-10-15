import BurgerIngredientModel from "./burger-ingredient-model";

interface BurgerConstructorState {

    items: BurgerIngredientModel[],

    itemsRequest: boolean,
    itemsFailed: boolean,

    orderRequest: boolean,
    orderFailed: boolean,

    selectedItem: BurgerIngredientModel | null,

    orderItems: BurgerIngredientModel[],
    orderNumber: string | null
}

export default BurgerConstructorState
