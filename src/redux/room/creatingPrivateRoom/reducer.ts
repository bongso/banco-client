import actionTypes from './actionTypes'
import {Reducer} from 'redux'

export interface CreatingPrivateRoomState {
  roomId: string | null,
  loading: boolean,
  error: string | null
}

const defaultCreatingPrivateRoomState = {
  roomId   : null,
  loading: false,
  error  : null
} as CreatingPrivateRoomState

export const creatingPrivateRoom: Reducer<CreatingPrivateRoomState> = (state = defaultCreatingPrivateRoomState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_PRIVATE_ROOM_STARTED:
      return {
        ...state,
        loading: true,
        roomId   : null,
        error  : null
      }
    case actionTypes.CREATE_PRIVATE_ROOM_SUCCEED:
      return {
        ...state,
        loading: false,
        roomId   : action.payload.roomId
      }
    case actionTypes.CREATE_PRIVATE_ROOM_FAILED:
      return {
        ...state,
        loading: false,
        error  : action.payload.error
      }
    default:
      return state
  }
}