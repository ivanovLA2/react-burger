import React from 'react';

import AppHeader from "../app-header/app-header";

import appStyles from "./app.module.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ProtectedRouteElement} from "../protected-route";
import BurgerConstructorPage from "../../pages/burger-constructor-page";
import {NotFound404} from "../../pages/not-found-page";
import LoginPage from "../../pages/login/login-page";
import RegisterPage from "../../pages/register/register-page";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password/reset-password-page";
import {NotAuthRouteElement} from "../not-authorize-route";
import ProfilePage from "../../pages/profile/profile-page";


export default function App() {

  return (
      <div className={appStyles.app}>
        <BrowserRouter>

          <AppHeader/>
          <div className={appStyles.content}>
            <Routes>
            <Route path="/" element={<BurgerConstructorPage/>}/>
              <Route path="/profile" element={<ProtectedRouteElement children={<ProfilePage/>}/>}/>
              <Route path="/login" element={<NotAuthRouteElement children={<LoginPage/>}/>}/>
              <Route path="/register" element={<NotAuthRouteElement children={<RegisterPage/>}/>}/>
              <Route path="/forgot-password" element={<NotAuthRouteElement children={<ForgotPasswordPage/>}/>}/>
              <Route path="/reset-password" element={<NotAuthRouteElement children={<ResetPasswordPage/>}/>}/>
            <Route path="*" element={<NotFound404/>}/>
            </Routes>
          </div>

        </BrowserRouter>
      </div>
  )
}
