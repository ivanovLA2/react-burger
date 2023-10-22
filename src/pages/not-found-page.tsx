import React from 'react';
import {Link} from 'react-router-dom';

import styles from './not-found.module.css';

export function NotFound404() {

  return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1>Ошибка</h1>
            <p>Страница не найдена</p>
            <br/>
            <br/>
            <p>Перейдиет пожалуйста на <Link to='/' className={styles.link}>главную страницу</Link></p>
          </div>
        </div>
      </div>
  );
}
