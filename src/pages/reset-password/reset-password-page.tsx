import React from "react";
import styles from "./reset-password-page.module.css"
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";


export default function ResetPasswordPage() {
  const [password, setPassword] = React.useState('')
  const [code, setCode] = React.useState('')
  const onChangePassword = (e : any) => {
    setPassword(e.target.value)
  }

  const onChangeCode = (e : any) => {
    setCode(e.target.value)
  }

  return (
      <div className={styles.resetPassword}>
        <p className="text text_type_main-medium">
          Восстановление пароля
        </p>

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



        <Button htmlType="button" type="primary" size="medium" extraClass="pt-6">
          Сохранить
        </Button>


        <p className="text text_type_main-small pt-20">
          Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
        </p>
      </div>
  )
}
