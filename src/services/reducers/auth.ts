import {
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  TOKEN_FAILED,
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
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
  tokenFailed: false,
  forgotRequest: false,
  forgotFailed: false,
  resetPasswordFailed: false,
  resetPasswordRequest: false,
  email: '',
  name: '',
  getUserFailed: false,
  updateUserRequest: false,
  getUserRequest: false,
  updateUserFailed: false
}

export const authReducer = (state = initialAuthState, action: {
  type: string;
  accessToken: string,
  refreshToken: string,
  name: string,
  email: string
}) => {
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
      localStorage.setItem('accessToken', action.accessToken);
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
      localStorage.setItem('accessToken', action.accessToken);
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
      localStorage.removeItem('accessToken')
      return {
        ...state,
        tokenRequest: true
      };
    }
    case TOKEN_SUCCESS: {
      localStorage.setItem('accessToken', action.accessToken);
      localStorage.setItem('refreshToken', action.refreshToken);
      return {
        ...state,
        tokenRequest: false,
        tokenFailed: false
      };
    }
    case TOKEN_FAILED: {
      localStorage.removeItem('refreshToken');
      return {
        ...state,
        tokenRequest: false,
        tokenFailed: true
      };
    }

    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotRequest: true,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      localStorage.setItem("forgotSuccess", "true")
      return {
        ...state,
        forgotRequest: false,
        forgotFailed: false,
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotFailed: true,
        forgotRequest: false
      };
    }

    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      localStorage.setItem("resetSuccess", "true")
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: false,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordFailed: true,
        resetPasswordRequest: false
      };
    }

    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: false,
        name: action.name,
        email: action.email
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserFailed: true,
        getUserRequest: false
      };
    }

    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserFailed: false,
        name: action.name,
        email: action.email
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserFailed: true,
        updateUserRequest: false
      };
    }


    default: {
      return state;
    }
  }
}
