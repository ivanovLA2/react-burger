import {Navigate} from 'react-router-dom';
import React, {useEffect} from "react";
import Token from "../utils/auth/token";
import {AppDispatch} from "../index";
import {useDispatch} from "react-redux";
import {tokenUpdate} from "../services/actions/auth";


type Props = { children: React.ReactNode; };
export const ProtectedRouteElement = (props: Props) => {
  const {children} = props;
  const dispatch: AppDispatch = useDispatch();

  useEffect(
    () => {
      checkToken()
    },
    []
  );

  function checkToken() {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));


      const tokenBody = JSON.parse(jsonPayload) as Token;

      if (tokenBody.exp < new Date().getTime() / 1000) {

        localStorage.removeItem("accessToken")
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          dispatch(tokenUpdate(refreshToken))
        }
      }
    }
  }

  const content = localStorage.getItem("accessToken") ? children : (<Navigate to="/login" replace/>)

  return (<>
    {content}
  </>);
}
