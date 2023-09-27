import React from 'react';
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientModel from "../burger-ingredient/burger-ingredient-model";
import styles from './burger-constructor.module.css'

function BurgerConstructor({ingredients}: { ingredients: BurgerIngredientModel[] }) {
  return (
      <div className={styles.container}>
        <div className={`${styles.constructor} pt-25 pl-8 pr-8 custom-scroll`}>
          {ingredients.map((value, index) => {
                const type = () => {
                  if (index === 0) return "top"
                  else if (index === ingredients.length - 1) return "bottom"
                  else return undefined
                }
                return <ConstructorElement
                    type={type()}
                    text={value.name}
                    price={value.price}
                    thumbnail={value.image}
                />
              }
          )}
        </div>
        <div className={`${styles.order} pt-10 pb-10`}>
          <p className="text text_type_digits-medium pr-1"> {ingredients.reduce((sum, i) => sum + i.price, 0)}</p>
          <CurrencyIcon type="primary"/>
          <Button htmlType="button" type="primary" size="medium" extraClass="ml-10 mr-4">
            Оформить заказ
          </Button>
        </div>
      </div>
  );
}

export default BurgerConstructor;
