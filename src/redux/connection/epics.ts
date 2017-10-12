import {Observable} from 'rxjs'
import actionTypes from './actionTypes'
import {connectionEstablished, connectionError} from './actions'

// Epic to Initialize the Connection with the Server.
export const initConnection$ = (action$, store, {bancoRealtimeAPI}) => {
  return action$.ofType(actionTypes.INIT_CONNECTION)
    .mergeMap(action => {
      // console.log('initConnection action ', action)
      // console.log('initConnection store ', store)
      // console.log('bancoRealtimeAPI ', bancoRealtimeAPI)

      return bancoRealtimeAPI.connectToServer()
    })
    .map(msg => {
      console.log('msg', msg)
      // setTimeout(()=>{
      //   console.log('disconnect');
      //   bancoRealtimeAPI.disconnect()
      // }, 30000)

      // const now = {'$date': new Date().getTime()}
      //
      bancoRealtimeAPI.callMethod('rooms/getAll')
      // bancoRealtimeAPI.login('rustykey4@naver.com', 'wlsgh82')
      // bancoRealtimeAPI.callMethod('loadHistory', 'GENERAL', null, 50, now)
      //
      // bancoRealtimeAPI.getStreamRoomMessages('GENERAL').subscribe((msg)=>{
      //   console.log(msg.fields.args[0].msg)
      // }, ()=>{
      //
      // })

      return connectionEstablished({session: msg.session})
    })
}
