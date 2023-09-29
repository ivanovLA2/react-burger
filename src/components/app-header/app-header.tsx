import React from 'react';
import styles from './app-header.module.css'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
      <header className={`${styles.header} pt-4`}>
        <div className={styles.nav}>
          <a href="#" className={`${styles.link} pl-5 pr-5 pt-4 pb-4 mr-2`}>
            <BurgerIcon type="primary"/>
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </a>

          <a href="#" className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}>
            <ListIcon type="secondary"/>
            <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
          </a>

        </div>

        <Logo/>

        <div className={styles.nav}>
          <a href="#" className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}>
            <ProfileIcon type="secondary"/>
            <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
          </a>
        </div>
      </header>
  );
}

export default AppHeader;
