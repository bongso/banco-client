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

export interface SubscriptionState {
  t: string,//The room type (the same used on the [room object][1])
  ts: DateTimeState | null,//Timestamp the room was created at, so this should equal the room’s ts field
  ls: DateTimeState | null,//Last seen timestamp (The last time the user has seen a message in the room)
  name: string,//The room name
  rid: string,//The room id
  u: UserState | null,//An simple user object with its id and username
  open: boolean,//Whether the room the subscription is for has been opened or not (defaults to false on direct messages). This is used in the clients to determine whether the user can see this subscription in their list, since you can hide rooms from being visible without leaving them.
  alert: boolean, //Whether there is an alert to be displayed to the user
  roles: any,//(Optional) The collection of roles the user belongs to (at least one role-name will be present)
  unread: number,//The total of unread messages
  _updatedAt: DateTimeState | null,//Timestamp of when the subscription record was updated
  _id: string//The subscription id
}

export interface OpeningRoomState {
  room: RoomState & SubscriptionState,
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