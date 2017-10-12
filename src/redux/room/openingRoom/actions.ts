import actionTypes from './actionTypes'
import {RoomState} from './reducer'
export const openRoom = (room: RoomState) => {
  return (dispatch, getState, bancoRealtimeAPI) => {
    return new Promise((resolve, reject) => {
      dispatch(openRoomStarted())

      //load room history
      bancoRealtimeAPI.callMethod('openRoom', room._id)
        .subscribe((msg) => {
          // console.log(response)
          dispatch(openRoomSucceed({
            room: room
          }))

          return resolve(msg)
        }, (err) => {
          //TODO::display error message
          console.log(err)
          dispatch(openRoomFailed({
            error: err
          }))

          return reject(err)
        })
    })
  }
}

const openRoomStarted = () => {
  return {
    type: actionTypes.OPEN_ROOM_STARTED,
  }
}

const openRoomSucceed = (payload: any) => {
  return {
    type   : actionTypes.OPEN_ROOM_SUCCEED,
    payload: payload
  }
}

const openRoomFailed = (payload: any) => {
  return {
    type   : actionTypes.OPEN_ROOM_FAILED,
    payload: payload
  }
}