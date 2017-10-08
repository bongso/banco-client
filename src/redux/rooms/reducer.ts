import actionTypes from './actionTypes'
import {Reducer} from 'redux'

export interface connectionState {
  loading: boolean,
  isConnected: boolean,
  session: string | null,
  error: string
}

const defaultState = {
  loading    : false,
  isConnected: false,
  session   : null,
  error      : null
} as connectionState

export const connection: Reducer<connectionState> = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.INIT_CONNECTION:
      return {
        ...state,
        loading: true
      }
    case actionTypes.CONNECTION_ESTABLISHED:
      return {
        ...state,
        loading    : false,
        isConnected: true,
        session   : action.payload.session
      }
    case actionTypes.CLOSE_CONNECTION:
      return {
        ...state,
        loading    : false,
        isConnected: false,
      }
    case actionTypes.CONNECTION_ERROR:
      return {
        ...state,
        loading    : false,
        isConnected: false,
        server     : null,
        error      : action.payload.error
      }
    default:
      return state
  }
}