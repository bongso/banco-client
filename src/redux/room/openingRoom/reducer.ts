import actionTypes from './actionTypes'
import {Reducer} from 'redux'

export interface UserState {
  _id: string, //user-id
  username: string //username
}

export interface DateTimeState {
  $date: number
}

export interface RoomState {
  _id: string, //The room id
  t: string, //The room type (in this case c)
  name: string | null, //The room name
  u: UserState | null, //The room creator (it may return a null user)
  topic: string | null, //(Optional) The room topic
  muted: any | null, // (Optional) A collection of muted users by its username
  jitsiTimeout: DateTimeState | null, // (Optional) (?)
  ro: boolean | null //Flags if the room is read-only
}

export interface OpeningRoomState {
  room: RoomState | null,
  loading: boolean,
  error: string | null
}

const defaultOpeningRoomState = {
  room   : null,
  loading: false,
  error  : null
} as OpeningRoomState

export const openingRoom: Reducer<OpeningRoomState> = (state = defaultOpeningRoomState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_ROOM_STARTED:
      return {
        ...state,
        loading: true,
        room   : null,
        error  : null
      }
    case actionTypes.OPEN_ROOM_SUCCEED:
      return {
        ...state,
        loading: false,
        room   : action.payload.room
      }
    case actionTypes.OPEN_ROOM_FAILED:
      return {
        ...state,
        loading: false,
        error  : action.payload.error
      }
    default:
      return state
  }
}