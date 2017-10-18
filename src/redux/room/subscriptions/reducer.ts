import actionTypes from './actionTypes'
import {Reducer} from 'redux'

export interface UserState {
  _id: string, //user-id
  username: string //username
}

export interface DateTimeState {
  $date: number
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

export interface SubscriptionsState {
  directChatRooms: SubscriptionState[],
  chatRooms: SubscriptionState[],
  privateChatRooms: SubscriptionState[],
  totalRooms: SubscriptionState[],
  loading: boolean,
  error: string | null
}

const defaultSubscriptionsState = {
  directChatRooms : [],
  chatRooms       : [],
  privateChatRooms: [],
  totalRooms      : [],
  loading         : false,
  error           : null
} as SubscriptionsState

export const subscriptions: Reducer<SubscriptionsState> = (state = defaultSubscriptionsState, action) => {
  switch (action.type) {
    case actionTypes.GET_SUBSCRIPTIONS_STARTED:
      return {
        ...state,
        loading: true
      }
    case actionTypes.GET_SUBSCRIPTIONS_SUCCEED:
      return {
        ...state,
        loading         : false,
        directChatRooms : action.payload.rooms.filter((x) => x.t == 'd'),
        chatRooms       : action.payload.rooms.filter((x) => x.t == 'c'),
        privateChatRooms: action.payload.rooms.filter((x) => x.t == 'p'),
        totalRooms      : action.payload.rooms
      }
    case actionTypes.GET_SUBSCRIPTIONS_FAILED:
      return {
        ...state,
        loading: false,
        error  : action.payload.error
      }
    default:
      return state
  }
}