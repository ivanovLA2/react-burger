import React from "react";
import styles from "./login-page.module.css"
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {AppDispatch, RootState} from "../../index";
import AuthState from "../../utils/auth-state";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../services/actions/auth";


const getAuthState = (state: RootState) => state.auth as AuthState
export default function LoginPage() {
  const dispatch: AppDispatch = useDispatch();

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const {
    loginFailed,
    loginRequest,
  } = useSelector(getAuthState);

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value)
  }
  const onChangePassword = (e: any) => {
    setPassword(e.target.value)
  }

  const onLogin = () => {
    dispatch(loginUser(email, password))
  }

  return (
      <div className={styles.login}>
        {
            loginRequest && <p className="text text_type_main-medium">
                Загрузка...
            </p>
        }

        {
            loginFailed && <p className="text text_type_main-medium">
              Ощибка авторизации.
            </p>
        }
        <p className="text text_type_main-medium">
          Вход
        </p>

        <EmailInput
            onChange={onChangeEmail}
            value={email}
            name={'email'}
            isIcon={false}
            extraClass="pt-6"
        />

        <PasswordInput
            onChange={onChangePassword}
            value={password}
            name={'password'}
            extraClass="pt-6"
        />

        {
            (email && password) &&
            <Button htmlType="button" type="primary" size="medium" extraClass="pt-6" onClick={onLogin}>
                Войти
            </Button>
        }


        <p className="text text_type_main-small pt-20">
          Вы - новый пользователь? <Link to='/register' className={styles.link}>Зарегистрироваться</Link>
        </p>

        <p className="text text_type_main-small pt-4">
          Забыли пароль? <Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link>
        </p>
      </div>
  )
}
