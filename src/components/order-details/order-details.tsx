import styles from './order-details.module.css'
import React from "react";
import done from "../../images/done.svg"
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import BurgerConstructorState from "../../utils/burger-constructor-model";

export default function OrderDetails() {
  const {
    orderNumber,
    orderRequest,
    orderFailed
  } = useSelector((state: RootState) => state.burgerConstructor as BurgerConstructorState);

  return (
      <div className={`${styles.orderDetails} pb-30 pt-10`}>
        (orderRequest &&
        <p className="text text_type_main-default pt-8">
          Загрузка...
        </p>)

        (orderFailed &&
        <p className="text text_type_main-default pt-8">
          Произошла ошибка, попробуйте позже
        </p>)

        (orderNumber &&
        <p className="text text_type_digits-large">{orderNumber}</p>
        <p className="text text_type_main-default pt-8">
          идентификатор заказа
        </p>
        <img src={done} alt="Готов" className={`${styles.image} pt-15`}/>
        <p className="text text_type_main-small pt-15">
          Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-small text_color_inactive pt-2">
          Дождитесь готовности на орбитальной станции
        </p>
        )
      </div>
  );
}
