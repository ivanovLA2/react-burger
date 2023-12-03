import {RootState} from "../../index";
import BurgerConstructorState from "../../utils/burger-constructor-state";
import {useSelector} from "react-redux";
import styles from "./feed-order.short-info.module.css"
import WsState from "../../utils/ws-state";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

const getConstructorState = (state: RootState) => state.burgerConstructor as BurgerConstructorState

type Props = {
  orderId: string
};
const getWsState = (state: RootState) => state.feed as WsState


export default function FeedOrderShortInfo(props: Props) {

  const {orderId} = props;

  const {
    feed,
  } = useSelector(getWsState);

  const order = feed?.orders.filter(v => v._id === orderId)[0];

  const {
    items,
  } = useSelector(getConstructorState);

  return (<div className={styles.feedOrder}>
    {order && (<div>
      <div className={styles.feedHeader}>
        <div className="text_type_main-small">#{order.number}</div>
        <div className="text_type_main-small text_color_inactive">{new Date(order.createdAt).toLocaleString()}</div>
      </div>
      <div className="text_type_main-small">{order.name}</div>
      <div className={styles.orderInfo}>
        <div className={styles.ingImages}>
          {order.ingredients.map(id => items.filter(item => item._id === id)[0]).map(item =>
            <img src={item.image_mobile} className={styles.img} alt={item.name}/>)}
        </div>
        <div className={styles.price}>
          <div
            className="text_type_digits-default">{order.ingredients.map(id => items.filter(item => item._id === id)[0]).reduce((sum, i) => sum + i.type === 'bun' ? i.price * 2 : i.price, 0)}</div>
          <div className="pl-1">
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </div>
    </div>)}
  </div>)
}