import actionTypes from './actionTypes'

export const createPrivateRoom = (channelName: string, invitingUserNames: string[] = []) => {
  return (dispatch, getState, {bancoRealtimeAPI, bancoRestAPI}) => {
    return new Promise((resolve, reject) => {
      dispatch(createPrivateRoomStarted())

      //load room history
      bancoRealtimeAPI.callMethod('createPrivateGroup', channelName, invitingUserNames)
        .subscribe((msg) => {
          // console.log(response)
          dispatch(createPrivateRoomSucceed({
            roomId: msg.result.rid
          }))

          return resolve(msg)
        }, (err) => {
          //TODO::display error message
          console.log(err)
          dispatch(createPrivateRoomFailed({
            error: err
          }))

          return reject(err)
        })
    })
  }
}

const createPrivateRoomStarted = () => {
  return {
    type: actionTypes.CREATE_PRIVATE_ROOM_STARTED,
  }
}

const createPrivateRoomSucceed = (payload: any) => {
  return {
    type   : actionTypes.CREATE_PRIVATE_ROOM_SUCCEED,
    payload: payload
  }
}

const createPrivateRoomFailed = (payload: any) => {
  return {
    type   : actionTypes.CREATE_PRIVATE_ROOM_FAILED,
    payload: payload
  }
}