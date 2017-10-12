import actionTypes from './actionTypes'
export const leaveRoom = (roomId: string) => {
  return (dispatch, getState, bancoRealtimeAPI) => {
    return new Promise((resolve, reject) => {
      dispatch(leaveRoomStarted())

      //load room history
      bancoRealtimeAPI.callMethod('leaveRoom', roomId)
        .subscribe((msg) => {
          // console.log(response)
          dispatch(leaveRoomSucceed({
            roomId: roomId
          }))

          return resolve(msg)
        }, (err) => {
          //TODO::display error message
          console.log(err)
          dispatch(leaveRoomFailed({
            error: err
          }))

          return reject(err)
        })
    })
  }
}

const leaveRoomStarted = () => {
  return {
    type: actionTypes.LEAVE_ROOM_STARTED,
  }
}

const leaveRoomSucceed = (payload: any) => {
  return {
    type   : actionTypes.LEAVE_ROOM_SUCCEED,
    payload: payload
  }
}

const leaveRoomFailed = (payload: any) => {
  return {
    type   : actionTypes.LEAVE_ROOM_FAILED,
    payload: payload
  }
}