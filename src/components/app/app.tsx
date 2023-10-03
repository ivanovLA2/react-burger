import React, {useEffect, useState} from 'react';

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyles from "./app.module.css";
import BurgerIngredientModel from "../../utils/burger-ingredient-model";

const API_ROOT = 'https://norma.nomoreparties.space/api';
const INGREDIENTS_API = '/ingredients '

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [data, setData] = useState<BurgerIngredientModel[]>([])
  const [orderNum, setOrderNum] = useState("034536")


  useEffect(() => {
    const getProductData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(API_ROOT + INGREDIENTS_API);
        const data = await res.json();
        setData(data.data);
      } catch (e) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };


    getProductData();
  }, [])

  const Content = () => {
    if (isLoading) {
      return <p className={`${appStyles.message} text text_type_main-large`}> Загрузка </p>
    } else if (hasError) {
      return <p className={`${appStyles.message} text text_type_main-large`}> Возникла ошибка, попробуйте позже </p>
    } else {
      return <main className={appStyles.content}>
        <BurgerIngredients ingredients={data}/>
        <div className="ml-5 mr-5"></div>
        <BurgerConstructor ingredients={data.filter(e => e.type !== "bun")}
                           bun={data.filter(e => e.type === "bun")[0]}
                           orderNum={orderNum}/>
      </main>
    }
  }

  return (
      <div className={appStyles.app}>
        <AppHeader/>
        <Content/>
      </div>
  )
}
