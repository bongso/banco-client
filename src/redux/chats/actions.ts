import actionTypes from './actionTypes'
import {Observable} from 'rxjs'

export const loadRoomHistory = (roomId: string = 'GENERAL') => {
  return (dispatch, getState, bancoRealtimeAPI) => {
    const now = {'$date': new Date().getTime()}

    dispatch(loadRoomHistoryStarted({roomId: roomId}))

    bancoRealtimeAPI.callMethod('loadHistory', 'GENERAL', null, 50, now)
      .subscribe((response) => {
        console.log(response)
        dispatch(loadRoomHistorySucceed({
          roomId         : roomId,
          messages       : response && response.result && response.result.messages,
          unreadNotLoaded: response && response.result && response.result.unreadNotLoaded
        }))
      }, (err) => {
        console.log(err)
        dispatch(loadRoomHistoryFailed({error: err}))
      })
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