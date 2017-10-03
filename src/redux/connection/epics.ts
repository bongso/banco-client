import {Observable} from 'rxjs'
import actionTypes from './actionTypes'
import {connectionEstablished} from './actions'

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
      return connectionEstablished({server: bancoRealtimeAPI.url})
    })
}
