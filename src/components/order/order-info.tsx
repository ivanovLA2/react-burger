import {RootState} from "../../index";
import BurgerConstructorState from "../../utils/burger-constructor-state";
import {useSelector} from "react-redux";
import styles from "./order-info.module.css"
import WsState from "../../utils/ws-state";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {orderInfo} from "../../services/actions/order-action-types";
import {useParams} from "react-router-dom";
import {useDispatch} from "../../pages/profile/hooks";

const getConstructorState = (state: RootState) => state.burgerConstructor as BurgerConstructorState


const getWsState = (state: RootState) => state.feed as WsState


export default function OrderInfo() {
  const {id} = useParams();
  const dispatch = useDispatch();


  const {
    feed,
    order,
    orderRequest
  } = useSelector(getWsState);
  const {
    items,
  } = useSelector(getConstructorState);

  const orderFromFeed = feed?.orders.filter(v => v._id === id)[0];

  if (!orderFromFeed && !order && !orderRequest && id) {
    dispatch(orderInfo(id))
  }

  const result = orderFromFeed ? orderFromFeed : order;

  return (<div className={styles.orderDetails}>
    {result && items && (<div>

      <div className="text_type_main-small">#{result.number}</div>
      <div className="text_type_main-small">{result.name}</div>
      <div
          className="text_type_main-small">{result.status === 'done' ? "Готов" : result.status === 'canceled' ? 'Отменен' : 'Готовится'}</div>
      <p className="text_type_main-default">Состав:</p>

      <div className={`${styles.ing} custom-scroll`}>
        {result.ingredients.map(id => items.filter(item => item._id === id)[0]).map((item, index) =>
            <div className={styles.ingInfo}>
              <img src={item.image} className={styles.img} style={{zIndex: 100- index}} alt={item.name}/>
              <div className="text_type_main-small">{item.name}</div>
              <div className={styles.price}>
                <div className="text_type_main-small">{result?.ingredients.filter(v => v === item._id).length} x {item.price}</div>
                <div className='pl-1'>
                  <CurrencyIcon type="primary"/>
                </div>

              </div>
            </div>
        )}
      </div>

      <div className={styles.orderInfo}>

        <div className="text_type_main-small text_color_inactive">{new Date(result.createdAt).toLocaleString()}</div>
        <div className={styles.price}>
          <div
              className="text_type_digits-default text_color_inactive">{result.ingredients.map(id => items.filter(item => item._id === id)[0]).reduce((sum, i) => sum + i.price, 0)}</div>
          <div className="pl-1">
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </div>
    </div>)}
  </div>)
}