import React, {useRef} from 'react';
import styles from './burger-ingredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientModel from "../../utils/burger-ingredient-model";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import BurgerConstructorState from "../../utils/burger-constructor-state";
import {RootState} from "../../index";
import useOnScreen from "../../hook/on-sreen-hook";
import OrderState from "../../utils/order-state";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "../../pages/profile/hooks";


const getOrderState = (state: RootState) => state.order as OrderState
const getConstructorState = (state: RootState) => state.burgerConstructor as BurgerConstructorState

function BurgerIngredients() {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = React.useState('bun')
  const {
    items,
  } = useSelector(getConstructorState);

  const {
    orderItems,
    bun
  } = useSelector(getOrderState);

  const ingredients = items;

  const handleModalOpen = (ingredient: BurgerIngredientModel) => {
    navigate("/ingredients/" + ingredient._id, {state: {previousLocation: location}})
  };

  const bunRef = useRef<HTMLDivElement>(null)
  const sauceRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const isBunVisible = useOnScreen(bunRef)
  const isSauceVisible = useOnScreen(sauceRef)
  const isMainVisible = useOnScreen(mainRef)

  const handleScroll = () => {
    if (isBunVisible) {
      setCurrent('bun')
    } else if (isSauceVisible) {
      setCurrent('sauce')
    } else if (isMainVisible) {
      setCurrent('main')
    }
  }

  return (
      <div className={styles.container}>
        <p className="text text_type_main-large pt-10">
          Соберите бургер
        </p>

        <div className={`${styles.tab} pt-5`}>
          <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>

        <div className={`${styles.components} custom-scroll pt-10`} onScroll={handleScroll}>
          <p className="text text_type_main-medium" ref={bunRef}>
            Булки
          </p>
          <div className={styles.ingredients}>
            {ingredients.filter(ingredient => ingredient.type === "bun")
                .map((ing) => <BurgerIngredient key={ing._id} ingredient={ing}
                                                count={bun?._id === ing._id ? 1 : 0}
                                                handleModalOpen={handleModalOpen}/>)}
          </div>

          <p className="text text_type_main-medium" ref={sauceRef}>
            Соусы
          </p>
          <div className={styles.ingredients}>
            {ingredients.filter(ingredient => ingredient.type === "sauce")
                .map((ing) => <BurgerIngredient key={ing._id} ingredient={ing}
                                                count={orderItems.filter(value => value._id === ing._id).length}
                                                handleModalOpen={handleModalOpen}/>)}
          </div>

          <p className="text text_type_main-medium" ref={mainRef}>
            Начинки
          </p>
          <div className={styles.ingredients}>
            {ingredients.filter(ingredient => ingredient.type === "main")
                .map((ing) => <BurgerIngredient key={ing._id} ingredient={ing}
                                                count={orderItems.filter(value => value._id === ing._id).length}
                                                handleModalOpen={handleModalOpen}/>)}
          </div>
        </div>
      </div>
  );
}

export default BurgerIngredients;
