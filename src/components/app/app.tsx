import React from 'react';

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyles from "./app.module.css";
import data from "../../utils/data"

class App extends React.Component {

  state = data;

  render() {
    return (
        <main className={appStyles.app}>
          <AppHeader/>
          <div className={appStyles.content}>
            <BurgerIngredients ingredients={this.state}/>
            <div className="ml-5 mr-5"></div>
            <BurgerConstructor ingredients={this.state}/>
          </div>
        </main>
    )
  }
}

export default App;
