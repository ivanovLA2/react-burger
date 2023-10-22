interface AuthState {
  loginRequest: boolean,
  loginFailed: boolean,
  registerRequest: boolean,
  registerFailed: boolean,
  logoutRequest: boolean,
  logoutFailed: boolean,

  tokenRequest: boolean,
  tokenFailed: boolean,

}

export default AuthState
