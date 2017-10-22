import {bindActionCreators, combineReducers} from 'redux'
import {reducer as router, replaceUrl} from './router/index'
import {StorageState, storage} from './storage/reducer'
import {ConnectionState, connection} from './connection/reducer'
import {AuthState, auth} from './auth/reducer'
import {RegisteringUserState, registeringUser} from './auth/register/reducer'
import {ChatsStates, chats} from './chats/reducer'
import {SendMessagesStates, sendMessages} from './message/sendMessages/reducer'
import {RoomsState, rooms} from './room/rooms/reducer'
import {SubscriptionsState, subscriptions} from './room/subscriptions/reducer'
import {CreatingPrivateRoomState, creatingPrivateRoom} from './room/creatingPrivateRoom/reducer'
import {LeavingRoomState, leavingRoom} from './room/leavingRoom/reducer'
import {OpeningRoomState, openingRoom} from './room/openingRoom/reducer'

export interface RootState {
  storage: StorageState
  connection: ConnectionState,
  auth: AuthState,
  registeringUser: RegisteringUserState,
  chats: ChatsStates,
  sendMessages: SendMessagesStates,
  rooms: RoomsState,
  subscriptions: SubscriptionsState,
  creatingPrivateRoom: CreatingPrivateRoomState,
  leavingRoom: LeavingRoomState,
  openingRoom: OpeningRoomState,
}

export const reducer = combineReducers<RootState>({
  storage,
  router,
  connection,
  auth,
  registeringUser,
  chats,
  sendMessages,
  rooms,
  subscriptions,
  creatingPrivateRoom,
  leavingRoom,
  openingRoom
})