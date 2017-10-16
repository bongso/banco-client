import actionTypes from './actionTypes'
import {Reducer} from 'redux'

export interface DateTimeState {
  $date: number
}

export interface AuthUserState {
  id: string, //user-id
  token: string, //username
  tokenExpires: DateTimeState
}

export interface AuthState {
  user: AuthUserState | null,
  isLoggedIn: boolean,
  loading: boolean,
  error: string | null
}

const defaultAuthState = {
  user      : null,
  isLoggedIn: false,
  loading   : false,
  error     : null
} as AuthState

export const auth: Reducer<AuthState> = (state = defaultAuthState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER_STARTED:
      return {
        ...state,
        loading: true
      }
    case actionTypes.LOGIN_USER_SUCCEED:
      return {
        ...state,
        loading   : false,
        isLoggedIn: true,
        user      : action.payload.user
      }
    case actionTypes.LOGIN_USER_FAILED:
      return {
        ...state,
        loading   : false,
        isLoggedIn: false,
        error     : action.payload.error
      }
    case actionTypes.LOGOUT_USER_STARTED:
      return {
        ...state,
        loading: true
      }
    case actionTypes.LOGOUT_USER_SUCCEED:
      return {
        ...state,
        loading   : false,
        isLoggedIn: false,
        user      : null
      }
    case actionTypes.LOGOUT_USER_FAILED:
      return {
        ...state,
        loading: false,
        error  : action.payload.error
      }
    default:
      return state
  }
}