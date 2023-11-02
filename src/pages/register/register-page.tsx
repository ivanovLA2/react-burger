import React, {FormEvent, useEffect} from "react";
import styles from "./register-page.module.css"
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {AppDispatch, RootState} from "../../index";
import AuthState from "../../utils/auth-state";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../services/actions/auth";

const getAuthState = (state: RootState) => state.auth as AuthState

export default function RegisterPage() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();


  const {
    registerRequest,
    registerFailed,
  } = useSelector(getAuthState);

  useEffect(() => {
    if (localStorage.getItem("accessToken"))
      navigate("/", {replace: true})
  }, [registerFailed, registerRequest]);

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value)
  }

  const onChangePassword = (e: any) => {
    setPassword(e.target.value)
  }

  const onChangeName = (e: any) => {
    setName(e.target.value)
  }

  const onRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(registerUser(email, password, name))
  }

  return (
    <div className={styles.register}>

      {
        registerRequest && <p className="text text_type_main-medium">
              Загрузка...
          </p>
      }

      {
        registerFailed && <p className="text text_type_main-medium">
              Ошибка регистрации. Попробуйте еще раз.
          </p>
      }

      <p className="text text_type_main-medium">
        Регистрация
      </p>

      <form onSubmit={(e) => onRegister(e)} className={styles.registerForm}>

        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChangeName}
          value={name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="pt-6"
        />

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
          (name && email && password) &&
            <div className="pt-6">
                <Button htmlType="submit" type="primary" size="medium" extraClass="pt-6">
                    Зарегистрироваться
                </Button>
            </div>
        }
      </form>


      <p className="text text_type_main-small pt-20">
        Уже зарегистрированы? <Link to='/login' className={styles.link}>Войти</Link>
      </p>
    </div>
  )
}
