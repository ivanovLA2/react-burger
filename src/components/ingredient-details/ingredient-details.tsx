import React from "react";
import BurgerIngredientModel from "../../utils/burger-ingredient-model";
import styles from "./ingredient-details.module.css"

type Props = { ingredient: BurgerIngredientModel; };
type IngredientPropertyProps = { name: String; value: number };
export default function IngredientDetails(props: Props) {
  const {ingredient} = props
  const IngredientProperty = (props: IngredientPropertyProps) => {
    return (<div>
      <p className="text text_type_main-small text_color_inactive">
        {props.name}
      </p>
      <p className="text text_type_digits-default text_color_inactive">
        {props.value}
      </p>
    </div>)

  }
  return (
      <div className={styles.ingredientDetails}>
        <img src={ingredient.image_large} alt={ingredient.name}/>
        <p className="text text_type_main-medium pt-4">
          {ingredient.name}
        </p>
        <div className={`${styles.ingredientProperties} pb-15 pt-8`}>
          <IngredientProperty name="Калории, ккал" value={ingredient.calories}/>
          <IngredientProperty name="Белки, г" value={ingredient.proteins}/>
          <IngredientProperty name="Жиры, г" value={ingredient.fat}/>
          <IngredientProperty name="Углеводы, г" value={ingredient.carbohydrates}/>
        </div>
      </div>
  )
}
