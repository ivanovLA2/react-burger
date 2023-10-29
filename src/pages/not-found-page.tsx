import React from 'react';
import {Link} from 'react-router-dom';

import styles from './not-found.module.css';

export function NotFound404() {

  return (
    <div className={styles.content}>
      <p className="text text_type_main-large">
        Ошибка
      </p>
      <p className="text text_type_main-medium">Страница не найдена</p>
      <br/>
      <br/>
      <p className="text text_type_main-medium">Перейдите пожалуйста на <Link to='/' className={styles.link}>главную
        страницу</Link></p>
    </div>
  );
}
