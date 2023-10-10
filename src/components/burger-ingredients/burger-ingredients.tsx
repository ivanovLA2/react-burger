import React, {useState} from 'react';
import styles from './burger-ingredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientModel from "../../utils/burger-ingredient-model";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

function BurgerIngredients({ingredients}: { ingredients: BurgerIngredientModel[] }) {
  const [current, setCurrent] = React.useState('one')
  const [selectedIngredient, setSelectedIngredient] = useState<BurgerIngredientModel | null>(null);

  const handleModalOpen = (ingredient: BurgerIngredientModel) => {
    setSelectedIngredient(ingredient);
  };
  const handleModalClose = () => {
    setSelectedIngredient(null);
  };

  return (
      <div className={styles.container}>
        <p className="text text_type_main-large pt-10">
          Соберите бургер
        </p>

        <div className={`${styles.tab} pt-5`}>
          <Tab value="one" active={current === 'one'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="two" active={current === 'two'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="three" active={current === 'three'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>

        <div className={`${styles.components} custom-scroll pt-10`}>
          <p className="text text_type_main-medium">
            Булки
          </p>
          <div className={styles.ingredients}>
            {ingredients.filter(ingredient => ingredient.type === "bun")
                .map((ing) => <BurgerIngredient key={ing._id} ingredient={ing} count={1} handleModalOpen={handleModalOpen}/>)}
          </div>

          <p className="text text_type_main-medium">
            Соусы
          </p>
          <div className={styles.ingredients}>
            {ingredients.filter(ingredient => ingredient.type === "sauce")
                .map((ing) => <BurgerIngredient key={ing._id} ingredient={ing} count={1} handleModalOpen={handleModalOpen}/>)}
          </div>

          <p className="text text_type_main-medium">
            Начинки
          </p>
          <div className={styles.ingredients}>
            {ingredients.filter(ingredient => ingredient.type === "main")
                .map((ing) => <BurgerIngredient key={ing._id} ingredient={ing} count={1} handleModalOpen={handleModalOpen}/>)}
          </div>
        </div>
        <div>
          {selectedIngredient && (
              <Modal onClose={handleModalClose} title={"Детали ингредиента"}>
                  <IngredientDetails ingredient={selectedIngredient}/>
              </Modal>
          )}
        </div>
      </div>
  );
}

export default BurgerIngredients;
