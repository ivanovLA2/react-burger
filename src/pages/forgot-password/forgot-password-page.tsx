import React, {FormEvent, useEffect} from "react";
import styles from "./forgot-password-page.module.css"
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {forgotUserPassword} from "../../services/actions/auth";
import {RootState} from "../../index";
import AuthState from "../../utils/auth-state";
import {useDispatch, useSelector} from "../profile/hooks";


const getAuthState = (state: RootState) => state.auth as AuthState

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState('')
  const dispatch = useDispatch();

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

  const onForgotPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(forgotUserPassword(email))
  }

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        <form onSubmit={(e) => onForgotPassword(e)} className={styles.forgotPasswordForm}>
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
                    <Button htmlType="submit" type="primary" size="medium" extraClass="pt-6">
                      Восстановить
                    </Button>
                  </div>)
          }
        </form>
        <p className="text text_type_main-small pt-20">
          Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
        </p>
      </div>
  )
}
