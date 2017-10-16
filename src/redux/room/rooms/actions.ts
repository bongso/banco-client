import actionTypes from './actionTypes'

export const getRooms = () => {
  return (dispatch, getState, bancoRealtimeAPI) => {
    return new Promise((resolve, reject) => {
      const roomsState = getState().rooms
      if (roomsState.totalRooms.length > 0) {
        return resolve()
      }

      dispatch(getRoomsStarted())

      //load room history
      bancoRealtimeAPI.callMethod('rooms/getAll')
        .subscribe((msg) => {
          // console.log(response)
          dispatch(getRoomsSucceed({
            rooms: msg && msg.result
          }))

          return resolve(msg)
        }, (err) => {
          //TODO::display error message
          console.log(err)
          dispatch(getRoomsFailed({
            error: err
          }))

          return reject(err)
        })
    })
  }
}

const getRoomsStarted = () => {
  return {
    type: actionTypes.GET_ROOMS_STARTED,
  }
}

const getRoomsSucceed = (payload: any) => {
  return {
    type   : actionTypes.GET_ROOMS_SUCCEED,
    payload: payload
  }
}

const getRoomsFailed = (payload: any) => {
  return {
    type   : actionTypes.GET_ROOMS_FAILED,
    payload: payload
  }
}

export const createPrivateRoomInListSucceed = (payload: any) => {
  return {
    type   : actionTypes.CREATE_PRIVATE_ROOM_IN_LIST_SUCCEED,
    payload: payload
  }
}

export const leaveRoomInListSucceed = (payload: any) => {
  return {
    type   : actionTypes.LEAVE_ROOM_IN_LIST_SUCCEED,
    payload: payload
  }
}