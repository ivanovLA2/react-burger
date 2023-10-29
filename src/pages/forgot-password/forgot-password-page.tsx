import React, {useEffect} from "react";
import styles from "./forgot-password-page.module.css"
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {forgotUserPassword} from "../../services/actions/auth";
import {AppDispatch, RootState} from "../../index";
import AuthState from "../../utils/auth-state";


const getAuthState = (state: RootState) => state.auth as AuthState

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState('')
  const dispatch: AppDispatch = useDispatch();

  const {
    forgotRequest,
    forgotFailed
  } = useSelector(getAuthState);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("forgotSuccess")) {
      localStorage.removeItem("forgotSuccess")
      navigate("/reset-password", {replace: true})
    }
  }, [forgotRequest, forgotFailed]);

  const onForgotPassword = () => {
    dispatch(forgotUserPassword(email))
  }

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value)
  }

  return (
    <div className={styles.forgotPassword}>
      {
        forgotRequest && <p className="text text_type_main-medium">
              Загрузка...
          </p>
      }

      {
        forgotFailed && <p className="text text_type_main-medium">
              Ошибка авторизации. Попробуйте еще раз.
          </p>
      }
      <p className="text text_type_main-medium">
        Восстановление пароля
      </p>

      <EmailInput
        onChange={onChangeEmail}
        value={email}
        name={'email'}
        isIcon={false}
        extraClass="pt-6"
      />

      {
        email && (
          <div className="pt-6">
            <Button htmlType="button" type="primary" size="medium" extraClass="pt-6" onClick={onForgotPassword}>
              Восстановить
            </Button>
          </div>)
      }

      <p className="text text_type_main-small pt-20">
        Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
      </p>
    </div>
  )
}
