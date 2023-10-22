import React from "react";
import styles from "./forgot-password-page.module.css"
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";


export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState('')
  const onChangeEmail = (e : any) => {
    setEmail(e.target.value)
  }

  return (
      <div className={styles.forgotPassword}>
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

        <Button htmlType="button" type="primary" size="medium" extraClass="pt-6">
          Восстановить
        </Button>


        <p className="text text_type_main-small pt-20">
          Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link>
        </p>
      </div>
  )
}
