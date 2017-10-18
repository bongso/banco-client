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

export interface RoomsState {
  directChatRooms: RoomState[],
  chatRooms: RoomState[],
  privateChatRooms: RoomState[],
  totalRooms: RoomState[],
  loading: boolean,
  error: string | null
}

const defaultRoomsState = {
  directChatRooms : [],
  chatRooms       : [],
  privateChatRooms: [],
  totalRooms      : [],
  loading         : false,
  error           : null
} as RoomsState

export const rooms: Reducer<RoomsState> = (state = defaultRoomsState, action) => {
  switch (action.type) {
    case actionTypes.GET_ROOMS_STARTED:
      return {
        ...state,
        loading: true
      }
    case actionTypes.GET_ROOMS_SUCCEED:
      return {
        ...state,
        loading         : false,
        directChatRooms : action.payload.rooms.filter((x) => x.t == 'd'),
        chatRooms       : action.payload.rooms.filter((x) => x.t == 'c'),
        privateChatRooms: action.payload.rooms.filter((x) => x.t == 'p'),
        totalRooms      : action.payload.rooms
      }
    case actionTypes.GET_ROOMS_FAILED:
      return {
        ...state,
        loading: false,
        error  : action.payload.error
      }
    // case actionTypes.CREATE_PRIVATE_ROOM_IN_LIST_SUCCEED:
    //   return {
    //     ...state,
    //     directChatRooms : [...state.directChatRooms, ...action.payload.rooms.filter((x) => x.t == 'd')],
    //     chatRooms       : [...state.chatRooms, ...action.payload.rooms.filter((x) => x.t == 'c')],
    //     privateChatRooms: [...state.privateChatRooms, ...action.payload.rooms.filter((x) => x.t == 'p')],
    //     totalRooms      : [...state.totalRooms, ...action.payload.rooms]
    //   }
    // case actionTypes.LEAVE_ROOM_IN_LIST_SUCCEED:
    //   return {
    //     ...state,
    //     directChatRooms : state.directChatRooms.filter((x) => x._id == action.payload.roomId),
    //     chatRooms       : state.chatRooms.filter((x) => x._id == action.payload.roomId),
    //     privateChatRooms: state.privateChatRooms.filter((x) => x._id == action.payload.roomId),
    //     totalRooms      : state.privateChatRooms.filter((x) => x._id == action.payload.roomId),
    //   }
    default:
      return state
  }
}