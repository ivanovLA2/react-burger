import React, {useState} from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientModel from "../../utils/burger-ingredient-model";
import styles from './burger-constructor.module.css'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

type Props = { ingredients: BurgerIngredientModel[]; bun: BurgerIngredientModel; orderNum: string };

function BurgerConstructor(props: Props) {
  const {ingredients, bun, orderNum} = props
  const [isModalActive, setIsModalActive] = useState(false);

  const handleModalOpen = () => {
    setIsModalActive(true);
  };
  const handleModalClose = () => {
    setIsModalActive(false);
  };


  return (
      <div className={styles.container}>
        <div className={`${styles.but} pr-8 pt-25`}>
          <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name + " (верх)"}
              price={bun.price}
              thumbnail={bun.image}
          />
        </div>
        <div className={`${styles.constructor} pt-3 pl-8 pr-5 custom-scroll`}>
          {ingredients.map((value) => {
                return <div className={styles.constructorElement} key={value._id}>
                  <DragIcon type="primary"/>
                  <ConstructorElement
                      text={value.name}
                      price={value.price}
                      thumbnail={value.image}

                  />
                </div>
              }
          )}
        </div>
        <div className={`${styles.but} pr-8 pt-3`}>
          <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name + " (низ)"}
              price={bun.price}
              thumbnail={bun.image}
              extraClass={""}
          />
        </div>
        <div className={`${styles.order} pt-10 pb-10`}>
          <p className="text text_type_digits-medium pr-1"> {ingredients.reduce((sum, i) => sum + i.price, bun.price)}</p>
          <CurrencyIcon type="primary"/>
          <Button htmlType="button" type="primary" size="medium" extraClass="ml-10 mr-4" onClick={handleModalOpen}>
            Оформить заказ
          </Button>
        </div>

        <div>
          {isModalActive && (
              <Modal onClose={handleModalClose} title={""} isModalActive={isModalActive}>
                <OrderDetails orderNum={orderNum}/>
              </Modal>
          )}
        </div>
      </div>
  );
}

export default BurgerConstructor;
