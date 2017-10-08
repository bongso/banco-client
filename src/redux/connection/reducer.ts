import actionTypes from './actionTypes'
import {Reducer} from 'redux'

export interface ConnectionState {
  loading: boolean,
  isConnected: boolean,
  session: string | null,
  error: any
}

const defaultConnectionState = {
  loading    : false,
  isConnected: false,
  session   : null,
  error      : null
} as ConnectionState

export const connection: Reducer<ConnectionState> = (state = defaultConnectionState, action) => {
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