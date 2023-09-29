import React from 'react';
import styles from './burger-ingredient.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientModel from "../../utils/burger-ingredient-model";

function BurgerIngredient({ingredient, count}: { ingredient: BurgerIngredientModel, count: number }) {

  return (
      <div className={styles.ingredient}>
        <Counter count={count} size="default" extraClass="m-1"/>
        <img src={ingredient.image} className="pl-4" alt={ingredient.name}/>

        <div className={styles.price}>
          <p className="text text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon type="primary"/>
        </div>

        <p className="text text_type_main-default pt-1">
          {ingredient.name}
        </p>

      </div>
  );
}

export default BurgerIngredient;
