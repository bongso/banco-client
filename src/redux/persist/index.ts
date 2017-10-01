import {Reducer} from 'redux'

const defaultState = {} as PersistState
export const reducer: Reducer<PersistState> = (state = defaultState, action) => {
  const {type, payload} = action
  switch (type) {
    case ActionTypes.SAVE_USER_INFO:
      return {
        ...state,
        userInfo: payload
      }
    case ActionTypes.REMOVE_USER_INFO:
      delete state.userInfo
      return {
        ...state,
      }
    default:
      return state
  }
}

enum ActionTypes {
  SAVE_USER_INFO = 'save user information',
  REMOVE_USER_INFO = 'remove user information',
}

export function saveUserInfo(userInfo: User) {
  return {
    type:    ActionTypes.SAVE_USER_INFO,
    payload: userInfo
  }
}
export function removeUserInfo() {
  return {
    type:    ActionTypes.REMOVE_USER_INFO
  }
}

export interface PersistState {
  userInfo: User
}
export interface User extends BongsoClaim {
  jwt: string
}
interface BongsoClaim {
  provider: 'github'|'slack'|string
  token: string
  name: string
  permission: Permission
  photo: string
  email?: string
  realName?: string
}

type Permission = 'normal' | 'admin' | 'owner' | string
