import React, {FormEvent, useEffect} from "react";
import styles from "./reset-password-page.module.css"
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {RootState} from "../../index";
import AuthState from "../../utils/auth-state";
import {resetUserPassword} from "../../services/actions/auth";
import {useDispatch, useSelector} from "../profile/hooks";


const getAuthState = (state: RootState) => state.auth as AuthState

export default function ResetPasswordPage() {
  const [password, setPassword] = React.useState('')
  const [code, setCode] = React.useState('')
  const dispatch = useDispatch();

  const {
    resetPasswordFailed,
    resetPasswordRequest
  } = useSelector(getAuthState);
  const navigate = useNavigate();


  useEffect(() => {
    if (localStorage.getItem("resetSuccess")) {
      localStorage.removeItem("resetSuccess")
      navigate("/login", {replace: true})
    }
  }, [resetPasswordFailed, resetPasswordRequest]);

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }

  const onReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(resetUserPassword(code, password))
  }

  return (
      <div className={styles.resetPassword}>
        {
            resetPasswordRequest && <p className="text text_type_main-medium">
                Загрузка...
            </p>
        }

        {
            resetPasswordFailed && <p className="text text_type_main-medium">
                Ошибка сброса паролья. Попробуйте еще раз.
            </p>
        }
        <p className="text text_type_main-medium">
          Восстановление пароля
        </p>

        <form onSubmit={(e) => onReset(e)} className={styles.resetPasswordForm}>
          <PasswordInput
              onChange={onChangePassword}
              value={password}
              name={'password'}
              extraClass="pt-6"
          />

          <Input
              type={'text'}
              placeholder={'Введите код из письма'}
              onChange={onChangeCode}
              value={code}
              name={'code'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
              extraClass="pt-6"
          />


          {
              (password && code) &&
              <div className="pt-6">
                  <Button htmlType="submit" type="primary" size="medium" extraClass="pt-6">
                      Сохранить
                  </Button>
              </div>
          }
        </form>


        <p className="text text_type_main-small pt-20">
          Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
        </p>
      </div>
  )
}
