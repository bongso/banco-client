import actionTypes from './actionTypes'
import {Reducer} from 'redux'

export interface connectionState {
  loading: boolean,
  isConnected: boolean,
  server: any
}

const defaultState = {
  loading    : false,
  isConnected: false,
  server     : null
} as connectionState

export const reducer: Reducer<connectionState> = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.INIT_CONNECTION:
      return {
        ...state,
        loading: true
      }
    case actionTypes.CONNECTION_ESTABLISHED:
      state = {
        ...state,
        isConnected: true,
        server     : action.payload.server
      }
      return state
    case actionTypes.CLOSE_CONNECTION:
      state = {
        ...state,
        isConnected: false,
      }
      return state
    default:
      return state
  }
}