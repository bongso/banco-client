import {bindActionCreators, combineReducers} from 'redux'
import {reducer as router, replaceUrl} from './router/index'
import {StorageState, storage} from './storage/reducer'
import {ConnectionState, connection} from './connection/reducer'
import {AuthState, auth} from './auth/reducer'
import {ChatsStates, chats} from './chats/reducer'
import {RoomsState, rooms} from './room/rooms/reducer'
import {CreatingPrivateRoomState, creatingPrivateRoom} from './room/creatingPrivateRoom/reducer'
import {LeavingRoomState, leavingRoom} from './room/leavingRoom/reducer'
import {OpeningRoomState, openingRoom} from './room/openingRoom/reducer'

export interface RootState {
  storage: StorageState
  connection: ConnectionState,
  auth: AuthState,
  chats: ChatsStates,
  rooms: RoomsState,
  creatingPrivateRoom: CreatingPrivateRoomState,
  leavingRoom: LeavingRoomState,
  openingRoom: OpeningRoomState,
}

export const reducer = combineReducers<RootState>({
  storage,
  router,
  connection,
  auth,
  chats,
  rooms,
  creatingPrivateRoom,
  leavingRoom,
  openingRoom
})