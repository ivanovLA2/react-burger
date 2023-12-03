import {AppDispatch, RootState} from "../../index";
import BurgerConstructorState from "../../utils/burger-constructor-state";
import {useDispatch, useSelector} from "react-redux";
import styles from "./order-info.module.css"
import WsState from "../../utils/ws-state";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {ORDER_INFO_REQUEST} from "../../services/actions/order-action-types";
import {useParams} from "react-router-dom";

const getConstructorState = (state: RootState) => state.burgerConstructor as BurgerConstructorState


const getWsState = (state: RootState) => state.feed as WsState


export default function OrderInfo() {
  const {orderId} = useParams();
  const dispatch: AppDispatch = useDispatch();


  const {
    feed,
    order
  } = useSelector(getWsState);

  const orderFromFeed = feed?.orders.filter(v => v._id === orderId)[0];

  if (!order) {
    dispatch({
      type: ORDER_INFO_REQUEST
    })
  }

  var result = orderFromFeed ? orderFromFeed : order;

  const {
    items,
  } = useSelector(getConstructorState);

  return (<div className={styles.feedOrder}>
    {result && (<div>

      <div className="text_type_main-small">#{result.number}</div>
      <div className="text_type_main-small">{result.name}</div>
      <div className="text_type_main-small">{result.status}</div>
      <p className="text_type_main-default">Состав:</p>

      <div className={styles.ing}>
        {result.ingredients.map(id => items.filter(item => item._id === id)[0]).map((item, index) =>
          <div>
            <img src={item.image} className={styles.img} style={{zIndex: 1000 - index}} alt={item.name}/>
            <div className="text_type_main-small">{item.name}</div>
            <div
              className="text_type_main-small">{result?.ingredients.filter(v => v === item._id).length} x {item.price}</div>
            <CurrencyIcon type="primary"/>
          </div>
        )}
      </div>

      <div className={styles.orderInfo}>

        <div className="text_type_main-small text_color_inactive">{new Date(result.createdAt).toLocaleString()}</div>
        <div className={styles.price}>
          <div
            className="text_type_digits-default text_color_inactive">{result.ingredients.map(id => items.filter(item => item._id === id)[0]).reduce((sum, i) => sum + i.type === 'bun' ? i.price * 2 : i.price, 0)}</div>
          <div className="pl-1">
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </div>
    </div>)}
  </div>)
}