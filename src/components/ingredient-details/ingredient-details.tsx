import React, {useEffect, useState} from "react";
import styles from "./ingredient-details.module.css"
import {useParams} from "react-router-dom";
import {RootState} from "../../index";
import BurgerConstructorState from "../../utils/burger-constructor-state";
import {useSelector} from "react-redux";
import BurgerIngredientModel from "../../utils/burger-ingredient-model";

type IngredientPropertyProps = { name: String; value: number };

const getConstructorState = (state: RootState) => state.burgerConstructor as BurgerConstructorState
export default function IngredientDetails() {
  const {id} = useParams();
  const [ingredient, setIngredient] = useState<BurgerIngredientModel>()
  const {
    items,
  } = useSelector(getConstructorState);

  useEffect(() => {
    setIngredient(items.filter(ingredient => ingredient._id === id)[0]);
  }, [items]);

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
      <>
        {ingredient ? (<div className={styles.ingredientDetails}>
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
        </div>) : (<p className="text text_type_main-medium">Загрузка</p>)}
      </>

  )
}
