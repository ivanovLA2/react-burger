import React, {useState} from 'react';
import styles from './burger-ingredient.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientModel from "../../utils/burger-ingredient-model";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

type Props = { ingredient: BurgerIngredientModel; count: number; };

function BurgerIngredient(props: Props) {

  const {ingredient, count} = props;

  const [isModalActive, setIsModalActive] = useState(false);

  const handleModalOpen = () => {
    setIsModalActive(true);
  };
  const handleModalClose = () => {
    setIsModalActive(false);
  };

  return (
      <div className={styles.ingredient} onClick={handleModalOpen}>
        <Counter count={count} size="default" extraClass="m-1"/>
        <img src={ingredient.image} className="pl-4" alt={ingredient.name}/>

        <div className={styles.price}>
          <p className="text text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon type="primary"/>
        </div>

        <p className="text text_type_main-default pt-1">
          {ingredient.name}
        </p>
        <div>
          {isModalActive && (
              <Modal onClose={handleModalClose} title={"Детали ингредиента"} isModalActive={isModalActive}>
                <IngredientDetails ingredient={ingredient}/>
              </Modal>
          )}
        </div>
      </div>
  );
}

export default BurgerIngredient;
