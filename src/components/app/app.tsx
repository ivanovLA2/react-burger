import React from 'react';

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyles from "./app.module.css";
import data from "../../utils/data"

class App extends React.Component {

  state = { storage: data };

  render() {
    return (
        <div className={appStyles.app}>
          <AppHeader/>
          <main className={appStyles.content}>
            <BurgerIngredients ingredients={this.state.storage}/>
            <div className="ml-5 mr-5"></div>
            <BurgerConstructor ingredients={this.state.storage.filter(e => e.type !== "bun")} bun={this.state.storage.filter(e => e.type === "bun")[0]}/>
          </main>
        </div>
    )
  }
}

export default App;
