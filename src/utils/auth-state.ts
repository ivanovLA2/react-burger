interface AuthState {
  loginRequest: boolean,
  loginFailed: boolean,

  registerRequest: boolean,
  registerFailed: boolean,

  logoutRequest: boolean,
  logoutFailed: boolean,

  tokenRequest: boolean,
  tokenFailed: boolean,

  forgotRequest: boolean,
  forgotFailed: boolean,

  resetPasswordRequest: boolean,
  resetPasswordFailed: boolean,

  getUserRequest: boolean,
  getUserFailed: boolean,

  updateUserRequest: boolean,
  updateUserFailed: boolean,

  name: string,
  email: string
}

export default AuthState
