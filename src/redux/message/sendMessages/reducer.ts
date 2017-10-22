import actionTypes from './actionTypes'
import {Reducer} from 'redux'

enum SendingStatus {
  start  = 'start',
  sent   = 'sent',
  failed = 'failed'
}

export interface SendMessageState {
  _id: string, //The message id
  rid: string, //The room id - Identify the room the message belongs
  msg: string, //The textual message
  sendingStatus: SendingStatus
}

const defaultSendMessageState = {
  _id          : null, //The message id
  rid          : null, //The room id - Identify the room the message belongs
  msg          : null, //The textual message
  sendingStatus: SendingStatus.start
} as SendMessageState

export interface SendMessagesStates extends Array<SendMessageState> {
}

const defaultSendMessagesState = [] as SendMessagesStates

export const sendMessages: Reducer<SendMessagesStates> = (state = defaultSendMessagesState, action) => {
  switch (action.type) {
    case actionTypes.SEND_MESSAGE_STARTED:
      state[action.payload._id] = {
        ...(state[action.payload._id] ? state[action.payload._id] : defaultSendMessageState),
        _id          : action.payload._id,
        rid          : action.payload.rid,
        msg          : action.payload.msg,
        sendingStatus: SendingStatus.start
      }

      return Object.assign({}, state)
    case actionTypes.SEND_MESSAGE_SUCCEED:
      state[action.payload._id] = {
        ...state[action.payload._id],
        sendingStatus: SendingStatus.sent
      }

      return Object.assign({}, state)
    case actionTypes.SEND_MESSAGE_FAILED:
      state[action.payload._id] = {
        ...state[action.payload._id],
        sendingStatus: SendingStatus.failed
      }

      return Object.assign({}, state)

    case actionTypes.DELETE_SENT_MESSAGE_SUCCEED:
      delete state[action.payload._id]

      return Object.assign({}, state)
    default:
      return state
  }
}