import {REHYDRATE} from 'redux-persist/constants'
import {createActions, FAIL, REQUEST, SUCCESS} from '../common'
import {initializeGa} from '../log/index'
import {removeUserInfo, saveUserInfo} from '../persist/index'
import {Reducer} from 'redux'
import {changeUrl} from '../router/index'
import {ROUTES} from '../../constants/routes'

const defaultState = {} as SystemState

export const reducer: Reducer<SystemState> = (state = defaultState, action) => {
  const {type, payload} = action
  switch (type) {
    case ActionTypes.BOOT:
      return {
        ...state,
        boot: true
      }
    case ActionTypes.LOGGED_IN:
      return {
        ...state,
        loggedIn: true
      }
    case REHYDRATE:
      return {
        ...state,
        reHydrated: true
      }
    default:
      return state
  }
}

enum ActionTypes {
  BOOT      = 'boot',
  SESSION   = 'session',
  LOGGED_IN = 'logged in',
  LOGOUT    = 'logout',
}

export function boot() {
  return {
    type: ActionTypes.BOOT
  }
}
export function loggedIn(userInfo, bySession?: boolean) {
  return async dispatch => {
    dispatch(saveUserInfo(userInfo))
    dispatch({
      type:    ActionTypes.LOGGED_IN,
      payload: userInfo
    })
    dispatch(changeUrl(ROUTES.NEWS))
  }
}
export function logout() {
  return async dispatch => {
    dispatch(removeUserInfo())
    dispatch({
      type: ActionTypes.LOGOUT
    })
    dispatch(changeUrl(ROUTES.HOME))
  }
}

const SESSION = createActions(ActionTypes.SESSION)

export function session() {
  return async (dispatch, getState) => {
    dispatch({type: SESSION[REQUEST]})
    try {
      const userInfo = getState().persist.userInfo
      if (!userInfo) {
        throw new Error('cannot found login information')
      }
      dispatch({type: SESSION[SUCCESS]})
      dispatch(initializeGa(userInfo.id))
      dispatch(loggedIn(userInfo, true))
    } catch (ex) {
      dispatch({type: SESSION[FAIL]})
      dispatch(initializeGa())
    } finally {
      dispatch(boot())
    }
  }
}

export interface SystemState {
  boot: boolean
  reHydrated: boolean
  loggedIn: boolean
}

