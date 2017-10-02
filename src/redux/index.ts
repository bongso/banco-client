import {bindActionCreators, combineReducers} from 'redux'
// import { createEpicMiddleware, combineEpics } from 'redux-observable'
import {PersistState, reducer as persist} from './persist/index'
import {loggedIn, logout, reducer as system, SystemState} from './system/index'
import {reducer as router, replaceUrl} from './router/index'
import {bookmarkNews, getNews, NewsState, reducer as news, unBookmarkNews} from './news/index'
import {connectionState, reducer as connection} from './connection/reducer'
import {initConnection} from './connection/actions'
// import {initConnection} from './connection/epics'
// import BancoRealtimeAPI from '../lib/banco-realtime-api'
//
// const BANCO_URL: string = 'ws://localhost:3000/websocket'
// const bancoRealtimeAPI = new BancoRealtimeAPI(BANCO_URL)
// bancoRealtimeAPI.onError(err => console.log('Banco API Error', err))
// bancoRealtimeAPI.onCompletion(() => console.log('Banco API Complete'))
// bancoRealtimeAPI.onMessage(msg => console.log(msg))
// bancoRealtimeAPI.keepAlive();
//
// const epics = combineEpics(initConnection)
//
// const epicMiddleware = createEpicMiddleware(epics, {
//   dependencies: {
//     bancoRealtimeAPI: bancoRealtimeAPI
//   }
// });
//
export interface RootState {
  persist: PersistState
  system: SystemState
  news: NewsState,
  connection: connectionState
}

export const reducer = combineReducers<RootState>({
  persist,
  system,
  router,
  news,
  connection
})

export function actions(dispatch): DispatchProps {
  const actionCreators = {
    loggedIn,
    logout,

    getNews,
    bookmarkNews,
    unBookmarkNews,

    replaceUrl,

    initConnection
  }
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

interface ActionCreators {
  loggedIn: typeof loggedIn
  logout: typeof logout
  getNews: typeof getNews
  bookmarkNews: typeof bookmarkNews
  unBookmarkNews: typeof unBookmarkNews
  replaceUrl: typeof replaceUrl
  initConnection: typeof initConnection
}

export interface DispatchProps {
  actions: ActionCreators
}
