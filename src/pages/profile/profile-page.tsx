import {AppDispatch, RootState} from "../../index";
import AuthState from "../../utils/auth-state";
import {useDispatch, useSelector} from "react-redux";
import React, {FormEvent, useEffect} from "react";
import styles from './profile-page.module.css'
import {getUserInfo, logoutUser, updateUserInfo} from "../../services/actions/auth";
import {useNavigate} from "react-router-dom";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";

const getAuthState = (state: RootState) => state.auth as AuthState

export default function ProfilePage() {

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const {
    getUserRequest,
    getUserFailed,
    updateUserFailed,
    updateUserRequest,
    email,
    name
  } = useSelector(getAuthState);

  const [emailValue, setEmailValue] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [nameValue, setNameValue] = React.useState('')
  const [changed, setChanged] = React.useState(false)

  useEffect(() => {
    const item = localStorage.getItem("accessToken");
    if (item) {
      dispatch(getUserInfo(item))
    }
  }, []);

  useEffect(() => {
    setEmailValue(email);
    setNameValue(name)
  }, [email, name]);

  const onChangeEmail = (e: any) => {
    setChanged(true)
    setEmailValue(e.target.value)
  }

  const onChangePassword = (e: any) => {
    setChanged(true)
    setPassword(e.target.value)
  }

  const onChangeName = (e: any) => {
    setChanged(true)
    setNameValue(e.target.value)
  }

  const onSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const item = localStorage.getItem("accessToken");
    if (item) {
      dispatch(updateUserInfo(item, nameValue, emailValue, password))
      setChanged(false)
    }
  }

  const onCancel = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEmailValue(email);
    setNameValue(name);
    setPassword('');
  }

  const logout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      dispatch(logoutUser(refreshToken))
      localStorage.removeItem('accessToken')
      navigate("/login", {replace: true})
    }
  }

  return (
      <div className={styles.profileContent}>
        <div className={styles.profileMenu}>
          <p className="text text_type_main-medium">
            Профиль
          </p>
          <p className="text text_type_main-medium text_color_inactive pt-6">
            История заказов
          </p>
          <p className="text text_type_main-medium text_color_inactive pt-6" onClick={logout}>
            Выход
          </p>

          <p className="text text_type_main-small text_color_inactive pt-15">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <div className={`${styles.profileInfo} pl-6`}>
          {
              getUserRequest && <p className="text text_type_main-medium">
                  Загрузка...
              </p>
          }

          {
              getUserFailed && <p className="text text_type_main-medium">
                  Ошибка получения данных о пользователе. Попробуйте еще раз.
              </p>
          }
          <form onSubmit={(e) => onSave(e)} onReset={(e) => onCancel(e)} className={styles.profileInfo }>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onChangeName}
                value={nameValue}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="pt-6"
                icon='EditIcon'
            />

            <EmailInput
                onChange={onChangeEmail}
                value={emailValue}
                name={'email'}
                isIcon={true}
                extraClass="pt-6"
            />

            <PasswordInput
                onChange={onChangePassword}
                value={password}
                name={'password'}
                extraClass="pt-6"
                icon='EditIcon'
            />

            {
                changed && <div className="pt-6">
                    <Button htmlType="submit" type="primary" size="medium">
                        Сохранить
                    </Button>

                    <Button htmlType="reset" type="secondary" size="medium">
                        Отменить
                    </Button>
                </div>
            }
          </form>

          {
              updateUserRequest && <p className="text text_type_main-medium">
                  Загрузка...
              </p>
          }

          {
              updateUserFailed && <p className="text text_type_main-medium">
                  Ошибка обновления данных о пользователе. Попробуйте еще раз.
              </p>
          }

        </div>
      </div>
  )
}
