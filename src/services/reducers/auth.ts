import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  TOKEN_FAILED,
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
} from "../actions/auth";
import AuthState from "../../utils/auth-state";

export const initialAuthState: AuthState = {
  loginRequest: false,
  loginFailed: false,
  registerRequest: false,
  registerFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  tokenRequest: false,
  tokenFailed: false
}

export const authReducer = (state = initialAuthState, action: { type: any; accessesToken: string, refreshToken: string }) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true
      };
    }
    case LOGIN_SUCCESS: {
      localStorage.setItem('accessToken', action.accessesToken);
      localStorage.setItem('refreshToken', action.refreshToken);
      return {
        ...state,
        loginRequest: false,
        loginFailed: false
      };
    }


    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: true
      };
    }
    case REGISTER_SUCCESS: {
      localStorage.setItem('accessToken', action.accessesToken);
      localStorage.setItem('refreshToken', action.refreshToken);
      return {
        ...state,
        registerRequest: false,
        registerFailed: false
      };
    }


    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true
      };
    }
    case LOGOUT_SUCCESS: {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: false
      };
    }


    case TOKEN_REQUEST: {
      return {
        ...state,
        tokenRequest: true
      };
    }
    case TOKEN_SUCCESS: {
      return {
        ...state,
        tokenRequest: false,
        tokenFailed: true
      };
    }
    case TOKEN_FAILED: {
      localStorage.setItem('accessToken', action.accessesToken);
      localStorage.setItem('refreshToken', action.refreshToken);
      return {
        ...state,
        tokenRequest: false,
        tokenFailed: false
      };
    }

    default: {
      return state;
    }
  }
}
