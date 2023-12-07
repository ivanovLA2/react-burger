import {RootState} from "../../index";
import React, {useEffect} from "react";
import styles from './profile-page.module.css'
import {logoutUser} from "../../services/actions/auth";
import {Outlet, useNavigate} from "react-router-dom";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START,} from "../../services/actions/ws-action-types";
import FeedOrderShortInfo from "../../components/feed/feed-order-short-info";
import WsState from "../../utils/ws-state";
import {useDispatch, useSelector} from "./hooks";

const getWsState = (state: RootState) => state.feed as WsState

export default function ProfileOrdersPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    feed,
    wsConnected
  } = useSelector(getWsState);

  useEffect(
      () => {
        dispatch({type: WS_CONNECTION_START, payload: ''});
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
        <div className={styles.ordersHistory}>
          {wsConnected && feed && (<div className={styles.feedContent}>
            <div className={`${styles.feed} custom-scroll`}>
              {
                feed.orders?.map((v, index) => (
                    <FeedOrderShortInfo key={index} orderNumber={v.number} isPersonal={true}/>
                ))
              }
            </div>
          </div>)}
        </div>

        <Outlet/>
      </div>
  )
}
