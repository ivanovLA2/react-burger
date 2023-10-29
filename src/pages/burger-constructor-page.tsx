import {AppDispatch, RootState} from "../index";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import appStyles from "../components/app/app.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import {getItems} from "../services/actions/burger-consrtuctor";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";

const getState = (state: RootState) => state.burgerConstructor

export default function BurgerConstructorPage() {
  const {
    items,
    itemsRequest,
    itemsFailed
  } = useSelector(getState);


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
      <Content/>
  )
}
