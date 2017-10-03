import {applyMiddleware, compose, createStore} from 'redux'
import {reducer, RootState} from './redux'
import {Store} from 'react-redux'
import {DEV} from './constants/env'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {persistStore, autoRehydrate} from 'redux-persist'
import {createEpicMiddleware, combineEpics} from 'redux-observable'
import {initializeNa} from './redux/log/index'

import {Observable} from 'rxjs'
import {WebSocketSubject} from 'rxjs/observable/dom/WebSocketSubject'

import * as ws from 'websocket'

import {initConnection$} from './redux/connection/epics'
import {initConnection} from './redux/connection/actions'

import BancoRealtimeAPI from './lib/banco-realtime-api'

const BANCO_URL: string = 'ws://localhost:3000/websocket'

const socket = new WebSocketSubject({
  url          : BANCO_URL,
  WebSocketCtor: ws.w3cwebsocket
})

let bancoRealtimeAPI = new BancoRealtimeAPI(socket)

bancoRealtimeAPI.onError(err => console.log('Banco API Error', err))
bancoRealtimeAPI.onCompletion(() => console.log('Banco API Complete'))
bancoRealtimeAPI.onMessage(msg => console.log('message',msg))
bancoRealtimeAPI.keepAlive()

const epics = combineEpics(initConnection$)

const epicMiddleware = createEpicMiddleware(epics, {
  dependencies: {
    bancoRealtimeAPI: bancoRealtimeAPI
  }
})

let store

export const getStore = (state, isServer?): Store<RootState> => {
  if (isServer && typeof window === 'undefined') {
    return createStore<RootState>(
      reducer,
      state,
      applyMiddleware(thunk, epicMiddleware)
    )
  } else {
    const composeEnhancers = DEV && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    if (!store) {
      const mw = [thunk, epicMiddleware]
      if (!DEV) {
        if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
          window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {
          }
        }
      } else {
        mw.push(createLogger({
          predicate: (getState, action) => !/^@@/.test(action.type),
          collapsed: true
        }))
      }

      store = createStore<RootState>(
        reducer,
        state,
        composeEnhancers(applyMiddleware(...mw), autoRehydrate())
      )

      store.dispatch(initializeNa())

      const whitelist = ['persist']

      persistStore(store, {whitelist}, _ => {
        // console.log(`define whitelist: ${whitelist.join(', ')}`)
        store.dispatch(initConnection())
      })
    }

    return store
  }
}
