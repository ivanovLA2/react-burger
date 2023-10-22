import React from 'react';

import AppHeader from "../app-header/app-header";

import appStyles from "./app.module.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ProtectedRouteElement} from "../protected-route";
import BurgerConstructorPage from "../../pages/burger-constructor-page";
import {NotFound404} from "../../pages/not-found-page";


export default function App() {

  return (
      <div className={appStyles.app}>
        <AppHeader/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedRouteElement children={<BurgerConstructorPage/>}/>}/>
            <Route path="*" element={<NotFound404/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  )
}
