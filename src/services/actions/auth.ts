import {login, logout, register} from "../api";
import AuthResponse from "../../utils/auth/auth-response";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_ERROR';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_ERROR';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_ERROR';

export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_FAILED = 'TOKEN_ERROR';


export function loginUser(email: string, password: string) {
  return function (dispatch: (arg0: { type: string; accessToken?: string; refreshToken?: string; }) => void) {
    dispatch({
      type: LOGIN_REQUEST
    });

    login({
      email: email,
      password: password
    }).then(res => {
      if (res && res.ok) {
        let result = res.json() as Promise<AuthResponse>;
        result.then(r => {
          if (r.success) {
            dispatch({
              type: LOGIN_SUCCESS,
              accessToken: r.accessToken,
              refreshToken: r.refreshToken
            });
          } else {
            dispatch({
              type: LOGIN_FAILED
            });
          }
        })
      } else {
        dispatch({
          type: LOGIN_FAILED
        });
      }
    }).catch(reason => {
      console.error("Error in login user", reason)
      dispatch({
        type: LOGIN_FAILED
      });
    });
  };
}

export function registerUser(email: string, password: string, name: string) {
  return function (dispatch: (arg0: { type: string; accessToken?: string; refreshToken?: string; }) => void) {
    dispatch({
      type: REGISTER_REQUEST
    });

    register({
      email: email,
      password: password,
      name: name
    }).then(res => {
      if (res && res.ok) {
        let result = res.json() as Promise<AuthResponse>;
        result.then(r => {
          if (r.success) {
            dispatch({
              type: REGISTER_SUCCESS,
              accessToken: r.accessToken,
              refreshToken: r.refreshToken
            });
          } else {
            dispatch({
              type: REGISTER_FAILED
            });
          }
        })
      } else {
        dispatch({
          type: REGISTER_FAILED
        });
      }
    }).catch(reason => {
      console.error("Error in register user", reason)
      dispatch({
        type: REGISTER_FAILED
      });
    });
  };
}

export function logoutUser(refreshToken: string) {
  return function (dispatch: (arg0: { type: string; }) => void) {
    dispatch({
      type: LOGOUT_REQUEST
    });

    logout({
      token: refreshToken
    }).then(res => {
      if (res && res.ok) {
        let result = res.json() as Promise<AuthResponse>;
        result.then(r => {
          if (r.success) {
            dispatch({
              type: LOGOUT_SUCCESS,
            });
          } else {
            dispatch({
              type: LOGOUT_FAILED
            });
          }
        })
      } else {
        dispatch({
          type: LOGOUT_FAILED
        });
      }
    }).catch(reason => {
      console.error("Error in logout user", reason)
      dispatch({
        type: LOGOUT_FAILED
      });
    });
  };
}

export function tokenUpdate(refreshToken: string) {
  return function (dispatch: (arg0: { type: string; refreshToken?: string, accessToken?: string }) => void) {
    dispatch({
      type: TOKEN_REQUEST
    });

    logout({
      token: refreshToken
    }).then(res => {
      if (res && res.ok) {
        let result = res.json() as Promise<AuthResponse>;
        result.then(r => {
          if (r.success) {
            dispatch({
              type: TOKEN_SUCCESS,
              refreshToken: r.refreshToken,
              accessToken: r.accessToken
            });
          } else {
            dispatch({
              type: TOKEN_FAILED
            });
          }
        })
      } else {
        dispatch({
          type: TOKEN_FAILED
        });
      }
    }).catch(reason => {
      console.error("Error in update token", reason)
      dispatch({
        type: TOKEN_FAILED
      });
    });
  };
}
