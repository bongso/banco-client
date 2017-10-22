import actionTypes from './actionTypes'
import {Reducer} from 'redux'

export interface RegisteringUserState {
  loading: boolean,
  userId: string | null,
  error: string | null
}

const defaultRegisteringUserState = {
  loading: false,
  userId : null,
  error  : null
} as RegisteringUserState

export const registeringUser: Reducer<RegisteringUserState> = (state = defaultRegisteringUserState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_USER_STARTED:
      return {
        ...state,
        loading: true,
        error  : null
      }
    case actionTypes.REGISTER_USER_SUCCEED:
      return {
        ...state,
        userId : action.payload.userId,
        loading: false,
      }
    case actionTypes.REGISTER_USER_FAILED:
      return {
        ...state,
        loading: false,
        error  : action.payload.error
      }
    default:
      return state
  }
}