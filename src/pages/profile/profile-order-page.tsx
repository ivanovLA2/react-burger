import {AppDispatch, RootState} from "../../index";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import styles from './profile-page.module.css'
import {logoutUser} from "../../services/actions/auth";
import {useNavigate} from "react-router-dom";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START_SECURE
} from "../../services/actions/ws-action-types";
import FeedOrderShortInfo from "../../components/feed/feed-order-short-info";
import WsState from "../../utils/ws-state";

const getWsState = (state: RootState) => state.feed as WsState

export default function ProfileOrdersPage() {

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const {
    feed,
    wsConnected
  } = useSelector(getWsState);

  useEffect(
    () => {
      dispatch({type: WS_CONNECTION_START_SECURE});
      return () => {
        dispatch({type: WS_CONNECTION_CLOSED});
      }
    },
    []
  );


  const logout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      dispatch(logoutUser(refreshToken))
      localStorage.removeItem('accessToken')
      navigate("/login", {replace: true})
    }
  }

  const moveToProfile = () => {
    navigate("/profile", {replace: true})
  }

  return (
    <div className={styles.profileContent}>
      <div className={styles.profileMenu}>
        <p className="text text_type_main-medium" onClick={moveToProfile}>
          Профиль
        </p>
        <p className="text text_type_main-medium text_color_inactive pt-6">
          История заказов
        </p>
        <p className="text text_type_main-medium text_color_inactive pt-6" onClick={logout}>
          Выход
        </p>

        <p className="text text_type_main-small text_color_inactive pt-15">
          В этом разделе вы можете посмотреть историю заказов
        </p>
      </div>
      <div>
        {wsConnected && feed && (<div className={styles.feedContent}>
          <div className={`${styles.feed} custom-scroll`}>
            {
              feed.orders.map((v, index) => (
                <FeedOrderShortInfo key={index} orderId={v._id} isPersonal={true}/>
              ))
            }
          </div>
        </div>)}
      </div>
    </div>
  )
}
