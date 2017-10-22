import {v1 as uuid} from 'uuid'
import actionTypes from './actionTypes'

export const sendMessage = (roomId: string, message: string) => {
  return (dispatch, getState, {bancoRealtimeAPI, bancoRestAPI}) => {
    return new Promise((resolve, reject) => {
      const messageId = uuid()

      dispatch(sendMessageStarted({
        _id: messageId,
        rid: roomId,
        msg: message
      }))

      //load room history
      bancoRealtimeAPI.sendMessage(messageId, roomId, message)
        .subscribe((msg) => {
          console.log(msg)
          
          dispatch(sendMessageSucceed({
            _id: messageId,
          }))
          
          dispatch(deleteSentMessageSucceed({
            _id: messageId,
          }))

          return resolve(msg)
        }, (err) => {
          //TODO::display error message
          console.log(err)
          dispatch(sendMessageFailed({
            _id: messageId,
          }))

          return reject(err)
        })
    })
  }
}

export const resendMessage = () => {
  
}

export const deleteSentMessage = (messageId: string) => {
  return (dispatch, getState, {bancoRealtimeAPI, bancoRestAPI}) => {
    dispatch(deleteSentMessageSucceed({
      _id: messageId,
    }))
  }
}

const sendMessageStarted = (payload: any) => {
  return {
    type   : actionTypes.SEND_MESSAGE_STARTED,
    payload: payload
  }
}

const sendMessageSucceed = (payload: any) => {
  return {
    type   : actionTypes.SEND_MESSAGE_SUCCEED,
    payload: payload
  }
}

const sendMessageFailed = (payload: any) => {
  return {
    type   : actionTypes.SEND_MESSAGE_FAILED,
    payload: payload
  }
}

const deleteSentMessageSucceed = (payload: any) => {
  return {
    type   : actionTypes.DELETE_SENT_MESSAGE_SUCCEED,
    payload: payload
  }
}