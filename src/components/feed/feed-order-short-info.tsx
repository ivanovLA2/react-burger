import {RootState} from "../../index";
import BurgerConstructorState from "../../utils/burger-constructor-state";
import styles from "./feed-order.short-info.module.css"
import WsState from "../../utils/ws-state";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "../../pages/profile/hooks";
import groupCountStrings from "../../utils/aggregate-functions";

const getConstructorState = (state: RootState) => state.burgerConstructor as BurgerConstructorState

type Props = {
  orderId: string,
  isPersonal: boolean
};
const getWsState = (state: RootState) => state.feed as WsState


export default function FeedOrderShortInfo(props: Props) {
  const navigate = useNavigate();
  const {orderId, isPersonal} = props;
  const location = useLocation();


  const handleClick = () => {
    if (isPersonal) {
      navigate("/profile/orders/" + orderId, {state: {previousProfileOrderLocation: location}})
    } else {
      navigate("/feed/" + orderId, {state: {previousFeedLocation: location}})
    }
  };

  const {
    feed,
  } = useSelector(getWsState);

  const order = feed?.orders.filter(v => v._id === orderId)[0];

  const {
    items,
  } = useSelector(getConstructorState);

  const ingredients = order && items ? groupCountStrings(order.ingredients.map(id => items.filter(item => item._id === id)[0]).filter(item => item !== undefined).map(item => item._id)) : [];

  return (<div className={styles.feedOrder} onClick={handleClick}>
    {order && (<div>
      <div className={styles.feedHeader}>
        <div className="text_type_main-small">#{order.number}</div>
        <div className="text_type_main-small text_color_inactive">{new Date(order.createdAt).toLocaleString()}</div>
      </div>
      <div className="text_type_main-small">{order.name}</div>
      <div className={styles.orderInfo}>
        <div className={styles.ingImages}>
          {ingredients.map(value => ({
            ing: items.filter(item => item._id === value.string)[0],
            count: value.count
          })).map((item, index) =>
              <div className={styles.imgBox} key={index}>
                <img src={item.ing.image_mobile} className={styles.img} style={{zIndex: 1000 - index}}
                     alt={item.ing.name}/>
                {item.count > 1 &&
                    <p className={`text_type_digits-default ${styles.count}`}>+{item.count}</p>}
              </div>
          )}
        </div>
        <div className={styles.price}>
          <div
              className="text_type_digits-default">{order.ingredients.map(id => items.filter(item => item._id === id)[0]).filter(item => item !== undefined).reduce((sum, i) => sum + i.price, 0)}</div>
          <div className="pl-1">
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </div>
    </div>)}
  </div>)
}