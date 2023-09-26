import React from 'react';

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import appStyles from "./app.module.css";

class App extends React.Component {
  render() {
    return (
        <main className={ appStyles.app }>
          <AppHeader/>
          <section>
            <BurgerConstructor/>
            <BurgerIngredients/>
          </section>
        </main>
    )
  }
}

export default App;
