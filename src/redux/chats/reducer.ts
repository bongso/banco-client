import actionTypes from './actionTypes'
import {Reducer} from 'redux'

export interface UserState {
  _id: string, //user-id
  username: string //username
}

export interface DateTimeState {
  $date: number
}

export interface MessageState {
  _id: string, //The message id
  rid: string, //The room id - Identify the room the message belongs
  msg: string, //The textual message
  ts: any,// The message time stamp (date of creation on client)
  u: UserState,// The user that sent the message
  _updatedAt: DateTimeState | null,// The time stamp when the message got saved on the server
  editedAt: DateTimeState | null,// (Optional) The time stamp of when the message was edited
  editedBy: UserState | null,//(Optional) The user that editted the message
  urls: any | null,//(Optional) A collection of URLs metadata. Available when the message contains at least one URL
  attachments: any | null,//(Optional) A collection of attachment objects, available only when the message has at least one attachment
  alias: any | null,//(Optional) A way to display the message is “sent” from someone else other than the user who sent the message
  avatar: any | null,//(Optional) A url to an image, that is accessible to anyone, to display as the avatar instead of the message user’s account avatar
  groupable: any | null,//(Optional) Boolean that states whether or not this message should be grouped together with other messages from the same user
  parseUrls: any | null//(Optional) Whether Rocket.Chat should try and parse the urls or not
}

export interface ChatState {
  roomId: string | null
  messages: MessageState[],
  loading: boolean,
  error: string | null
}

const defaultChatState = {
  roomId  : null,
  messages: [],
  loading : false,
  error   : null
} as ChatState

export interface ChatsStates extends Array<ChatState> {
}

const defaultChatsStates = [] as ChatsStates

export const chats: Reducer<ChatsStates> = (state = defaultChatsStates, action) => {
  switch (action.type) {
    case actionTypes.LOAD_ROOM_HISTORY_STARTED:
      state[action.payload.roomId] = {
        ...(state[action.payload.roomId] ? state[action.payload.roomId] : defaultChatState),
        loading: true
      }

      return Object.assign({}, state)
    case actionTypes.LOAD_ROOM_HISTORY_SUCCEED:
      state[action.payload.roomId] = {
        ...state[action.payload.roomId],
        loading : false,
        roomId  : action.payload.roomId,
        messages: action.payload.messages
      }

      return Object.assign({}, state)
    case actionTypes.LOAD_ROOM_HISTORY_FAILED:
      state[action.payload.roomId] = {
        ...state[action.payload.roomId],
        loading: false,
        error  : action.payload.error
      }

      return Object.assign({}, state)
    default:
      return state
  }
}