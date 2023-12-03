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
import BurgerIngredientPage from "../../pages/burger-ingredient-page";
import {getItems} from "../../services/actions/burger-consrtuctor";
import {AppDispatch} from "../../index";
import {useDispatch} from "react-redux";
import FeedPage from "../../pages/feed/feed-page";


export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const previousLocation = location.state?.previousLocation;
  const dispatch: AppDispatch = useDispatch();

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
              <Route path="/ingredients/:id" element={<BurgerIngredientPage children={<IngredientDetails/>}/>}/>)
          }
        </Routes>
      </div>
    </div>
  )
}
