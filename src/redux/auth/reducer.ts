import actionTypes from './actionTypes'
import {Reducer} from 'redux'

export interface DateTimeState {
  $date: number
}

export interface UserState {
  _id: string, //user-id
  username: string //username
}

export interface AuthTokenState {
  id: string,
  token: string,
  tokenExpires: DateTimeState
}

export interface AuthState {
  tokenInfo: AuthTokenState | null,
  user: UserState | null,
  isLoggedIn: boolean,
  loading: boolean,
  error: string | null
}

const defaultAuthState = {
  tokenInfo : null,
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
        loading: true,
        error  : null
      }
    case actionTypes.LOGIN_USER_SUCCEED:
      let newState = {
        ...state,
        loading   : false,
        isLoggedIn: true,
      }

      if (action.payload.tokenInfo) {
        newState.tokenInfo = action.payload.tokenInfo
      }

      if (action.payload.user) {
        newState.user = action.payload.user
      }

      return newState
    case actionTypes.LOGIN_USER_FAILED:
      return {
        ...state,
        loading   : false,
        isLoggedIn: false,
        tokenInfo : null,
        user      : null,
        error     : action.payload.error
      }
    case actionTypes.LOGOUT_USER_STARTED:
      return {
        ...state,
        loading: true,
        error  : null
      }
    case actionTypes.LOGOUT_USER_SUCCEED:
      return {
        ...state,
        loading   : false,
        isLoggedIn: false,
        tokenInfo : null,
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