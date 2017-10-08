import {bindActionCreators, combineReducers} from 'redux'
import {PersistState, reducer as persist} from './persist/index'
import {reducer as router, replaceUrl} from './router/index'
import {ConnectionState, connection} from './connection/reducer'
import {ChatsStates, chats} from './chats/reducer'

export interface RootState {
  persist: PersistState
  connection: ConnectionState,
  chats: ChatsStates
}

export const reducer = combineReducers<RootState>({
  persist,
  router,
  connection,
  chats
})