import React, {useState} from 'react';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {useDispatch, useSelector} from "react-redux";
import BurgerConstructorState from "../../utils/burger-constructor-model";
import {AppDispatch, RootState} from "../../index";
import {createOrder} from "../../services/actions/order";
import {useDrop} from "react-dnd";
import {ADD_INGREDIENT} from "../../services/actions/burger-consrtuctor";


function BurgerConstructor() {
  const dispatch: AppDispatch = useDispatch();

  const {
    orderItems
  } = useSelector((state: RootState) => state.burgerConstructor as BurgerConstructorState);
  const bun = orderItems.filter(value => 'bun' === value.type)[0];

  const [isModalActive, setIsModalActive] = useState(false);
  const handleModalOpen = () => {
    dispatch(createOrder(orderItems.map(item => item._id)));
    setIsModalActive(true);
  };
  const handleModalClose = () => {
    setIsModalActive(false);
  };

  const [{ isHover } , drop] = useDrop({
    accept: "ing",
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      dispatch({
        type: ADD_INGREDIENT,
        id: item
      });
    },
  });

  console.log("bun", bun)
  return (
    <div className={styles.container}>
      <div className={`${styles.but} pr-8 pt-25`}>
        {bun ? (<ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image}/>)
          : (<ConstructorElement
            type="top"
            isLocked={true}
            text={"Перетащите булку"}
            price={0}
            thumbnail={''}/>)}
      </div>
      <div className={`${styles.constructor} pt-3 pl-8 pr-5 custom-scroll`} ref={drop}>
        {orderItems.filter((item) => item.type !== 'bun').length > 0 ?
          orderItems.map((value) => {
                return (<div className={styles.constructorElement} key={value._id}>
                  <DragIcon type="primary"/>
                  <ConstructorElement
                    text={value.name}
                    price={value.price}
                    thumbnail={value.image}

                  />
                </div>)
              }
          )
          : (<ConstructorElement
            text="Добавьте ингредиент"
            price={0}
            thumbnail={''}

          />)}


      </div>
      <div className={`${styles.but} pr-8 pt-3`}>
        {bun ? (<ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name + " (низ)"}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={""}
        />) : (<ConstructorElement
          type="bottom"
          isLocked={true}
          text={"Перетащите булку"}
          price={0}
          thumbnail={''}
          extraClass={""}
        />)}
      </div>
      {orderItems.length > 1 && (<div className={`${styles.order} pt-10 pb-10`}>
        <p className="text text_type_digits-medium pr-1"> {orderItems.reduce((sum, i) => sum + i.price, bun.price)}</p>
        <CurrencyIcon type="primary"/>
        <Button htmlType="button" type="primary" size="medium" extraClass="ml-10 mr-4"
                onClick={handleModalOpen}>
          Оформить заказ
        </Button>
      </div>)}


      <div>
        {isModalActive && (
          <Modal onClose={handleModalClose} title={null}>
            <OrderDetails/>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default BurgerConstructor;
