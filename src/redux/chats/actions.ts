import actionTypes from './actionTypes'

export const loadRoomHistory = (roomId: string) => {
  return (dispatch, getState, bancoRealtimeAPI) => {
    return new Promise((resolve, reject) => {
      const now = {'$date': new Date().getTime()}

      dispatch(loadRoomHistoryStarted({roomId: roomId}))

      //load room history
      bancoRealtimeAPI.callMethod('loadHistory', roomId, null, 50, now)
        .subscribe((msg) => {
          // console.log(response)
          dispatch(loadRoomHistorySucceed({
            roomId         : roomId,
            messages       : msg && msg.result && msg.result.messages,
            unreadNotLoaded: msg && msg.result && msg.result.unreadNotLoaded
          }))

          return resolve(msg)
        }, (err) => {
          //TODO::display error message
          console.log(err)
          dispatch(loadRoomHistoryFailed({
            roomId: roomId,
            error : err
          }))

          return reject(err)
        })
    })
  }
}

export const subscribeRoomMessages = (roomId: string): any => {
  return (dispatch, getState, bancoRealtimeAPI) => {

    //subscribe messages on room
    const streamRoomMessageInstance = bancoRealtimeAPI.getStreamRoomMessages(roomId).subscribe((msg) => {
      dispatch(saveRoomMessagesSucceed({
        roomId  : msg.fields.eventName,
        messages: msg.fields.args,
      }))
    }, (err) => {
      //TODO::display error message
      console.log(err)
      dispatch(saveRoomMessagesFailed({
        roomId: roomId,
        error : err
      }))
    })

    dispatch(subscribeRoomSucceed({
      roomId: roomId,
    }))

    return streamRoomMessageInstance
  }
}

export const unsubscribeRoomMessages = (streamRoomMessageInstance: any, roomId: string) => {
  return (dispatch, getState, bancoRealtimeAPI) => {
    streamRoomMessageInstance.unsubscribe()
    dispatch(unsubscribeRoomSucceed({
      roomId: roomId,
    }))
  }
}

const loadRoomHistoryStarted = (payload: any) => {
  return {
    type   : actionTypes.LOAD_ROOM_HISTORY_STARTED,
    payload: payload
  }
}

const loadRoomHistorySucceed = (payload: any) => {
  return {
    type   : actionTypes.LOAD_ROOM_HISTORY_SUCCEED,
    payload: payload
  }
}

const loadRoomHistoryFailed = (payload: any) => {
  return {
    type   : actionTypes.LOAD_ROOM_HISTORY_FAILED,
    payload: payload
  }
}

const subscribeRoomSucceed = (payload: any) => {
  return {
    type   : actionTypes.SUBSCRIBE_ROOM_SUCCEED,
    payload: payload
  }
}

const unsubscribeRoomSucceed = (payload: any) => {
  return {
    type   : actionTypes.UNSUBSCRIBE_ROOM_SUCCEED,
    payload: payload
  }
}

const saveRoomMessagesSucceed = (payload: any) => {
  return {
    type   : actionTypes.SAVE_ROOM_MESSAGES_SUCCEED,
    payload: payload
  }
}

const saveRoomMessagesFailed = (payload: any) => {
  return {
    type   : actionTypes.SAVE_ROOM_MESSAGES_FAILED,
    payload: payload
  }
}