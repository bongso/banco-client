import actionTypes from './actionTypes'
import {Reducer} from 'redux'

export interface LeavingRoomState {
  roomId: string | null,
  loading: boolean,
  error: string | null
}

const defaultLeavingRoomState = {
  roomId   : null,
  loading: false,
  error  : null
} as LeavingRoomState

export const leavingRoom: Reducer<LeavingRoomState> = (state = defaultLeavingRoomState, action) => {
  switch (action.type) {
    case actionTypes.LEAVE_ROOM_STARTED:
      return {
        ...state,
        loading: true,
        roomId   : null,
        error  : null
      }
    case actionTypes.LEAVE_ROOM_SUCCEED:
      return {
        ...state,
        loading: false,
        roomId   : action.payload.roomId
      }
    case actionTypes.LEAVE_ROOM_FAILED:
      return {
        ...state,
        loading: false,
        error  : action.payload.error
      }
    default:
      return state
  }
}