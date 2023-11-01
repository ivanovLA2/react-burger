import {forgotPassword, getUser, login, logout, refresh, register, resetPassword, updateUser} from "../api";
import AuthResponse from "../../utils/auth/auth-response";
import UserResponse from "../../utils/auth/user-response";

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

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_ERROR';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_ERROR';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_ERROR';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_ERROR';


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

export function forgotUserPassword(email: string) {
  return function (dispatch: (arg0: { type: string; }) => void) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST
    });

    forgotPassword({
      email: email
    }).then(res => {
      if (res && res.ok) {
        let result = res.json() as Promise<AuthResponse>;
        result.then(r => {
          if (r.success) {
            dispatch({
              type: FORGOT_PASSWORD_SUCCESS,
            });
          } else {
            dispatch({
              type: FORGOT_PASSWORD_FAILED
            });
          }
        })
      } else {
        dispatch({
          type: FORGOT_PASSWORD_FAILED
        });
      }
    }).catch(reason => {
      console.error("Error in forgot password", reason)
      dispatch({
        type: FORGOT_PASSWORD_FAILED
      });
    });
  };
}

export function resetUserPassword(token: string, password: string) {
  return function (dispatch: (arg0: { type: string; }) => void) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });

    resetPassword({
      token: token,
      password: password
    }).then(res => {
      if (res && res.ok) {
        let result = res.json() as Promise<AuthResponse>;
        result.then(r => {
          if (r.success) {
            dispatch({
              type: RESET_PASSWORD_SUCCESS,
            });
          } else {
            dispatch({
              type: RESET_PASSWORD_FAILED
            });
          }
        })
      } else {
        dispatch({
          type: RESET_PASSWORD_FAILED
        });
      }
    }).catch(reason => {
      console.error("Error in RESET password", reason)
      dispatch({
        type: RESET_PASSWORD_FAILED
      });
    });
  };
}

function updateToken(dispatch: (arg0: {
  type: string;
  name?: string;
  email?: string;
  refreshToken?: string;
  accessToken?: string
}) => void, refreshToken: string): string | null {
  debugger
  dispatch({
    type: TOKEN_REQUEST
  });

  refresh({
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
          return r.accessToken;
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
  return null;
}

export function getUserInfo(token: string) {
  return function (dispatch: (arg0: {
    type: string;
    name?: string,
    email?: string,
    refreshToken?: string,
    accessToken?: string
  }) => void) {
    dispatch({
      type: GET_USER_REQUEST
    });

    const refreshToken = localStorage.getItem("refreshToken");

    getUser({
      authorization: token
    }).then(res => {
      if (false) {
        let result = res.json() as Promise<UserResponse>;
        result.then(r => {
          if (r.success) {
            dispatch({
              type: GET_USER_SUCCESS,
              name: r.user.name,
              email: r.user.email
            });
          } else {
            dispatch({
              type: GET_USER_FAILED
            });
          }
        })
      } else if (true && refreshToken) {
        const accessToken = updateToken(dispatch, refreshToken);
        debugger
        if (accessToken) {
          getUser({
            authorization: accessToken
          }).then(r => {
            if (res && res.ok) {
              let result = res.json() as Promise<UserResponse>;
              result.then(r => {
                if (r.success) {
                  dispatch({
                    type: GET_USER_SUCCESS,
                    name: r.user.name,
                    email: r.user.email
                  });
                } else {
                  dispatch({
                    type: GET_USER_FAILED
                  });
                }
              })
            } else {
              dispatch({
                type: GET_USER_FAILED
              });
            }
          })
        } else {
          dispatch({
            type: GET_USER_FAILED
          });
        }
      } else {
        dispatch({
          type: GET_USER_FAILED
        });
      }
    }).catch(reason => {
      console.error("Error in RESET password", reason)
      dispatch({
        type: GET_USER_FAILED
      });
    });
  };
}

export function updateUserInfo(token: string, name: string, email: string, password: string) {
  return function (dispatch: (arg0: { type: string; name?: string, email?: string }) => void) {
    dispatch({
      type: UPDATE_USER_REQUEST
    });

    const refreshToken = localStorage.getItem("refreshToken");

    updateUser({
      authorization: token,
      name: name,
      password: password,
      email: email
    }).then(res => {
      if (res && res.ok) {
        let result = res.json() as Promise<UserResponse>;
        result.then(r => {
          if (r.success) {
            dispatch({
              type: UPDATE_USER_SUCCESS,
              name: r.user.name,
              email: r.user.email
            });
          } else {
            dispatch({
              type: UPDATE_USER_FAILED
            });
          }
        })
      } else if (res.status === 403 && refreshToken) {
        const accessToken = updateToken(dispatch, refreshToken);
        if (accessToken) {
          updateUser({
            authorization: token,
            name: name,
            password: password,
            email: email
          }).then(r => {
            if (res && res.ok) {
              let result = res.json() as Promise<UserResponse>;
              result.then(r => {
                if (r.success) {
                  dispatch({
                    type: UPDATE_USER_SUCCESS,
                    name: r.user.name,
                    email: r.user.email
                  });
                } else {
                  dispatch({
                    type: UPDATE_USER_FAILED
                  });
                }
              })
            } else {
              dispatch({
                type: UPDATE_USER_FAILED
              });
            }
          })
        } else {
          dispatch({
            type: GET_USER_FAILED
          });
        }
      } else {


        dispatch({
          type: UPDATE_USER_FAILED
        });
      }
    }).catch(reason => {
      console.error("Error in RESET password", reason)
      dispatch({
        type: UPDATE_USER_FAILED
      });
    });
  };
}