import {applyMiddleware, compose, createStore} from 'redux'
import {reducer, RootState} from './redux'
import {Store} from 'react-redux'
import {DEV} from './constants/env'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {persistStore, autoRehydrate} from 'redux-persist'
import {initializeNa} from './redux/log/index'

import BancoRealtimeAPI from './lib/banco-realtime-api'
import BancoRestAPI from './lib/banco-rest-api'

const BANCO_REALTIME_API_URL: string = 'ws://localhost:3000/websocket'
const BANCO_REST_API_URL: string = 'http://localhost:3000'

const bancoRealtimeAPI = new BancoRealtimeAPI(BANCO_REALTIME_API_URL)
bancoRealtimeAPI.onError((err) => console.log('Banco API Error', err))
bancoRealtimeAPI.onCompletion(() => console.log('Banco API Complete'))
bancoRealtimeAPI.onMessage((msg) => console.log('message', msg))
bancoRealtimeAPI.keepAlive()

const bancoRestAPI = new BancoRestAPI(BANCO_REST_API_URL)


let store

export const getStore = (state, isServer?): Store<RootState> => {
  if (isServer && typeof window === 'undefined') {
    return createStore<RootState>(
      reducer,
      state,
      applyMiddleware(thunk.withExtraArgument({bancoRealtimeAPI, bancoRestAPI}))
    )
  } else {
    const composeEnhancers = DEV && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    if (!store) {
      const mw = [thunk.withExtraArgument({bancoRealtimeAPI, bancoRestAPI})]
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

      const whitelist = ['auth']

      persistStore(store, {whitelist}, _ => {
        // console.log(`define whitelist: ${whitelist.join(', ')}`)
        // store.dispatch(initConnection())

        console.log('store',store)
        const authState = store.getState().auth
        if (authState.isLoggedIn) {
          bancoRestAPI.setToken(authState.tokenInfo.token)
          bancoRestAPI.setUserId(authState.tokenInfo.id)
        }
      })
    }

    return store
  }
}
