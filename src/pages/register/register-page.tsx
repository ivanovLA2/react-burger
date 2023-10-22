import React from "react";
import styles from "./register-page.module.css"
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";


export default function RegisterPage() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')
  const onChangeEmail = (e: any) => {
    setEmail(e.target.value)
  }

  const onChangePassword = (e: any) => {
    setPassword(e.target.value)
  }

  const onChangeName = (e: any) => {
    setName(e.target.value)
  }


  return (
      <div className={styles.register}>
        <p className="text text_type_main-medium">
          Регистрация
        </p>

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

        <Button htmlType="button" type="primary" size="medium" extraClass="pt-6">
          Зарегистрироваться
        </Button>


        <p className="text text_type_main-small pt-20">
          Уже зарегистрированы? <Link to='/login' className={styles.link}>Войти</Link>
        </p>
      </div>
  )
}
