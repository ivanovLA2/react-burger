import React, {useEffect} from 'react';

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyles from "./app.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getItems} from "../../services/actions/burger-consrtuctor";
import {AppDispatch, RootState} from "../../index";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


const getState = (state: RootState) => state.burgerConstructor

export default function App() {
  const dispatch: AppDispatch = useDispatch();
  const {
    items,
    itemsRequest,
    itemsFailed
  } = useSelector(getState);
  useEffect(
    () => {
      dispatch(getItems());
    },
    []
  );

  const Content = () => {
    if (itemsRequest) {
      return (<p className={`${appStyles.message} text text_type_main-large`}> Загрузка </p>)
    }
    if (itemsFailed) {
      return (
        <p className={`${appStyles.message} text text_type_main-large`}> Возникла ошибка, попробуйте позже </p>)
    }
    if (items.length > 0) {
      return (<main className={appStyles.content}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients/>
          <div className="ml-5 mr-5"></div>
          <BurgerConstructor/>
        </DndProvider>
      </main>)
    }
    return null;
  }

  return (
      <div className={appStyles.app}>
        <AppHeader/>
        <Content/>
      </div>
  )
}
