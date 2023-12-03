import {AppDispatch, RootState} from "../../index";
import {useDispatch, useSelector} from "react-redux";
import styles from './feed-page.module.css'
import FeedOrderShortInfo from "../../components/feed/feed-order-short-info";
import {useEffect} from "react";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../../services/actions/ws-action-types";
import WsState from "../../utils/ws-state";

const getWsState = (state: RootState) => state.feed as WsState

export default function FeedPage() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(
    () => {
      dispatch({type: WS_CONNECTION_START});
      return () => {
        dispatch({type: WS_CONNECTION_CLOSED});
      }
    },
    []
  );

  const {
    feed,
  } = useSelector(getWsState);

  return (<div className={styles.info}>

    <p className="text_type_main-medium">Лента заказов</p>
    {feed && (<div className={styles.feedContent}>
      <div className={`${styles.feed} custom-scroll`}>
        {
          feed.orders.map((v, index) => (
            <FeedOrderShortInfo key={index} orderId={v._id} isPersonal={false}/>
          ))
        }
      </div>
      <div className={styles.totalInfo}>
        <div className={styles.orderList}>
          <div className={styles.orderNums}>
            <p className="text_type_main-small pb-6">Готовы:</p>
            <div className={`${styles.orderNumbers} custom-scroll`}>
              {
                feed.orders.filter(v => v.status === 'done').map((v, index) => (
                  <p key={index} className={`text text_type_digits-medium ${styles.orderItem}`}>{v.number}</p>))
              }
            </div>
          </div>
          <div className={styles.orderNums}>
            <p className="text_type_main-small pb-6">В работе:</p>
            <div className={`${styles.orderNumbers} custom-scroll`}>
              {
                feed.orders.filter(v => v.status !== 'done').map((v, index) => (
                  <p key={index} className="text text_type_digits-small">{v.number}</p>))
              }
            </div>
          </div>
        </div>
        <div className={styles.totalOrderInfo}>
          <p className="text_type_main-default">Выполнено за все время:</p>
          <p className="text text_type_digits-medium">{feed.total}</p>

          <p className="text_type_main-default">Выполнено за сегодня:</p>
          <p className="text text_type_digits-medium">{feed.totalToday}</p>

        </div>
      </div>
    </div>)}


  </div>)
}