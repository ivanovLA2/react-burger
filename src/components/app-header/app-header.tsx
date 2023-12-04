import React from 'react';
import styles from './app-header.module.css'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation} from "react-router-dom";

function AppHeader() {
  const {pathname} = useLocation();

  return (
      <header className={`${styles.header} pt-4`}>
        <div className={styles.nav}>
          <Link to="/" className={`${styles.link} pl-5 pr-5 pt-4 pb-4 mr-2`}>
            <BurgerIcon type={pathname !== '/' ? 'secondary' : 'primary'}/>
            <p
                className={`text text_type_main-default ml-2 ${pathname !== '/' ? 'text_color_inactive' : ''}`}>Конструктор</p>
          </Link>

          <Link to="/feed" className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}>
            <ListIcon type={pathname !== '/feed' ? 'secondary' : 'primary'}/>
            <p
                className={`text text_type_main-default ml-2 ${pathname !== '/feed' ? 'text_color_inactive' : ''}`}>Лента
              заказов</p>
          </Link>

        </div>

        <Logo/>

        <div className={styles.nav}>
          <Link to="/profile" className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}>
            <ProfileIcon type={pathname !== '/profile' ? 'secondary' : 'primary'}/>
            <p
                className={`text text_type_main-default ml-2 ${pathname !== '/profile' ? 'text_color_inactive' : ''}`}>Личный
              кабинет</p>
          </Link>
        </div>
      </header>
  );
}

export default AppHeader;
