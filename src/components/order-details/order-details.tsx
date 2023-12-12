import styles from './order-details.module.css'
import React from "react";
import done from "../../images/done.svg"

type Props = { orderNumber: string | null; orderRequest: boolean; orderFailed: boolean };

export default function OrderDetails(props: Props) {
  const {orderNumber, orderRequest, orderFailed} = props;
  return (
      <div className={`${styles.orderDetails} pb-30 pt-10`}>
        {orderRequest &&
            (<p className="text text_type_main-default pt-8">
              Загрузка...
            </p>)
        }

        {orderFailed &&
            (<p className="text text_type_main-default pt-8">
              Произошла ошибка, попробуйте позже
            </p>)
        }

        {orderNumber &&
            (<>
              <p className="text text_type_digits-large order-number">{orderNumber}</p>
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
            </>)
        }
      </div>
  );
}
