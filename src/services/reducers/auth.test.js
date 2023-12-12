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

import {authReducer, initialAuthState} from './auth'

describe('Auth reducer', () => {
    jest.spyOn(Object.getPrototypeOf(localStorage), 'setItem')
    jest.spyOn(Object.getPrototypeOf(localStorage), 'removeItem')
    Object.setPrototypeOf(localStorage.setItem, jest.fn())
    Object.setPrototypeOf(localStorage.removeItem, jest.fn())

    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual(
            initialAuthState
        )
    })

    it('should handle LOGIN_REQUEST', () => {
        expect(
            authReducer({}, {
                type: LOGIN_REQUEST
            })
        ).toEqual(
            {
                loginRequest: true
            }
        )
    })

    it('should handle LOGIN_FAILED', () => {
        expect(
            authReducer({}, {
                type: LOGIN_FAILED
            })
        ).toEqual(
            {
                loginRequest: false,
                loginFailed: true,
            }
        )
    })

    it('should handle LOGIN_SUCCESS', () => {
        expect(
            authReducer({}, {
                type: LOGIN_SUCCESS,
                accessToken: 'access',
                refreshToken: 'refresh'
            })
        ).toEqual(
            {
                loginRequest: false,
                loginFailed: false,
            }
        )
        expect(localStorage.setItem).toHaveBeenCalledTimes(2)
        expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', 'access')
        expect(localStorage.setItem).toHaveBeenCalledWith('refreshToken', 'refresh')

    })

    it('should handle REGISTER_REQUEST', () => {
        expect(
            authReducer({}, {
                type: REGISTER_REQUEST,
            })
        ).toEqual(
            {
                registerRequest: true,
            }
        )
    })

    it('should handle REGISTER_FAILED', () => {
        expect(
            authReducer({}, {
                type: REGISTER_FAILED,
            })
        ).toEqual(
            {
                registerRequest: false,
                registerFailed: true
            }
        )
    })

    it('should handle REGISTER_SUCCESS', () => {
        expect(
            authReducer({}, {
                type: REGISTER_SUCCESS,
                accessToken: 'access',
                refreshToken: 'refresh'
            })
        ).toEqual(
            {
                registerRequest: false,
                registerFailed: false
            }
        )
        expect(localStorage.setItem).toHaveBeenCalledTimes(2)
        expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', 'access')
        expect(localStorage.setItem).toHaveBeenCalledWith('refreshToken', 'refresh')
    })

    it('should handle LOGOUT_REQUEST', () => {
        expect(
            authReducer({}, {
                type: LOGOUT_REQUEST,
            })
        ).toEqual(
            {
                logoutRequest: true
            }
        )
    })

    it('should handle LOGOUT_FAILED', () => {
        expect(
            authReducer({}, {
                type: LOGOUT_FAILED,
            })
        ).toEqual(
            {
                logoutRequest: false,
                logoutFailed: true
            }
        )
    })


    it('should handle LOGOUT_SUCCESS', () => {
        expect(
            authReducer({}, {
                type: LOGOUT_SUCCESS
            })
        ).toEqual(
            {
                logoutRequest: false,
                logoutFailed: false
            }
        )
        expect(localStorage.removeItem).toHaveBeenCalledTimes(2)
        expect(localStorage.removeItem).toHaveBeenCalledWith('accessToken')
        expect(localStorage.removeItem).toHaveBeenCalledWith('refreshToken')
    })


    it('should handle TOKEN_REQUEST', () => {
        expect(
            authReducer({}, {
                type: TOKEN_REQUEST,
            })
        ).toEqual(
            {
                tokenRequest: true,
            }
        )
    })

    it('should handle TOKEN_FAILED', () => {
        expect(
            authReducer({}, {
                type: TOKEN_FAILED,
            })
        ).toEqual(
            {
                tokenRequest: false,
                tokenFailed: true
            }
        )
        expect(localStorage.removeItem).toHaveBeenCalledWith('refreshToken')
    })

    it('should handle TOKEN_SUCCESS', () => {
        expect(
            authReducer({}, {
                type: TOKEN_SUCCESS,
                accessToken: 'access',
                refreshToken: 'refresh'
            })
        ).toEqual(
            {
                tokenRequest: false,
                tokenFailed: false
            }
        )
        expect(localStorage.setItem).toHaveBeenCalledTimes(2)
        expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', 'access')
        expect(localStorage.setItem).toHaveBeenCalledWith('refreshToken', 'refresh')
    })

    it('should handle FORGOT_PASSWORD_REQUEST', () => {
        expect(
            authReducer({}, {
                type: FORGOT_PASSWORD_REQUEST,
            })
        ).toEqual(
            {
                forgotRequest: true,
            }
        )
    })

    it('should handle FORGOT_PASSWORD_FAILED', () => {
        expect(
            authReducer({}, {
                type: FORGOT_PASSWORD_FAILED,
            })
        ).toEqual(
            {
                forgotFailed: true,
                forgotRequest: false
            }
        )
    })

    it('should handle FORGOT_PASSWORD_SUCCESS', () => {
        expect(
            authReducer({}, {
                type: FORGOT_PASSWORD_SUCCESS,
            })
        ).toEqual(
            {
                forgotRequest: false,
                forgotFailed: false,
            }
        )
        expect(localStorage.setItem).toHaveBeenCalledWith('forgotSuccess', 'true')

    })


    it('should handle RESET_PASSWORD_REQUEST', () => {
        expect(
            authReducer({}, {
                type: RESET_PASSWORD_REQUEST,
            })
        ).toEqual(
            {
                resetPasswordRequest: true,
            }
        )
    })

    it('should handle RESET_PASSWORD_FAILED', () => {
        expect(
            authReducer({}, {
                type: RESET_PASSWORD_FAILED,
            })
        ).toEqual(
            {
                resetPasswordFailed: true,
                resetPasswordRequest: false
            }
        )
    })

    it('should handle RESET_PASSWORD_SUCCESS', () => {
        expect(
            authReducer({}, {
                type: RESET_PASSWORD_SUCCESS,
            })
        ).toEqual(
            {
                resetPasswordRequest: false,
                resetPasswordFailed: false,
            }
        )
        expect(localStorage.setItem).toHaveBeenCalledWith('resetSuccess', 'true')
    })

    it('should handle GET_USER_REQUEST', () => {
        expect(
            authReducer({}, {
                type: GET_USER_REQUEST,
            })
        ).toEqual(
            {
                getUserRequest: true,
            }
        )
    })

    it('should handle GET_USER_FAILED', () => {
        expect(
            authReducer({}, {
                type: GET_USER_FAILED,
            })
        ).toEqual(
            {
                getUserFailed: true,
                getUserRequest: false
            }
        )
    })

    it('should handle GET_USER_SUCCESS', () => {
        expect(
            authReducer({}, {
                type: GET_USER_SUCCESS,
                name: 'name',
                email: 'email'
            })
        ).toEqual(
            {
                getUserRequest: false,
                getUserFailed: false,
                name: 'name',
                email: 'email'
            }
        )
    })

    it('should handle UPDATE_USER_REQUEST', () => {
        expect(
            authReducer({}, {
                type: UPDATE_USER_REQUEST,
            })
        ).toEqual(
            {
                updateUserRequest: true,
            }
        )
    })

    it('should handle UPDATE_USER_FAILED', () => {
        expect(
            authReducer({}, {
                type: UPDATE_USER_FAILED,
            })
        ).toEqual(
            {
                updateUserFailed: true,
                updateUserRequest: false
            }
        )
    })

    it('should handle UPDATE_USER_SUCCESS', () => {
        expect(
            authReducer({}, {
                type: UPDATE_USER_SUCCESS,
                name: 'name',
                email: 'email'
            })
        ).toEqual(
            {
                updateUserRequest: false,
                updateUserFailed: false,
                name: 'name',
                email: 'email'
            }
        )
    })
})