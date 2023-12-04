import React, {useEffect} from 'react';

import AppHeader from "../app-header/app-header";

import appStyles from "./app.module.css";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {ProtectedRouteElement} from "../protected-route";
import BurgerConstructorPage from "../../pages/burger-constructor-page";
import {NotFound404} from "../../pages/not-found-page";
import LoginPage from "../../pages/login/login-page";
import RegisterPage from "../../pages/register/register-page";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password/reset-password-page";
import {NotAuthRouteElement} from "../not-authorize-route";
import ProfilePage from "../../pages/profile/profile-page";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import BasePage from "../../pages/base-page";
import {getItems} from "../../services/actions/burger-consrtuctor";
import FeedPage from "../../pages/feed/feed-page";
import ProfileOrdersPage from "../../pages/profile/profile-order-page";
import OrderInfo from "../order/order-info";
import {useDispatch} from "../../pages/profile/hooks";


export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const previousLocation = location.state?.previousLocation;
  const previousProfileOrderLocation = location.state?.previousProfileOrderLocation;
  const previousFeedLocation = location.state?.previousFeedLocation;
  const dispatch = useDispatch();

  useEffect(
      () => {
        dispatch(getItems());
      },
      []
  );

  return (
      <div className={appStyles.app}>
        <AppHeader/>
        <div className={appStyles.content}>
          <Routes>
            <Route path="/" element={<BurgerConstructorPage/>}/>
            <Route path="/feed" element={<FeedPage/>}/>
            <Route path="/profile" element={<ProtectedRouteElement children={<ProfilePage/>}/>}/>
            <Route path="/profile/orders" element={<ProtectedRouteElement children={<ProfileOrdersPage/>}/>}/>
            <Route path="/login" element={<NotAuthRouteElement children={<LoginPage/>}/>}/>
            <Route path="/register" element={<NotAuthRouteElement children={<RegisterPage/>}/>}/>
            <Route path="/forgot-password" element={<NotAuthRouteElement children={<ForgotPasswordPage/>}/>}/>
            <Route path="/reset-password" element={<NotAuthRouteElement children={<ResetPasswordPage/>}/>}/>
            <Route path="*" element={<NotFound404/>}/>

            {
              previousLocation ? (<Route path="/ingredients/:id"
                                         element={<Modal title="Детали ингредиента"
                                                         onClose={() => navigate("/", {replace: true})}
                                                         children={<IngredientDetails/>}/>}/>) : (
                  <Route path="/ingredients/:id" element={<BasePage children={<IngredientDetails/>}/>}/>)
            }

            {
              previousProfileOrderLocation ? (<Route path="/profile/orders/:id"
                                                     element={<Modal title="Детали заказа"
                                                                     onClose={() => navigate("/profile/orders", {replace: true})}
                                                                     children={<OrderInfo/>}/>}/>) : (
                  <Route path="/profile/orders/:id" element={<BasePage children={<OrderInfo/>}/>}/>)
            }
            {
              previousFeedLocation ? (<Route path="/feed/:id"
                                             element={<Modal title="Детали заказа"
                                                             onClose={() => navigate("/feed", {replace: true})}
                                                             children={<OrderInfo/>}/>}/>) : (
                  <Route path="/feed/:id" element={<BasePage children={<OrderInfo/>}/>}/>)
            }
          </Routes>
        </div>
      </div>
  )
}
